let ModalPhysicalCardTypeComponent = function(
    $element,
    $timeout,
    FormBuilderService,
    PhysicalCardsService,
    PhysicalCardsRequestService,
) {
    let $ctrl = this;
    
    $ctrl.voucher = null;
    $ctrl.state = '';
    $ctrl.preffersPlasticCard = false;
    
    // todo: cleanup physicalcard type component
    $ctrl.$onInit = () => {
        $ctrl.fund = $ctrl.modal.scope.fund || null;
        $ctrl.organization = $ctrl.modal.scope.organization;
        $ctrl.voucher = $ctrl.modal.scope.voucher;
        $ctrl.onAttached = $ctrl.modal.scope.onAttached;
        $ctrl.state = $ctrl.modal.scope.state || 'select_type';
        $ctrl.preffersPlasticCard = true;
        
        $ctrl.sendVoucherEmail = () => {
            $ctrl.close();
            $ctrl.modal.scope.sendVoucherEmail();
        };

        $ctrl.openInMeModal = () => {
            $ctrl.close();
            $ctrl.modal.scope.openInMeModal();
        };

        $ctrl.printQrCode = () => {
            $ctrl.close();
            $ctrl.modal.scope.printQrCode();
        };

        $ctrl.activateCodeForm = FormBuilderService.build({
            code: '1001'
        }, (form) => {
            PhysicalCardsService.store(
                $ctrl.modal.scope.voucher.address, 
                form.values
            ).then(res => {
                $ctrl.state = 'success_old_card';
                $ctrl.onAttached();
            }, (res) => {
                form.unlock();

                if (res.status === 429) {
                    return form.errors = {
                        code: [res.data.message]
                    };
                }

                form.errors = res.data.errors;
            });
        });

        $ctrl.requestPhysicalCardForm = FormBuilderService.build({}, (form) => {
            PhysicalCardsRequestService.store(
                $ctrl.modal.scope.voucher.address, 
                form.values
            ).then(res => {
                $ctrl.state = 'success_new_card';
            }, (res) => {
                form.unlock();
                form.errors = res.data.errors;

                if (res.status === 429) {
                    return form.errors = {
                        to_many_requests: [res.data.message]
                    };
                }

                form.errors = res.data.errors;
            });
        });
    };

    $ctrl.choosePhysicalCardType = (type) => {
        $ctrl.physicalCardType = type;

        if (type == 'old') {
            $ctrl.state = 'card_code';
        } else {
            $ctrl.preffersPlasticCard = true;
        }
    };

    $ctrl.requestPhysicalCard = () => {
        $ctrl.prefferPlasticCard();
    };

    $ctrl.prefferPlasticCard = () => {
        PhysicalCardsRequestService.index($ctrl.modal.scope.voucher.address).then(res => {
            $ctrl.requestPhysicalCardForm.values = res.data.data[0] || {};
            $ctrl.preffersPlasticCard = true;
            $ctrl.state = 'select_type';

            $timeout(() => $element.find('#physical_card_address').focus(), 250);
        });
    };

    $ctrl.submitActivationCode = () => {
        $ctrl.activateCodeForm.submit();
    };

    $ctrl.requestCard = () => {
        $ctrl.requestPhysicalCardForm.submit();
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '=',
        voucher: '<',
    },
    controller: [
        '$element',
        '$timeout',
        'FormBuilderService',
        'PhysicalCardsService',
        'PhysicalCardsRequestService',
        ModalPhysicalCardTypeComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-physical-card-type.html';
    }
};