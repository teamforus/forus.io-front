let ModalDeactivateVoucherComponent = function(
    ModalService,
    FormBuilderService,
) {
    let $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.deactivation_reason = '';
        $ctrl.error = false;

        $ctrl.form = FormBuilderService.build({}, (form) => {
            $ctrl.error = $ctrl.deactivation_reason.length > 0 ? false : true;
            console.log($ctrl.deactivation_reason.length)

            if (!$ctrl.error) {
                $ctrl.close();

                ModalService.open('voucher_deactivation_confirm', {
                    voucher: $ctrl.modal.scope.voucher,
                    fund: $ctrl.modal.scope.fund, 
                    organization: $ctrl.modal.scope.organization,
                    deactivation_reason: $ctrl.deactivation_reason,
                    onSubmit: () => {
                        $ctrl.modal.scope.onSubmit();
                    } 
                });
            } 
        });
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '=',
    },
    controller: [
        'ModalService',
        'FormBuilderService',
        ModalDeactivateVoucherComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-voucher-deactivate.html';
    }
};