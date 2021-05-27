let TermsAndConditionsComponent = function($sce) {
    const $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.description_html = $sce.trustAsHtml($ctrl.page.content_html);
    };
}

module.exports = {
    bindings: {
        page: '<',
    },
    controller: [
        '$sce',
        TermsAndConditionsComponent
    ],
    templateUrl: 'assets/tpl/pages/terms-and-conditions.html'
};