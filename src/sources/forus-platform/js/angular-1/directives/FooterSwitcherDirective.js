let FooterSwitcherDirective = function(){};

module.exports = () => {
    return {
        restrict: "EA",
        replace: true,

        controller: [
            'appConfigs',
            FooterSwitcherDirective
        ],
        templateUrl: 'assets/tpl/directives/footer-switcher.html' 
    };
};