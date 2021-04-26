let FinancialDashboardComponent = function(
    $state,
    $scope,
    $q,
    $stateParams,
    FundService,
    DateService,
    OrganizationService,
    FileService
) {
    let $ctrl = this;

    $ctrl.filters = {
        values: {
            q: "",
            per_page: 15,
            state: 'approved_or_has_transactions',
        },
    };

    $ctrl.selectionTypes = ['funds', 'providerOrganizations', 'postcodes', 'productCategories'];

    $ctrl.selections = {
        funds: {
            type: 'funds',
            ids: null,
            items: [],
            names: 'Alle fondsen',
            noSelection: 'Alle fondsen'
        },
        providerOrganizations: {
            type: 'providerOrganizations',
            ids:  null,
            items: [],
            names: 'Alle aanbieders',
            noSelection: 'Alle aanbieders'
        },
        postcodes: {
            type: 'postcodes',
            ids: null,
            items: [],
            names: 'Alle postcodes',
            noSelection: 'Alle postcodes'
        },
        productCategories: {
            type: 'productCategories',
            ids: null,
            items: [],
            names: 'Alle categories',
            noSelection: 'Alle categories'
        }
    }

    $ctrl.shownDropdownType = null;

    $ctrl.onClickOutsideDropdown = (e) => {
        $scope.$apply(() => {
            $ctrl.shownDropdownType = null;
        });
    }

    $ctrl.showDropdown = (e, type) => {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();

        $ctrl.shownDropdownType = type;
    }

    $ctrl.getQuery = () => {
        return {
            fund_ids: $ctrl.selections.funds.ids,
            postcodes: $ctrl.selections.postcodes.ids ? $ctrl.selections.postcodes.names : '',
            provider_ids: $ctrl.selections.providerOrganizations.ids,
            product_category_ids: $ctrl.selections.productCategories.ids,
        };
    }

    $ctrl.getProviderTotals = () => {
        let deferred = $q.defer();

        OrganizationService.providerFinanceTotals(
            $ctrl.organization.id, $ctrl.getQuery()
        ).then(res => {
            deferred.resolve($ctrl.providerTotals = res.data);
        }, deferred.reject);

        return deferred.promise;
    }

    $ctrl.getFinancePerProvider = () => {
        let deferred = $q.defer();

        OrganizationService.providerFinance(
            $ctrl.organization.id, $ctrl.getQuery()
        ).then(res => {
            deferred.resolve($ctrl.providerOrganizationsFinances = res.data);
        }, deferred.reject);

        return deferred.promise;
    }

    $ctrl.refreshDashboardData = () => {
        $ctrl.chartData.update();

        $ctrl.getProviderTotals();
        $ctrl.getFinancePerProvider();
    }

    $ctrl.exportFinances = () => {
        OrganizationService.exportFinances(
            $ctrl.organization.id, $ctrl.getQuery()
        ).then((res => {
            FileService.downloadFile(
                'financial-dashboard_' + $ctrl.organization.name + '_' + moment().format(
                    'YYYY-MM-DD HH:mm:ss'
                ) + '.xls',
                res.data,
                res.headers('Content-Type') + ';charset=utf-8;'
            );
        }));
    }

    $ctrl.$onInit = function() {
        $ctrl.chartData = {
            request: {
                type: "all",
                nth: moment().month() + 1,
                year: moment().year(),
                product_category: null,
            },
            response: {},
            stringTitle: "",
            changeType: function(type) {
                this.request.type = type;

                if (this.request.type == 'week') {
                    this.request.nth = moment().week();
                } else if (this.request.type == 'month') {
                    this.request.nth = moment().month() + 1;
                } else if (this.request.type == 'quarter') {
                    this.request.nth = moment().quarter();
                } else if (this.request.type == 'all') {
                    this.request.nth = null;
                }

                this.update();
            },
            increase: function() {
                if (this.request.type == 'all') {
                    this.request.year++;
                } else if (this.request.type == 'week') {
                    if (this.request.nth == moment().year(this.request.year).weeksInYear()) {
                        this.request.nth = 1;
                        this.request.year++;
                    } else {
                        this.request.nth++;
                    }
                } else if (this.request.type == 'month') {
                    if (this.request.nth == 12) {
                        this.request.nth = 1;
                        this.request.year++;
                    } else {
                        this.request.nth++;
                    }
                } else if (this.request.type == 'quarter') {
                    if (this.request.nth == 4) {
                        this.request.nth = 1;
                        this.request.year++;
                    } else {
                        this.request.nth++;
                    }
                }

                this.update();
            },
            decrease: function() {
                if (this.request.type == 'all') {
                    this.request.year--;
                } else if (this.request.type == 'week') {
                    if (this.request.nth == 1) {
                        this.request.year--;
                        this.request.nth = moment().year(this.request.year).weeksInYear();
                    } else {
                        this.request.nth--;
                    }
                } else if (this.request.type == 'month') {
                    if (this.request.nth == 1) {
                        this.request.nth = 12;
                        this.request.year--;
                    } else {
                        this.request.nth--;
                    }
                } else if (this.request.type == 'quarter') {
                    if (this.request.nth == 1) {
                        this.request.nth = 4;
                        this.request.year--;
                    } else {
                        this.request.nth--;
                    }
                }

                this.update();
            },
            updateTitle: function() {
                let stringTitle = "";

                if (this.request.type == 'week') {
                    stringTitle = this.request.nth + ' Week ' + this.request.year;
                } else if (this.request.type == 'month') {
                    stringTitle = moment.months(this.request.nth - 1) + ' ' + this.request.year;
                } else if (this.request.type == 'quarter') {
                    stringTitle = 'Kwartaal: Q' + this.request.nth + ' ' + this.request.year;
                } else if (this.request.type == 'all') {
                    stringTitle = 'Jaar ' + this.request.year;
                }

                this.stringTitle = stringTitle;
            },
            update: function() {
                this.updateTitle();

                FundService.readFinances(
                    $ctrl.organization.id,
                    Object.assign($ctrl.chartData.request, $ctrl.getQuery())
                ).then(function(res) {
                    $ctrl.chartData.response = res.data;
                });
            }
        };

        if (Array.isArray($ctrl.funds)) {
            $ctrl.funds = $ctrl.funds.filter(function(fund) {
                return fund.state !== 'waiting';
            });

            if ($ctrl.funds.length == 1 && !$ctrl.fund) {
                return $state.go('financial-dashboard', {
                    organization_id: $ctrl.funds[0].organization_id,
                    fund_id: $ctrl.funds[0].id
                });
            }
        }

        $ctrl.emptyBlockLink = $state.href('funds-create', $stateParams);
        
        $ctrl.refreshDashboardData();

        $ctrl.productCategories.push({
            name: 'Anders',
            id: -1
        });

        $ctrl.funds.unshift({
            name: 'Alle fondsen',
            id: null,
            checked: true
        });

        $ctrl.providerOrganizations.unshift({
            name: 'Alle aanbieders',
            id: null,
            checked: true
        });

        $ctrl.postcodes.unshift({
            name: 'Alle postcodes',
            id: null,
            checked: true
        });

        $ctrl.productCategories.unshift({
            name: 'Alle categories',
            id: null,
            checked: true
        });
    };

    $ctrl.resetSelection = (type) => {
        $ctrl.selections[type].ids   = null;
        $ctrl.selections[type].items = [];
        $ctrl.selections[type].names = $ctrl.selections[type]['noSelection'];

        $ctrl[type].map(item => {
            item.checked = false;
        });
        
        $ctrl.refreshDashboardData();
    }

    $ctrl.selectOption = (type, selectedItem) => {
        //- Unselect other options if 'all' 
        if (selectedItem.id == null && selectedItem.checked) {
            $ctrl[type].map(item => item.checked = (item.id == null));
        }

        //- Unselect 'all' if other options checked
        if (selectedItem.id != null && selectedItem.checked) {
            $ctrl[type][0].checked = false;
        }

        //- Items selected (except 'all' option)
        let selectedItems = $ctrl[type].filter(
            item => item.checked && item.id != null
        );

        $ctrl.selections[type]['items'] = selectedItems;
        $ctrl.selections[type]['names'] = selectedItems.map(item => item.name).join(', ') || $ctrl.selections[type]['noSelection'];
        $ctrl.selections[type]['ids']   = selectedItems.length ? selectedItems.map(item => item.id) : null;
        
        $ctrl.refreshDashboardData();
    };
};

module.exports = {
    bindings: {
        fund: '<',
        funds: '<',
        postcodes: '<',
        fundProviders: '<',
        organization: '<',
        productCategories: '<',
        providerOrganizations: '<'
    },
    controller: [
        '$state',
        '$scope',
        '$q',
        '$stateParams',
        'FundService',
        'DateService',
        'OrganizationService',
        'FileService',
        FinancialDashboardComponent
    ],
    templateUrl: 'assets/tpl/pages/financial-dashboard.html'
};