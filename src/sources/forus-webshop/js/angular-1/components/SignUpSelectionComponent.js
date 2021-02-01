let SignUpSelectionComponent = function($sce) {
    const $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.description_html = $sce.trustAsHtml($ctrl.page.content_html);
    };
};

module.exports = {
    bindings: {
        page: '<',
        configs: '<',
    },
    controller: [
        '$sce',
        SignUpSelectionComponent
    ],
    templateUrl: 'assets/tpl/pages/sign-up-options.html'
};