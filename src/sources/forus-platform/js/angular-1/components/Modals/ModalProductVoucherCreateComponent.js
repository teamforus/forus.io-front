let ModalProductVoucherCreateComponent = function(
    FormBuilderService,
    ProductService,
    VoucherService,
    ModalService
) {
    let $ctrl = this;

    $ctrl.lastReplaceConfirmed = null;
    $ctrl.voucherType = 'activation_code_uid';
    $ctrl.activationCodeSubmitted = false;
    $ctrl.assignTypes = [{
        key: 'activation_code_uid',
        label: 'Activatiecode',
        inputLabel: 'NR',
    }, {
        key: 'email',
        label: 'E-mailadres',
        inputLabel: 'E-mailadres',
    }, {
        key: 'bsn',
        label: 'BSN',
        inputLabel: 'BSN',
    }];

    $ctrl.assignType = $ctrl.assignTypes[0];
    $ctrl.dateMinLimit = new Date();

    $ctrl.onAsignTypeChange = (assignType) => {
        if (assignType.key !== 'bsn') {
            delete $ctrl.form.values.bsn;
        }

        if (assignType.key !== 'email') {
            delete $ctrl.form.values.email;
        }

        if (assignType.key !== 'activation_code_uid') {
            delete $ctrl.form.values.activation_code_uid;
        }
    };

    $ctrl.productChanged = (product_id) => {
        $ctrl.product = $ctrl.products.filter(
            product => product.id == product_id
        )[0] || null;

        $ctrl.form.values.product_id = product_id;
    };

    $ctrl.confirmEmailSkip = function(existingEmails, onConfirm = () => { }, onCancel = () => { }) {
        let items = existingEmails.map(email => ({ value: email }));

        ModalService.open('duplicatesPicker', {
            hero_title: "Dubbele e-mailadressen gedetecteerd.",
            hero_subtitle: [
                `Weet u zeker dat u voor ${items.length} e-mailadres(sen) een aanbiedingsvoucher wilt aanmaken?`,
                "Deze e-mailadressen bezitten al een aanbiedingsvoucher van dit fonds."
            ],
            label_on: "Aanmaken voucher",
            label_off: "Overslaan",
            items: items,
            onConfirm: onConfirm,
            onCancel: onCancel,
        });
    };

    $ctrl.confirmBsnSkip = function(existingBsn, onConfirm = () => { }, onCancel = () => { }) {
        let items = existingBsn.map(bsn => ({ value: bsn }));

        ModalService.open('duplicatesPicker', {
            hero_title: "Dubbele bsn(s) gedetecteerd.",
            hero_subtitle: [
                `Weet u zeker dat u voor ${items.length} bsn(s) een aanbiedingsvoucher wilt aanmaken?`,
                "Deze bsn(s) bezitten al een aanbiedingsvoucher van dit fonds."
            ],
            label_on: "Aanmaken",
            label_off: "Overslaan",
            items: items,
            onConfirm: onConfirm,
            onCancel: onCancel,
        });
    };

    $ctrl.initForm = () => {
        $ctrl.form = FormBuilderService.build({
            expire_at: $ctrl.fund.end_date,
            product_id: $ctrl.product.id,
            fund_id: $ctrl.fund.id,
        }, (form) => {
            VoucherService.storeValidate($ctrl.organization.id, {
                ...form.values,
                ...{ assign_by_type: $ctrl.assignType.key },
                ...({
                    email: { activate: 1, activation_code: 0 },
                    bsn: { activate: 1, activation_code: 0 },
                    activation_code_uid: { activate: 0, activation_code: 1 },
                }[$ctrl.assignType.key])
            }).then(() => {
                if ($ctrl.assignType.key === 'email' && (form.values.email !== $ctrl.lastReplaceConfirmed)) {
                    return VoucherService.index($ctrl.organization.id, {
                        type: 'product_voucher',
                        email: form.values.email,
                        fund_id: $ctrl.fund.id,
                        source: 'all',
                    }).then((res) => {
                        $ctrl.close();

                        if (res.data.meta.total > 0) {
                            return $ctrl.confirmEmailSkip([form.values.email], (emails) => {
                                if (emails.filter(email => email.model).length > 0) {
                                    $ctrl.lastReplaceConfirmed = form.values.email;
                                    $ctrl.makRequest(form);
                                }
                            });
                        }

                        $ctrl.makRequest(form);
                    });
                }

                if ($ctrl.assignType.key === 'bsn' && (form.values.bsn !== $ctrl.lastReplaceConfirmed)) {
                    return VoucherService.index($ctrl.organization.id, {
                        type: 'product_voucher',
                        bsn: form.values.bsn,
                        fund_id: $ctrl.fund.id,
                        source: 'all',
                    }).then((res) => {
                        $ctrl.close();

                        if (res.data.meta.total > 0) {
                            return $ctrl.confirmBsnSkip([form.values.bsn], (bsns) => {
                                if (bsns.filter(bsn => bsn.model).length > 0) {
                                    $ctrl.lastReplaceConfirmed = form.values.bsn;
                                    $ctrl.makRequest(form);
                                }
                            });
                        }

                        $ctrl.makRequest(form);
                    });
                }

                $ctrl.makRequest(form);
            }, res => {
                form.errors = res.data.errors;
                form.unlock();
            });
        }, true);
    };

    $ctrl.makRequest = (form) => {
        VoucherService.store($ctrl.organization.id, {
            ...form.values,
            ...{ assign_by_type: $ctrl.assignType.key },
            ...({
                email: { activate: 1, activation_code: 0 },
                bsn: { activate: 1, activation_code: 0 },
                activation_code_uid: { activate: 0, activation_code: 1 },
            }[$ctrl.assignType.key])
        }).then(() => {
            $ctrl.onCreated();
            $ctrl.close();
        }, res => {
            form.errors = res.data.errors;
            form.unlock();

            if (res.data.message && res.status !== 422) {
                alert(res.data.message);
            }
        });
    }

    $ctrl.$onInit = () => {
        $ctrl.modal.loaded = false;
        $ctrl.organization = $ctrl.modal.scope.organization;
        $ctrl.onCreated = $ctrl.modal.scope.onCreated;
        $ctrl.fund = $ctrl.modal.scope.fund || null;

        ProductService.listAll({
            fund_id: $ctrl.fund.id,
            price_type: 'regular',
            show_all: 1,
        }).then((res) => {
            $ctrl.products = res.data.data.map(product => {
                return {
                    id: product.id,
                    price: product.price,
                    name: product.name + ' ' + product.price_locale + ' (' + product.organization.name + ')',
                }
            });

            $ctrl.modal.setLoaded();

            if ($ctrl.products.length > 0) {
                $ctrl.product = $ctrl.products[0];
            } else {
                $ctrl.close();

            return ModalService.open('modalNotification', {
                    type: 'info',
                    title: 'modals.modal_product_voucher_create.errors.title.no_products',
                    description: 'modals.modal_product_voucher_create.errors.no_products',
                    closeBtnText: 'modals.modal_product_voucher_create.buttons.close',
                });
            }

            $ctrl.modal.loaded = true;

            $ctrl.initForm();
        });
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '=',
    },
    controller: [
        'FormBuilderService',
        'ProductService',
        'VoucherService',
        'ModalService',
        ModalProductVoucherCreateComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-product-voucher-create.html';
    }
};
