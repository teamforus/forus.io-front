let FinancialDashboardComponent = function(
    $state,
    $filter,
    $stateParams,
    FundService,
    TransactionService,
    OrganizationService,
    FileService,
    appConfigs
) {
    const $ctrl = this;

    $ctrl.field = 'amount';
    $ctrl.chartData = {};
    $ctrl.shownDropdownType = null;
    $ctrl.providersFinances = null;
    $ctrl.optionsList = {};

    $ctrl.providerFilters = {
        page: 1,
        per_page: 10,
    };

    $ctrl.fetchData = () => {
        $ctrl.fetchProviders({ page: 1 });
        $ctrl.updateChartData();
    };

    $ctrl.fetchProviders = (query) => {
        OrganizationService.financeProviders(
            $ctrl.organization.id,
            $ctrl.getFiltersQuery(query)
        ).then(res => $ctrl.providersFinances = res.data);
    }

    $ctrl.currencyFormat = (value) => {
        return $filter('currency_format')(value);
    };

    $ctrl.getFiltersQuery = function(query = {}) {
        return { ...$ctrl.getQuery(), ...$ctrl.timeFilters.getQuery(), ...query };
    };

    $ctrl.updateChartData = function() {
        FundService.readFinances($ctrl.organization.id, $ctrl.getFiltersQuery()).then((res) => {
            $ctrl.chartData = res.data;
        });
    };

    $ctrl.initOptions = () => {
        $ctrl.optionsList.funds = $ctrl.options.funds;
        $ctrl.optionsList.postcodes = $ctrl.options.postcodes;
        $ctrl.optionsList.providers = $ctrl.options.providers;
        $ctrl.optionsList.productCategories = $ctrl.options.product_categories;

        $ctrl.optionsList.postcodes.sort();

        $ctrl.optionsList.funds.unshift({
            id: null,
            name: 'Alle fondsen',
            transactions: $ctrl.optionsList.funds.reduce((total, fund) => total + fund.transactions, 0),
            checked: true
        });

        $ctrl.optionsList.providers.unshift({
            id: null,
            name: 'Alle aanbieders',
            transactions: $ctrl.optionsList.providers.reduce((total, fund) => total + fund.transactions, 0),
            checked: true
        });

        $ctrl.optionsList.postcodes.unshift({
            id: null,
            name: 'Alle postcodes',
            transactions: $ctrl.optionsList.postcodes.reduce((total, fund) => total + fund.transactions, 0),
            checked: true
        });

        $ctrl.optionsList.productCategories.unshift({
            id: null,
            name: 'Alle categorieën',
            checked: true
        });

        $ctrl.selectOption('funds', $ctrl.optionsList.funds[0], false);
        $ctrl.selectOption('postcodes', $ctrl.optionsList.postcodes[0], false);
        $ctrl.selectOption('providers', $ctrl.optionsList.providers[0], false);
        $ctrl.selectOption('productCategories', $ctrl.optionsList.productCategories[0], false);

        $ctrl.searchOption();
    };

    $ctrl.timeFilters = {
        startYear: 2015,
        endYear: moment().format('YYYY'),
        type: 'year',
        year: null,
        month: null,
        quarter: null,
        years: [],
        months: [],
        quarters: [],
        yearsList: [],
        monthsList: [],
        quartersList: [],
        makeYears: function() {
            return [...(new Array(moment().year() - this.startYear)).keys()].map((years) => {
                const date = moment().subtract(years, 'year').locale('nl');
                const yearStart = date.clone().startOf('year');
                const yearEnd = date.clone().endOf('year');

                return {
                    date: yearStart.clone(),
                    year: yearStart.format('YYYY'),
                    value: yearStart.format('YYYY-MM-DD'),
                    title: yearStart.format('YYYY'),
                    from: yearStart.format('YYYY-MM-DD'),
                    to: yearEnd.format('YYYY-MM-DD'),
                };
            });
        },
        makeQuarters: function(years) {
            return years.map((year) => {
                const date = year.date;
                const quarters = [...(new Array(4)).keys()];

                return {
                    quarters: quarters.map(quarter => (3 - quarter)).map((quarter) => {
                        const quarterStartDate = date.clone().startOf('year').add(quarter, 'quarter');
                        const quarterEndDate = quarterStartDate.clone().endOf('quarter');

                        return {
                            active: quarterStartDate.diff(moment()) < 0,
                            year: quarterStartDate.format('YYYY'),
                            title: quarterStartDate.format('YYYY'),
                            subtitle: quarterStartDate.format('[Q]Q'),
                            value: quarterStartDate.format('YYYY-MM-DD'),
                            from: quarterStartDate.format('YYYY-MM-DD'),
                            to: quarterEndDate.format('YYYY-MM-DD'),
                        };
                    })
                };
            }).reduce((acc, year) => [...acc, ...year.quarters], []);
        },
        makeMonths: function(years) {
            return years.map((year) => {
                const date = year.date;
                const months = [...(new Array(12)).keys()];

                return {
                    months: months.map(month => (12 - month)).map((month) => {
                        const monthStartDate = date.clone().startOf('year').add(month, 'month');
                        const monthEndDate = monthStartDate.clone().endOf('month');

                        return {
                            active: monthStartDate.diff(moment()) < 0,
                            year: monthStartDate.format('YYYY'),
                            title: monthStartDate.format('YYYY'),
                            subtitle: monthStartDate.format('MMMM'),
                            value: monthStartDate.format('YYYY-MM-DD'),
                            from: monthStartDate.format('YYYY-MM-DD'),
                            to: monthEndDate.format('YYYY-MM-DD'),
                        };
                    })
                };
            }).reduce((acc, year) => [...acc, ...year.months], []);
        },
        init: function() {
            this.years = this.makeYears();
            this.months = this.makeMonths(this.years);
            this.quarters = this.makeQuarters(this.years)

            this.year = this.years[0];

            this.updateLists();
            this.updateValues(true);
            this.fetchData();
        },
        updateLists: function() {
            this.yearsList = [...this.years];
            this.monthsList = [...this.months].filter(month => month.year === this.year.year);
            this.quartersList = [...this.quarters].filter(quarter => quarter.year === this.year.year);

            this.yearsList.reverse();
            this.monthsList.reverse();
            this.quartersList.reverse();
        },
        updateValues: function(selectLast = false) {
            const activeMonths = this.monthsList.filter((month) => month.active);
            const activeQuarters = this.quartersList.filter((quarter) => quarter.active);

            if (selectLast) {
                this.month = activeMonths[activeMonths.length - 1] || null;
                this.quarter = activeQuarters[activeQuarters.length - 1] || null;
            } else {
                this.month = activeMonths[0] || null;
                this.quarter = activeQuarters[0] || null;
            }
        },
        setFilter: function(value, type) {
            this[type || this.type] = value;
            this.fetchData();
        },
        prevPage: function() {
            if (this.yearsList.indexOf(this.year) > 0) {
                this.year = this.yearsList[this.yearsList.indexOf(this.year) - 1];

                this.updateLists();
                this.updateValues(true);
                this.fetchData();
            }
        },
        nextPage: function() {
            if (this.yearsList.indexOf(this.year) < (this.yearsList.length - 1)) {
                this.year = this.yearsList[this.yearsList.indexOf(this.year) + 1];

                this.updateLists();
                this.updateValues(false);
                this.fetchData();
            }
        },
        setType: function(type) {
            this.type = type;
            this.fetchData();
        },
        fetchData: function() {
            $ctrl.fetchData();
        },
        getQuery: function() {
            const { type, year, month, quarter } = this;

            return {
                type: type,
                type_value: { year, month, quarter }[this.type].value,
                from: { year, month, quarter }[this.type].from,
                to: { year, month, quarter }[this.type].to,
            };
        }
    };

    $ctrl.makeSelection = (type, names, noSelection) => {
        return {
            ...{
                q: '',
                ids: null,
                items: [],
                options: [],
            }, ...{ type, names, noSelection }
        };
    };

    $ctrl.selections = {
        funds: $ctrl.makeSelection('funds', 'Alle fondsen', 'Alle fondsen'),
        providers: $ctrl.makeSelection('providers', 'Alle aanbieders', 'Alle aanbieders'),
        postcodes: $ctrl.makeSelection('postcodes', 'Alle postcodes', 'Alle postcodes'),
        productCategories: $ctrl.makeSelection('productCategories', 'Alle categorieën', 'Alle categorieën'),
    }

    $ctrl.onClickOutsideDropdown = () => {
        $ctrl.shownDropdownType = null;
    }

    $ctrl.showDropdown = (e, type) => {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();

        $ctrl.shownDropdownType = type;
    }

    $ctrl.getQuery = () => {
        return {
            fund_ids: $ctrl.selections.funds.ids,
            postcodes: $ctrl.selections.postcodes.items.map(item => item.name),
            provider_ids: $ctrl.selections.providers.ids,
            product_category_ids: $ctrl.selections.productCategories.ids,
        };
    }

    $ctrl.financeProvidersExport = () => {
        OrganizationService.financeProvidersExport(
            $ctrl.organization.id,
            $ctrl.getFiltersQuery()
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

    $ctrl.getSelectAllOption = (type) => $ctrl.optionsList[type].filter(item => item.id == null)[0];
    $ctrl.getItemOptions = (type) => $ctrl.optionsList[type].filter(item => item.id != null);

    $ctrl.resetSelection = (type) => {
        $ctrl.getSelectAllOption(type).checked = true;;
        $ctrl.selectOption(type, $ctrl.getSelectAllOption(type));
    }

    $ctrl.selectOption = (type, selectedItem, fetchData = true) => {
        const optionAll = $ctrl.getSelectAllOption(type);
        const optionItems = $ctrl.getItemOptions(type);

        //- Select all options if 'all' 
        if (selectedItem.id == null) {
            optionItems.forEach(item => item.checked = selectedItem.checked);
        }

        optionAll.checked = optionItems.filter(item => item.checked).length === optionItems.length;

        const selectedItems = optionAll.checked ? null : optionItems.filter(item => item.checked);

        $ctrl.selections[type]['items'] = selectedItems ? selectedItems : [];
        $ctrl.selections[type]['names'] = selectedItems ? selectedItems.map(item => item.name).join(', ') : $ctrl.selections[type]['noSelection'];
        $ctrl.selections[type]['ids'] = selectedItems ? selectedItems.map(item => item.id) : null;

        if (fetchData) {
            $ctrl.fetchData();
        }
    };

    $ctrl.searchOption = () => {
        Object.keys($ctrl.selections).forEach((key) => {
            $ctrl.selections[key].options = $ctrl.optionsList[key].filter((item) => {
                return item.name.toLowerCase().includes($ctrl.selections[key].q.toLowerCase());
            });
        });
    };

    $ctrl.showProviderTransactions = (provider) => {
        if (provider.transactions) {
            delete provider.transactions;
            delete provider.filter;
        } else {
            provider.filter = {
                page: 1,
                per_page: 10,
                provider_ids: [provider.provider.id],
            };
    
            this.fetchProviderTransactions(provider, provider.filter);
        }
    };

    $ctrl.fetchProviderTransactions = (provider, query = {}) => {
        const filters = $ctrl.getFiltersQuery(query)

        TransactionService.list(appConfigs.panel_type, $ctrl.organization.id, filters).then((res => {
            provider.transactions = res.data;
            provider.transactionsTotal = res.data.meta.total_amount;
        }));
    };

    $ctrl.showTransaction = (transaction) => {
        $state.go('transaction', appConfigs.panel_type == 'sponsor' ? {
            address: transaction.address,
            organization_id: transaction.fund.organization_id
        } : transaction);
    };

    $ctrl.onProviderTransactionPageChange = (provider, query) => {
        $ctrl.fetchProviderTransactions(provider, query);
    };

    $ctrl.$onInit = function() {
        $ctrl.emptyBlockLink = $state.href('funds-create', $stateParams);
        $ctrl.initOptions();
        $ctrl.timeFilters.init();
    };
};

module.exports = {
    bindings: {
        organization: '<',
        options: '<',
    },
    controller: [
        '$state',
        '$filter',
        '$stateParams',
        'FundService',
        'TransactionService',
        'OrganizationService',
        'FileService',
        'appConfigs',
        FinancialDashboardComponent
    ],
    templateUrl: 'assets/tpl/pages/financial-dashboard.html'
};