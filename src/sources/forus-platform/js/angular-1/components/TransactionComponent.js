const TransactionComponent = function(
    appConfigs,
    ModalService,
    TransactionService,
    PushNotificationsService,
    ProductReservationService
) {
    const $ctrl = this;

    $ctrl.updateTransaction = () => {
        TransactionService.show(
            appConfigs.panel_type, 
            $ctrl.organization.id, 
            $ctrl.transaction.address
        ).then((res) => {
            $ctrl.transaction = res.data.data;
        });
    }

    $ctrl.cancelTransaction = (reservation) => {
        ModalService.open("dangerZone", {
            title: "Weet u zeker dat u de betaling wilt weigeren?",
            description_text: "Wanneer u de reservering weigert kunt u deze daarna niet meer accepteren.",
            cancelButton: "Annuleren",
            confirmButton: "Bevestigen",
            onConfirm: () => {
                ProductReservationService.reject($ctrl.organization.id, reservation.id).then(() => {
                    PushNotificationsService.success('Opgeslagen!');
                    $ctrl.updateTransaction();
                }, (res) => PushNotificationsService.danger(res.data.message));
            },
        });
    };

    $ctrl.$onInit = function() {
        $ctrl.appConfigs = appConfigs;
    };
};

module.exports = {
    bindings: {
        organization: '<',
        transaction: '<',
    },
    controller: [
        'appConfigs',
        'ModalService',
        'TransactionService',
        'PushNotificationsService',
        'ProductReservationService',
        TransactionComponent
    ],
    templateUrl: 'assets/tpl/pages/transaction.html'
};