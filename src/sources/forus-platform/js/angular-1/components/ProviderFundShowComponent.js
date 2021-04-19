let ProviderFundShowComponent = function() {
    let $ctrl = this;
    $ctrl.$onInit = function() {
        console.log($ctrl.organization)
        console.log($ctrl.fund)
    };
};

module.exports = {
    bindings: {
        fund: '<',
        organization: '<',
    },
    controller: [
        ProviderFundShowComponent
    ],
    templateUrl: 'assets/tpl/pages/provider-fund-show.html'
};