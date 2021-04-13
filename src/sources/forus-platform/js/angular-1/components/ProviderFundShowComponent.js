let ProviderFundShowComponent = function() {
    let $ctrl = this;
    $ctrl.$onInit = function() {
        console.log($ctrl.fundProvider)
    };
};

module.exports = {
    bindings: {
        fund: '<',
        organization: '<',
        fundProvider: '<',
    },
    controller: [
        'ProviderFundService',
        ProviderFundShowComponent
    ],
    templateUrl: 'assets/tpl/pages/provider-fund-show.html'
};