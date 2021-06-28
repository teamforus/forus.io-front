const ReservationsComponent = function(
    $filter,
    $timeout,
    ModalService,
    OrganizationService,
    PushNotificationsService,
    ProductReservationService
) {
    const $ctrl = this;
    const $currencyFormat = $filter('currency_format');

    $ctrl.empty = null;
    $ctrl.acceptedBydefault = false;

    $ctrl.states = [{
        key: null,
        name: 'Alle'
    }, {
        key: 'pending',
        name: 'Wachtend'
    }, {
        key: 'accepted',
        name: 'Geaccepteerd'
    }, {
        key: 'rejected',
        name: 'Geweigerd'
    }];

    $ctrl.filters = {
        show: false,
        values: {},
        reset: function() {
            this.values.q = '';
            this.values.state = $ctrl.states[0].key;
            this.values.from = null;
            this.values.to = null;
            this.values.fund_id = null;
            this.values.product_id = null;
        }
    };

    $ctrl.resetFilters = () => {
        $ctrl.filters.reset();
    };

    $ctrl.hideFilters = () => {
        $timeout(() => $ctrl.filters.show = false, 0);
    };

    $ctrl.onPageChange = (query = {}) => {
        ProductReservationService.list($ctrl.organization.id, { ...$ctrl.filters.values, ...query }).then((res) => {
            $ctrl.reservations = res.data;
        });
    };

    $ctrl.acceptReservation = (reservation) => {
        ModalService.open("dangerZone", {
            description_title: "Weet u zeker dat u de reservering wilt accepteren?",
            description_text: [
                "U staat op het punt om een reservering te accepteren voor het aanbod ",
                reservation.product.name + " voor " + $currencyFormat(reservation.amount) + "\n",
                "U kunt de transactie binnen 14 dagen annuleren, daarna volgt de uitbetaling."
            ].join("\n"),
            text_align: 'center',
            cancelButton: "Annuleren",
            confirmButton: "Bevestigen",
            onConfirm: () => {
                ProductReservationService.accept($ctrl.organization.id, reservation.id).then(() => {
                    PushNotificationsService.success('Opgeslagen!');
                    $ctrl.onPageChange();
                }, (res) => PushNotificationsService.danger(res.data.message));
            },
        });
    }

    $ctrl.rejectReservation = (reservation) => {
        ModalService.open("dangerZone", {
            title: "Weet u zeker dat u de betaling wilt weigeren?",
            description_text: "Wanneer u de reservering weigert kunt u deze daarna niet meer accepteren.",
            cancelButton: "Annuleren",
            confirmButton: "Bevestigen",
            onConfirm: () => {
                ProductReservationService.reject($ctrl.organization.id, reservation.id).then(() => {
                    PushNotificationsService.success('Opgeslagen!');
                    $ctrl.onPageChange();
                }, (res) => PushNotificationsService.danger(res.data.message));
            },
        });
    }

    $ctrl.setOrganization = (organization) => {
        $ctrl.organization = organization;
        $ctrl.acceptedBydefault = $ctrl.organization.reservations_auto_accept;
    }

    $ctrl.toggleAcceptByDefault = (value) => {
        const onEnable = () => {
            OrganizationService.updateAcceptReservations($ctrl.organization.id, value).then((res) => {
                $ctrl.setOrganization(res.data.data);
                PushNotificationsService.success('Opgeslagen!');
            });
        };

        const onDisable = () => {
            OrganizationService.updateAcceptReservations($ctrl.organization.id, value).then((res) => {
                $ctrl.setOrganization(res.data.data);
                PushNotificationsService.success('Opgeslagen!');
            });
        };

        const onCancel = () => {
            OrganizationService.read($ctrl.organization.id, value).then((res) => {
                $ctrl.setOrganization(res.data.data);
            });
        };

        if (value) {
            ModalService.open("dangerZone", {
                title: "De publicatie van het aanbod wordt van de website verwijderd",
                description_text: [
                    "Weet u zeker dat u reserveringen automatisch wilt accepteren? Ga dan akkoord met onderstaande voorwaarden:\n",
                    "- Ik kan het product of de dienst leveren.",
                    "- Na accepteren wordt er na veertien dagen uitbetaald.",
                    "- De betaling kan op verzoek van de klant binnen veertien dagen geannuleerd worden."
                ].join("\n"),
                confirmation: "Ik ga akkoord met de voorwaarden.",
                cancelButton: "Annuleer",
                confirmButton: "Bevestigen",
                onConfirm: onEnable,
                onCancel: onCancel,
            });
        } else {
            onDisable();
        }
    };

    $ctrl.makeReservation = () => {
        ModalService.open('reservationCreate', {
            organization: $ctrl.organization,
            onCreated: () => $ctrl.onPageChange(),
        });
    };

    $ctrl.uploadReservations = () => {
        ModalService.open('reservationBatchCreate', {
            organization: $ctrl.organization,
            onCreated: () => $ctrl.onPageChange(),
        });
    };

    $ctrl.init = () => {
        $ctrl.filters.reset();
        $ctrl.onPageChange($ctrl.filters.values);
        $ctrl.acceptedBydefault = $ctrl.organization.reservations_auto_accept;
    };

    $ctrl.$onInit = () => {
        $ctrl.init();

        $ctrl.funds.unshift({
            fund: {
                id: null,
                name: 'Alle tegoeden',
            }
        });

        $ctrl.products.unshift({
            id: null,
            name: 'Alle aanbod',
        });
    };
};

module.exports = {
    bindings: {
        funds: '<',
        products: '<',
        organization: '<',
    },
    controller: [
        '$filter',
        '$timeout',
        'ModalService',
        'OrganizationService',
        'PushNotificationsService',
        'ProductReservationService',
        ReservationsComponent
    ],
    templateUrl: 'assets/tpl/pages/reservations.html'
};