const ModalDuplicatesPickerComponent = function($timeout) {
    const $ctrl = this;

    $ctrl.per_page = 25;
    $ctrl.page = 1;

    $ctrl.blink = (item) => {
        if ($ctrl.itemsShown.length <= 100) {
            item.blink = true;
            $timeout(() => item.blink = false, 350);
        }
    };

    $ctrl.toggleAllOff = () => {
        $ctrl.items.filter(item => {
            if (item.model) {
                item.model = false;
                return $ctrl.itemsShown.indexOf(item) !== -1;
            }
            
            return false;
        }).forEach(item => $ctrl.blink(item));
    };

    $ctrl.toggleAllOn = () => {
        $ctrl.items.filter(item => {
            if (!item.model) {
                item.model = true;
                return $ctrl.itemsShown.indexOf(item) !== -1;
            }
            
            return false;
        }).forEach(item => $ctrl.blink(item));
    };

    $ctrl.confirm = () => {
        if ($ctrl.items.length === 1) {
            $ctrl.toggleAllOn();
        }

        $ctrl.onConfirm($ctrl.items);
        $ctrl.close();
    };

    $ctrl.cancel = () => {
        $ctrl.onCancel($ctrl.items);
        $ctrl.close();
    };

    $ctrl.loadMore = () => {
        if ($ctrl.itemsShown.length < $ctrl.items.length) {
            $ctrl.page++;
            $ctrl.itemsShown = $ctrl.items.slice(0, $ctrl.per_page * $ctrl.page);
        }
    };

    $ctrl.$onInit = () => {
        $ctrl.page = 0;
        $ctrl.onConfirm = $ctrl.modal.scope.onConfirm || (() => {});
        $ctrl.onCancel = $ctrl.modal.scope.onCancel || (() => {});
        $ctrl.enableToggles = typeof $ctrl.modal.scope.enableToggles != 'undefined' ? $ctrl.modal.scope.enableToggles : true;
        $ctrl.itemsShown = [];
        $ctrl.items = $ctrl.modal.scope.items;

        $ctrl.labels = {
            label_on: $ctrl.modal.scope.label_on || '',
            label_off: $ctrl.modal.scope.label_off || '',
            
            button_cancel: $ctrl.modal.scope.button_cancel || 'Annuleren',
            button_none: $ctrl.modal.scope.button_none || 'Skip all',
            button_all: $ctrl.modal.scope.button_all || 'Yes to all',
            button_confirm: $ctrl.modal.scope.button_confirm || 'Bevestig',
        };

        $ctrl.hero_icon = $ctrl.modal.scope.hero_icon || 'alert-outline';
        $ctrl.hero_title = $ctrl.modal.scope.hero_title || '';
        $ctrl.hero_subtitle = $ctrl.modal.scope.hero_subtitle || '';

        $ctrl.loadMore();
    };

    $ctrl.$onDestroy = function() {};
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$timeout',
        ModalDuplicatesPickerComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-duplicates-picker.html';
    }
};