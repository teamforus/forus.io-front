const ModalReservationUploadComponent = function(
    $q,
    $rootScope,
    $timeout,
    $filter,
    $element,
    FileService,
    ModalService,
    ProductReservationService,
    PushNotificationsService
) {
    const $ctrl = this;

    $ctrl.progress = 1;

    $ctrl.changed = false;
    $ctrl.progressBar = 0;
    $ctrl.progressStatus = "";
    $ctrl.productsIds = [];

    const $translate = $filter('translate')
    const dataChunkSize = 1000;

    let input;

    const setProgress = function(progress) {
        $ctrl.progressBar = progress;

        if (progress < 100) {
            $ctrl.progressStatus = "Aan het uploaden...";
        } else {
            $ctrl.progressStatus = "Klaar!";
        }
    };

    const chunk = function(arr, len) {
        const data = [...arr];
        const chunks = [];

        do {
            chunks.push(data.splice(0, len));
        } while (data.length);

        return chunks;
    }

    const makeCsvParser = () => {
        const csvParser = function() {
            this.progress = 0;
            this.errors = {};

            this.selectFile = function(e) {
                e && (e.preventDefault() & e.stopPropagation());

                if (input && input.remove) {
                    input.remove();
                }

                input = document.createElement('input');
                input.setAttribute("type", "file");
                input.setAttribute("accept", ".csv");
                input.style.display = 'none';

                input.addEventListener('change', (e) => this.uploadFile(e.target.files[0]));

                $element[0].appendChild(input);

                input.click();
            };

            this.defaultNote = function(row) {
                return $translate('reservations.csv.default_note', {
                    ...row,
                    upload_date: moment().format('YYYY-MM-DD'),
                    uploader_email: $rootScope.auth_user.email,
                });
            }

            this.validateCsvData = function(data) {
                // rows without `product_id` field
                this.errors.csvMissingProductIdFields = data.map(
                    (row, key) => !row.product_id ? (key + 1) : null
                ).filter((row) => row !== null).join(', ');

                // rows without `number` field
                this.errors.csvMissingNumberFields = data.map(
                    (row, key) => !row.number ? (key + 1) : null
                ).filter((row) => row !== null).join(', ');

                // rows without `number` field
                this.errors.csvSampleNumberFields = data.map(
                    (row, key) => row.number === '000000000000' ? (key + 1) : null
                ).filter((row) => row !== null).join(', ');

                return (data.length > 0) && (!this.errors.csvSampleNumberFields &&
                    !this.errors.csvMissingProductIdFields &&
                    !this.errors.csvMissingNumberFields);
            };

            this.confirmEmailSkip = function(existingEmails, onConfirm) {
                let items = existingEmails.map(email => ({ value: email }));

                if (items.length === 0) {
                    return onConfirm();
                }

                ModalService.open('duplicatesPicker', {
                    hero_title: "Dubbele e-mailadressen gedetecteerd.",
                    hero_subtitle: [
                        `Weet u zeker dat u voor ${items.length} e-mailadres(sen) een extra voucher wilt aanmaken?`,
                        "Deze e-mailadressen bezitten al een voucher van dit fonds."
                    ],
                    button_none: "Alle overslaan",
                    button_all: "Alle aanmaken",
                    label_on: "Aanmaken",
                    label_off: "Overslaan",
                    items: items,
                    onConfirm: (items) => {
                        let allowedEmails = items.filter(item => item.model).map(item => item.value);

                        this.data = this.data.filter(csvRow => {
                            return existingEmails.indexOf(csvRow.email) === -1 ||
                                allowedEmails.indexOf(csvRow.email) !== -1;
                        });

                        onConfirm();
                    },
                    onCancel: () => $ctrl.close(),
                });
            };

            this.confirmBsnSkip = function(existingBsn, onConfirm) {
                let items = existingBsn.map(bsn => ({ value: bsn }));

                if (items.length === 0) {
                    return onConfirm();
                }

                ModalService.open('duplicatesPicker', {
                    hero_title: "Dubbele bsn(s) gedetecteerd.",
                    hero_subtitle: [
                        `Weet u zeker dat u voor ${items.length} bsn(s) een extra voucher wilt aanmaken?`,
                        "Deze bsn(s) bezitten al een voucher van dit fonds."
                    ],
                    button_none: "Alle overslaan",
                    button_all: "Alle aanmaken",
                    label_on: "Aanmaken",
                    label_off: "Overslaan",
                    items: items,
                    onConfirm: (items) => {
                        let allowedBsn = items.filter(item => item.model).map(item => item.value);

                        this.data = this.data.filter(csvRow => {
                            return allowedBsn.indexOf(csvRow.bsn) === -1 ||
                                allowedBsn.indexOf(csvRow.bsn) !== -1;
                        });

                        onConfirm();
                    },
                    onCancel: () => $ctrl.close(),
                });
            };

            this.startUploading = function() {
                return $q((resolve) => {
                    const data = [...this.data].map((row) => ({ ...row }));
                    const totalRows = data.length;

                    let uploadedRows = 0;

                    this.progress = 2;
                    setProgress(0);

                    this.startUploadingData(data, (chunkData) => {
                        uploadedRows += chunkData.length;
                        setProgress((uploadedRows / totalRows) * 100);

                        if (uploadedRows === totalRows) {
                            $timeout(() => setProgress(100) & resolve(), 0);
                        }
                    }).then(resolve);
                });
            };

            this.startUploadingData = function(groupData, onChunk = () => { }) {
                return new Promise((resolve) => {
                    const submitData = chunk(groupData, dataChunkSize);
                    const chunksCount = submitData.length;

                    let currentChunkNth = 0;

                    const uploadChunk = (data) => {
                        $ctrl.changed = true;

                        ProductReservationService.storeBatch($ctrl.organization.id, {
                            reservations: data,
                        }).then(() => {
                            currentChunkNth++;
                            onChunk(data);

                            if (currentChunkNth == chunksCount) {
                                resolve(true);
                            } else if (currentChunkNth < chunksCount) {
                                uploadChunk(submitData[currentChunkNth]);
                            }
                        }, (res) => {
                            if (res.status == 422 && res.data.errors) {
                                const items = Object.keys(res.data.errors).map(function(key) {
                                    const keyData = key.split('.');
                                    const keyDataId = keyData[keyData.length - 1];

                                    return [keyDataId, res.data.errors[key], data[keyDataId]];
                                });

                                PushNotificationsService.danger(
                                    'Error:',
                                    Object.values(res.data.errors).reduce((msg, arr) => msg + arr.join(''), "")
                                );

                                ModalService.open('duplicatesPicker', {
                                    hero_title: "Reserveringen aanmaken mislukt!",
                                    hero_subtitle: [
                                        "Voor onderstaande nummers kan geen reservering worden aangemaakt." +
                                        "Er is geen actief tegoed beschikbaar of het gebruikerslimiet is bereikt.",
                                        "Indien u bevestigd worden alle reserveringen toegevoegd op anderstaande nummers na."
                                    ],
                                    enableToggles: false,
                                    label_on: "Aanmaken",
                                    label_off: "Overslaan",
                                    items: items.map((item) => ({ value: item[2]['number'] + ' - ' + item[1] })),
                                    onConfirm: () => $ctrl.close(),
                                    onCancel: () => $ctrl.close(),
                                });
                            }
                        });
                    };

                    uploadChunk(submitData[currentChunkNth]);
                });
            };

            this.validateReservations = function() {
                return $q((resolve) => resolve(true));
            };

            this.uploadToServer = function(e) {
                e && (e.preventDefault() & e.stopPropagation());

                this.validateReservations().then(() => {
                    this.startUploading().then(() => {
                        this.progress = 3;
                    });
                });
            }

            // process selected file
            this.uploadFile = function(file) {
                if (!file.name.endsWith('.csv')) {
                    return;
                }

                new $q((resolve) => Papa.parse(file, { complete: resolve })).then((res) => {
                    const body = res.data;
                    const header = res.data.shift();

                    // clean empty rows, trim fields and add default note
                    const data = body.filter((row) => {
                        return row.filter(col => !_.isEmpty(col)).length > 0;
                    }).map((val) => {
                        const row = {};

                        header.forEach((hVal, hKey) => {
                            if (val[hKey] && val[hKey] != '') {
                                row[hVal.trim()] = val[hKey].trim();
                            }
                        });

                        row.note = row.note || this.defaultNote(row);

                        return _.isEmpty(row) ? false : row;
                    }).filter(row => !!row);

                    this.isValid = this.validateCsvData(data);
                    this.data = data;
                    this.csvFile = file;
                    this.progress = 1;
                }, console.error);
            };
        };

        return new csvParser();
    };

    $ctrl.reset = function() {
        $ctrl.init();
    };

    $ctrl.downloadExampleCsv = () => {
        FileService.downloadFile(
            'product_reservation_upload_sample.csv',
            ProductReservationService.sampleCsvProductReservations()
        );
    };

    $ctrl.init = () => {
        $ctrl.csvParser = makeCsvParser();

        $element.unbind('dragleave').bind('dragleave', function(e) {
            e.preventDefault()
            $element.removeClass('on-dragover');
        });

        $element.unbind('dragenter dragover').bind('dragenter dragover', function(e) {
            e.preventDefault()
            $element.addClass('on-dragover');
        });

        $element.unbind('drop dragdrop').bind('drop dragdrop', function(e) {
            e.preventDefault();
            $element.removeClass('on-dragover');

            $ctrl.csvParser.uploadFile(e.originalEvent.dataTransfer.files[0]);
        });
    };

    $ctrl.$onInit = () => {
        $ctrl.organization = $ctrl.modal.scope.organization;
        $ctrl.onCreated = $ctrl.modal.scope.onCreated;
        $ctrl.init();
    };

    $ctrl.closeModal = () => {
        if ($ctrl.changed) {
            $ctrl.modal.scope.onCreated();
        }

        $ctrl.close();
    }
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$q',
        '$rootScope',
        '$timeout',
        '$filter',
        '$element',
        'FileService',
        'ModalService',
        'ProductReservationService',
        'PushNotificationsService',
        ModalReservationUploadComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-reservation-upload.html';
    }
};
