let ModalVouchersUploadComponent = function(
    $q,
    $rootScope,
    $timeout,
    $filter,
    $element,
    FileService,
    ModalService,
    HelperService,
    VoucherService,
    ProductService,
    PushNotificationsService
) {
    let $ctrl = this;

    $ctrl.progress = 1;

    $ctrl.changed = false;
    $ctrl.progressBar = 0;
    $ctrl.progressStatus = "";
    $ctrl.productsIds = [];

    let $translate = $filter('translate')
    let input;
    let dataChunkSize = 100;

    let setProgress = function(progress) {
        $ctrl.progressBar = progress;

        if (progress < 100) {
            $ctrl.progressStatus = "Aan het uploaden...";
        } else {
            $ctrl.progressStatus = "Klaar!";
        }
    };

    let chunk = function(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    }

    let makeCsvParser = () => {
        let csvParser = function() {
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
                return $translate('vouchers.csv.default_note' + (row.email ? '' : '_no_email'), {
                    upload_date: moment().format('YYYY-MM-DD'),
                    uploader_email: $rootScope.auth_user.email,
                    target_email: row.email || null,
                });
            }

            this.validateCsvData = function(data) {
                this.errors.hasInvalidFundIds = data.filter(row => {
                    return row.fund_id && $ctrl.availableFundsIds.indexOf(
                        row.fund_id ? parseInt(row.fund_id) : null
                    ) === -1
                }).map(row => row.fund_id);

                this.errors.hasInvalidFundIdsList = _.unique(this.errors.hasInvalidFundIds).join(', ');

                if (this.errors.hasInvalidFundIds.length > 0) {
                    return false;
                }

                if ($ctrl.type == 'fund_voucher') {
                    return this.validateCsvDataBudget(data);
                } else if ($ctrl.type == 'product_voucher') {
                    return this.validateCsvDataProduct(data);
                }

                return false;
            };

            this.validateCsvDataBudget = function(data) {
                const fundBudget = $ctrl.fund.limit_sum_vouchers;
                const csvTotalAmount = data.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

                this.errors.csvAmountMissing = data.filter(row => !row.amount).length > 0;

                // csv total amount should be withing fund budget
                this.errors.invalidAmountField = csvTotalAmount > fundBudget;

                // fund vouchers csv shouldn't have product_id field
                this.errors.csvProductIdPresent = data.filter(
                    row => row.product_id != undefined
                ).length > 0;

                // some vouchers exceed the limit per voucher
                this.errors.invalidPerVoucherAmount = data.filter(
                    row => row.amount > $ctrl.fund.limit_per_voucher
                ).length > 0;

                return !this.errors.invalidAmountField &&
                    !this.errors.csvProductIdPresent &&
                    !this.errors.csvAmountMissing &&
                    !this.errors.invalidPerVoucherAmount;
            }

            this.validateCsvDataProduct = function(data) {
                let validation = this.validateProductId(data);

                this.errors.csvHasMissingProductId = validation.hasMissingProductId;
                this.errors.csvProductsInvalidStockIds = validation.invalidStockIds;
                this.errors.csvProductsInvalidUnknownIds = validation.invalidProductIds;

                this.errors.csvProductsInvalidStockIdsList = _.unique(_.pluck(
                    this.errors.csvProductsInvalidStockIds, 'product_id'
                )).join(', ');

                this.errors.csvProductsInvalidUnknownIdsList = _.unique(_.pluck(
                    this.errors.csvProductsInvalidUnknownIds, 'product_id'
                )).join(', ');

                // product vouchers .csv should not have an `amount` field
                this.errors.hasAmountField = data.filter(row => row.amount != undefined).length > 0;

                return (!this.errors.hasAmountField && !this.errors.csvHasMissingProductId) && validation.isValid;
            }

            this.uploadFile = function(file) {
                if (!file.name.endsWith('.csv')) {
                    return;
                }

                new $q((resolve) => Papa.parse(file, { complete: resolve })).then((res) => {
                    let body = res.data;
                    let header = res.data.shift();

                    let data = body.filter(row => {
                        return row.filter(col => !_.isEmpty(col)).length > 0;
                    }).map((val) => {
                        let row = {};

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

            this.validateProductId = function(data = []) {
                let allProductIds = _.countBy(data, 'product_id')

                let hasMissingProductId = data.filter(row => row.product_id === undefined).length > 0;
                let invalidProductIds = data.filter(row => !$ctrl.productsByIds[row.product_id]);
                let invalidStockIds = data.filter(row => $ctrl.productsByIds[row.product_id]).filter(row => {
                    return !$ctrl.productsByIds[row.product_id].unlimited_stock && (
                        $ctrl.productsByIds[row.product_id].stock_amount < allProductIds[row.product_id]
                    );
                });

                return {
                    isValid: !invalidProductIds.length && !invalidStockIds.length,
                    hasMissingProductId: hasMissingProductId,
                    invalidStockIds: invalidStockIds,
                    invalidProductIds: invalidProductIds,
                };
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

            this.uploadToServer = function(e) {
                e && (e.preventDefault() & e.stopPropagation());

                if (!this.isValid) {
                    return false;
                }

                $ctrl.loading = true;

                PushNotificationsService.success(
                    'Loading...',
                    'Loading existing vouchers to check for duplicates!',
                    'download-outline'
                );

                HelperService.recursiveLeacher((page) => {
                    return VoucherService.index($ctrl.organization.id, {
                        fund_id: $ctrl.fund.id,
                        type: $ctrl.type,
                        per_page: 100,
                        page: page,
                        source: 'employee',
                        expired: 0,
                    });
                }, 4).then(data => {
                    PushNotificationsService.success(
                        'Comparing...',
                        'Vouchers loaded! Comparing with .csv...',
                        'timer-sand'
                    );

                    let emails = data.map(voucher => voucher.identity_email);
                    let bsns = [
                        ...data.map(voucher => voucher.relation_bsn),
                        ...data.map(voucher => voucher.identity_bsn)
                    ];

                    let existingEmails = this.data.filter(csvRow => {
                        return emails.indexOf(csvRow.email) != -1;
                    }).map(csvRow => csvRow.email);

                    let existingBsn = this.data.filter(csvRow => {
                        return bsns.indexOf(csvRow.bsn) != -1;
                    }).map(csvRow => csvRow.bsn);

                    $ctrl.loading = false;

                    if (existingEmails.length === 0 && existingBsn.length === 0) {
                        return this.startUploading();
                    }

                    this.confirmEmailSkip(existingEmails, () => {
                        this.confirmBsnSkip(existingBsn, () => {
                            if (this.data.length > 0) {
                                return this.startUploading();
                            }

                            $ctrl.close();
                        });
                    });
                }, () => $ctrl.loading = false);
            }

            this.startUploading = function() {
                $q(async (resolve) => {
                    let totalRows = this.data.length;
                    let uploadedRows = 0;
                    let data = JSON.parse(JSON.stringify(this.data)).map(row => {
                        return { ...row, ...{ fund_id: row.fund_id || $ctrl.fund.id } };
                    });

                    let dataGrouped = _.groupBy(data, 'fund_id');
                    this.progress = 2;

                    setProgress(0);

                    let funds = Object.keys(dataGrouped);

                    for (let i = 0; i < funds.length; i++) {
                        const fund_id = funds[i];

                        dataGrouped[fund_id] = dataGrouped[fund_id].map((row) => {
                            delete row.fund_id;
                            return row;
                        });

                        await this.startUploadingData(fund_id, dataGrouped[fund_id], (chunkData) => {
                            uploadedRows += chunkData.length;
                            setProgress((uploadedRows / totalRows) * 100);

                            if (uploadedRows === totalRows) {
                                $timeout(() => {
                                    setProgress(100);
                                    this.progress = 3;
                                    $rootScope.$broadcast('vouchers_csv:uploaded', true);
                                }, 0);
                                resolve();
                            }
                        });
                    }
                });
            };

            this.startUploadingData = function(fund_id, groupData, onChunk = () => { }) {
                return new Promise((resolve) => {
                    var submitData = chunk(groupData, dataChunkSize);
                    var chunksCount = submitData.length;
                    var currentChunkNth = 0;

                    let uploadChunk = (data) => {
                        $ctrl.changed = true;

                        VoucherService.storeCollection($ctrl.organization.id, fund_id, data).then(() => {
                            currentChunkNth++;
                            onChunk(data);

                            if (currentChunkNth == chunksCount) {
                                resolve(true);
                            } else if (currentChunkNth < chunksCount) {
                                uploadChunk(submitData[currentChunkNth]);
                            }
                        }, (res) => {
                            if (res.status == 422 && res.data.errors) {
                                return PushNotificationsService.danger(
                                    'Het is niet gelukt om het gekozen bestand te verwerken.',
                                    Object.values(res.data.errors).reduce((msg, arr) => msg + arr.join(''), "")
                                );
                            }

                            alert('Onbekende error.');
                        });
                    };

                    uploadChunk(submitData[currentChunkNth]);
                });
            };
        };

        return new csvParser();
    };

    $ctrl.reset = function() {
        $ctrl.init();
    };

    $ctrl.downloadExampleCsv = () => {
        if ($ctrl.type == 'fund_voucher') {
            FileService.downloadFile(
                'budget_voucher_upload_sample.csv',
                VoucherService.sampleCSVBudgetVoucher($ctrl.fund.end_date)
            );
        } else {
            FileService.downloadFile(
                'product_voucher_upload_sample.csv',
                VoucherService.sampleCSVProductVoucher(
                    $ctrl.productsIds[0] || null,
                    $ctrl.fund.end_date
                )
            );
        }
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
        $ctrl.fund = $ctrl.modal.scope.fund || null;
        $ctrl.type = $ctrl.modal.scope.type || 'fund_voucher';
        $ctrl.availableFunds = $ctrl.modal.scope.organizationFunds;
        $ctrl.availableFundsIds = $ctrl.availableFunds.map(fund => fund.id);

        if ($ctrl.type == 'product_voucher') {
            HelperService.recursiveLeacher((page) => {
                return ProductService.listAll({
                    fund_id: $ctrl.fund.id,
                    page: page,
                    per_page: 1000,
                });
            }, 4).then((data) => {
                $ctrl.products = _.sortBy(data, 'id');
                $ctrl.productsIds = $ctrl.products.map(product => parseInt(product.id));
                $ctrl.productsByIds = $ctrl.products.reduce((obj, product) => {
                    obj[product.id] = product;
                    return obj;
                }, {});

                $ctrl.init();
            });
        } else {
            $ctrl.init();
        }
    };

    $ctrl.closeModal = () => {
        if ($ctrl.changed) {
            $ctrl.modal.scope.done();
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
        'HelperService',
        'VoucherService',
        'ProductService',
        'PushNotificationsService',
        ModalVouchersUploadComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-vouchers-upload.html';
    }
};
