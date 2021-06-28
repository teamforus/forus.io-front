const ModalReservationCreateComponent = function(
    VoucherService,
    FormBuilderService,
    ProductReservationService,
) {
    const $ctrl = this;

    $ctrl.products = false;
    $ctrl.formProducts = false;

    $ctrl.makeProductForm = (voucher_address, products) => {
        const product = products[0];

        $ctrl.products = products;
        $ctrl.showOverview = false;

        $ctrl.formProducts = FormBuilderService.build({
            note: '',
        }, (form) => {
            const product_id = form.product.id;
            const data = { product_id, voucher_address, note: form.values.note };
            form.resetErrors();

            ProductReservationService.store($ctrl.organization.id, data).then((res) => {
                $ctrl.reservation = res.data.data;
                $ctrl.onCreated($ctrl.reservation);
            }, console.error).finally(() => form.unlock());
        }, true);

        $ctrl.formProducts.product = product;
    };

    $ctrl.makeVoucherForm = () => {
        $ctrl.form = FormBuilderService.build({
            number: '',
        }, (form) => {
            const number = form.values.number;
            const organization_id = $ctrl.organization.id;

            form.resetErrors();
            $ctrl.products = false;

            VoucherService.readProvider(number).then((res) => {
                const voucher = res.data.data;
                const { allowed_organizations, address } = voucher;

                if (voucher.fund.type === 'subsidies' && !$ctrl.organization.reservations_subsidy_enabled) {
                    return form.errors.number = ["Uw organisatie mag geen reserveringen aanmaken voor kortingspassen. Neem contact op met support!"];
                }

                if (voucher.fund.type === 'budget' && !$ctrl.organization.reservations_budget_enabled) {
                    return form.errors.number = ["Uw organisatie mag geen reserveringen aanmaken voor budgetten. Neem contact op met support!"];
                }

                if (!allowed_organizations.map((item) => item.id).includes($ctrl.organization.id)) {
                    return form.errors.number = ["Deze voucher is geldig maar mag niet gescant worden door uw organisatie."];
                }

                VoucherService.readProviderProducts(number, { organization_id, per_page: 100, reservable: 1 }).then((res) => {
                    const products = res.data.data;

                    if (products.length === 0) {
                        return form.errors.number = ["Deze voucher is geldig maar er zijn tegoeden beschikbaar voor het gekozen product."];
                    }

                    $ctrl.makeProductForm(address, products);
                });

            }, (res) => {
                form.errors.number = res.data.errors ? res.data.errors.address : [res.data.message];
            }).finally(() => form.unlock());

        }, true);
    };

    $ctrl.showVoucherForm = function() {
        $ctrl.formProducts = false;
        $ctrl.makeVoucherForm();
    }

    $ctrl.$onInit = () => {
        $ctrl.organization = $ctrl.modal.scope.organization;
        $ctrl.onCreated = $ctrl.modal.scope.onCreated;

        $ctrl.makeVoucherForm();
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '=',
    },
    controller: [
        'VoucherService',
        'FormBuilderService',
        'ProductReservationService',
        ModalReservationCreateComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-reservation-create.html';
    }
};
