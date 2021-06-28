const ReservationsComponent = function(ProductReservationService) {
    const $ctrl = this;

    $ctrl.filters = {
        page: 1,
        per_page: 15,
        state: null,
        fund_id: null,
        organization_id: null,
    };

    $ctrl.states = [{
        name: 'In afwachting',
        value: 'pending',
    }, {
        name: 'Geaccepteerd',
        value: 'accepted',
    }, {
        name: 'Geannuleerd',
        value: 'rejected',
    }, {
        name: 'Terugbetaald',
        value: 'canceled',
    }];

    $ctrl.onDelete = () => {
        $ctrl.onPageChange();
    };

    $ctrl.onPageChange = (query = {}) => {
        $ctrl.filters = { ...$ctrl.filters, ...query };

        ProductReservationService.list({
            ...$ctrl.filters,
            ...{ fund_id: $ctrl.filters.fund_id ? $ctrl.filters.fund_id.id : null }
        }).then((res) => {
            $ctrl.reservations = res.data;
        });
    };

    $ctrl.$onInit = function() {
        $ctrl.states.unshift({
            name: 'Selecteer status...',
            value: null
        });

        $ctrl.funds.unshift({
            id: null,
            name: 'Alle tegoeden',
        });

        $ctrl.organizations.unshift({
            name: 'Selecteer aanbieder...',
            id: null
        });
    };
};

module.exports = {
    bindings: {
        funds: '<',
        reservations: '<',
        organizations: '<',
    },
    controller: [
        'ProductReservationService',
        ReservationsComponent
    ],
    templateUrl: 'assets/tpl/pages/reservations.html'
};