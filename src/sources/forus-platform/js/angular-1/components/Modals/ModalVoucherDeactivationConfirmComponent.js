let ModalVoucherDeactivationConfirmComponent = function(
    FormBuilderService,
    VoucherService
) {
    let $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.organization = $ctrl.modal.scope.organization;
        $ctrl.voucher = $ctrl.modal.scope.voucher;
        $ctrl.fund = $ctrl.modal.scope.fund;        
        $ctrl.deactivation_reason = $ctrl.modal.scope.deactivation_reason;
        $ctrl.onSubmit = $ctrl.modal.scope.onSubmit;

        $ctrl.form = FormBuilderService.build({}, (form) => {
            form.lock();            
            VoucherService.deactivate($ctrl.organization.id, $ctrl.voucher.id, {
                deactivation_reason: $ctrl.modal.scope.deactivation_reason,
                notification: form.values.notification
            }).then(() => {
                $ctrl.close();
                $ctrl.onSubmit();
            }, (res) => {
                form.errors = res.data.errors;
                console.log(res.data.errors);
                form.unlock();
            });
        });
    };

    $ctrl.$onDestroy = function() { };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '=',
    },
    controller: [
        'FormBuilderService',
        'VoucherService',
        ModalVoucherDeactivationConfirmComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-voucher-deactivation-confirm.html';
    }
};