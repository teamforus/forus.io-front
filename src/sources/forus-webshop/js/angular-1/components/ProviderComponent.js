const ProviderComponent = function($state, $stateParams) {
    const $ctrl = this;

    $ctrl.mapOptions = {
        zoom: 11,
        centerType: 'avg',
    };

    $ctrl.$onInit = () => {
        $ctrl.searchData = $stateParams.searchData || null;
    };
};

module.exports = {
    bindings: {
        provider: '<',
        products: '<',
        subsidies: '<',
    },
    controller: [
        '$state',
        '$stateParams',
        ProviderComponent
    ],
    templateUrl: 'assets/tpl/pages/provider.html'
};