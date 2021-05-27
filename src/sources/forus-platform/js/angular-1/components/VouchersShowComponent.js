let VouchersShowComponent = function(
    ModalService,
    VoucherService,
    FundService,
    PhysicalCardsService,
    $filter
) {
    let $ctrl = this;
    let $translate = $filter('translate');

    $ctrl.deactivate = () => {
        ModalService.open('voucher_deactivate', {
            voucher: $ctrl.voucher,
            fund: $ctrl.fund, 
            organization: $ctrl.organization,
            onSubmit: () => {
                $ctrl.onPageChange();
            },
        });
    }

    $ctrl.reactivate = () => {
        VoucherService.reactivate($ctrl.organization.id, $ctrl.voucher.id,{})
        .then(() => {
            $ctrl.onPageChange();
        });
    }

    $ctrl.activate = () => {
        VoucherService.activate(
            $ctrl.organization.id, $ctrl.voucher.id
        ).then(() => {
            $ctrl.onPageChange();
        });
    }

    $ctrl.showQrCode = () => {
        ModalService.open('voucher_qr_code', {
            voucher: $ctrl.voucher,
            fund: $ctrl.fund,
            organization: $ctrl.organization,
            onSent: () => {
                $ctrl.onPageChange();
            },
            onAssigned: () => {
                $ctrl.onPageChange();
            }
        });
    };

    $ctrl.addPhysicalCard = () => {
        ModalService.open('physical_card', {
            voucher: $ctrl.voucher,
            organization: $ctrl.organization,
            onSent: () => {
                $ctrl.onPageChange();
            },
            onAssigned: () => {
                $ctrl.onPageChange();
            },
            onAttached: () => {
                $ctrl.onPageChange();
            }
        });
    };

    $ctrl.deletePhysicalCard = () => {
        ModalService.open('dangerZone', {
            header: $translate('modals.modal_voucher_physical_card.delete_card.header'),
            title: $translate('modals.modal_voucher_physical_card.delete_card.title', {code: $ctrl.voucher.physical_card.code}),
            description: $translate('modals.modal_voucher_physical_card.delete_card.description'),
            cancelButton: $translate('modals.modal_voucher_physical_card.delete_card.cancelButton'),
            confirmButton: $translate('modals.modal_voucher_physical_card.delete_card.confirmButton'),

            onConfirm: () => {
                PhysicalCardsService.destroy(
                    $ctrl.organization.id, 
                    $ctrl.voucher.id, 
                    $ctrl.voucher.physical_card.id
                ).then(() => {
                    $ctrl.onPageChange();
                });
            }
        });
    };

    $ctrl.onPageChange = (query = {}) => {
        VoucherService.show(
            $ctrl.organization.id,
            $ctrl.voucher.id,
        ).then((res => {$ctrl.voucher = res.data.data;}));
    };
    
    $ctrl.$onInit = function() {
        FundService.read(
            $ctrl.organization.id,
            $ctrl.voucher.fund.id
        ).then((res) => {$ctrl.fund = res.data.data;})
    }
};

module.exports = {
    bindings: {
        voucher: '<',
        organization: '<',
    },
    controller: [
        'ModalService',
        'VoucherService',
        'FundService',
        'PhysicalCardsService',
        '$filter',
        VouchersShowComponent
    ],
    templateUrl: 'assets/tpl/pages/vouchers-show.html'
};