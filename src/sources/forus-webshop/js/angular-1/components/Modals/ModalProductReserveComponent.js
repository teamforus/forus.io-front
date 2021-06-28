const ModalProductReserveComponent = function(
    $state,
    PushNotificationsService,
    ProductReservationService
) {
    const $ctrl = this;

    $ctrl.onReserved = () => {
        $ctrl.close();

        $state.go('reservations');
        PushNotificationsService.success('Gelukt!', 'Het aanbod is gereserveerd!.');
    };

    $ctrl.onError = (res) => {
        const { errors, message } = res.data;
        const firstError = typeof errors === 'object' ? Object.values(errors)[0] : null

        PushNotificationsService.danger(firstError ? firstError[0] || message : message);
    };

    $ctrl.reserveProduct = (product, voucher) => {
        ProductReservationService.reserve(product.id, voucher.address).then($ctrl.onReserved, $ctrl.onError);
    };

    $ctrl.$onInit = () => {
        $ctrl.product = $ctrl.modal.scope.product;
        $ctrl.vouchers = $ctrl.modal.scope.vouchers;

        $ctrl.transValues = {
            expire_at: $ctrl.expire_at,
            product_name: $ctrl.product.name,
            product_price: $ctrl.product.price,
            org_name: $ctrl.product.organization.name,
        };
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$state',
        'PushNotificationsService',
        'ProductReservationService',
        ModalProductReserveComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-product-reserve.html';
    }
};