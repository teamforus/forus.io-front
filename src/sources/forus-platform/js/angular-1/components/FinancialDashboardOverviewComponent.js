let FinancialDashboardOverviewComponent = function(
    appConfigs,
    FundService,
    ModalService,
    FileService
) {
    const $ctrl = this;

    $ctrl.divide = (value, from, _default = 0) => {
        return from ? value / from : _default;
    };

    $ctrl.getPercentage = (value, from) => {
        return ($ctrl.divide(value, from) * 100).toFixed(2)
    };

    $ctrl.transformFunds = () => {
        $ctrl.budgetFunds.forEach(fund => {
            fund.collapsedData = false;

            fund.budget.percentageTotal = '100.00';
            fund.budget.percentageActive = $ctrl.getPercentage(fund.budget.active_vouchers_amount, fund.budget.vouchers_amount);
            fund.budget.percentageInactive = $ctrl.getPercentage(fund.budget.inactive_vouchers_amount, fund.budget.vouchers_amount);
            
            fund.budget.percentageUsed = $ctrl.getPercentage(fund.budget.used_active_vouchers, fund.budget.vouchers_amount);
            fund.budget.percentageLeft = $ctrl.getPercentage(fund.budget.vouchers_amount - fund.budget.used_active_vouchers, fund.budget.vouchers_amount);
            fund.budget.averagePerVoucher = $ctrl.divide(fund.budget.vouchers_amount, fund.budget.vouchers_count)
        });
    };

    $ctrl.exportFunds = (detailed) => {
        ModalService.open('exportType', {
            success: (data) => {
                FundService.financialOverviewExport($ctrl.organization.id, {
                    export_type: data.exportType,
                    detailed: detailed ? 1 : 0
                }).then((res => {
                    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

                    const fileData = res.data;
                    const fileType = res.headers('Content-Type') + ';charset=utf-8;';
                    const fileName = [
                        appConfigs.panel_type,
                        $ctrl.organization.name, 
                        dateTime + '.' + data.exportType
                    ].join('_');

                    FileService.downloadFile(fileName, fileData, fileType);
                }), console.error);
            }
        });
    };

    $ctrl.$onInit = function() {
        $ctrl.funds.data = $ctrl.funds.data.filter((fund) => {
            return fund.state != 'waiting';
        });

        $ctrl.budgetFunds = $ctrl.funds.data.filter((fund) => {
            return fund.state == 'active' && fund.type == 'budget';
        });

        $ctrl.transformFunds();
    };
};

module.exports = {
    bindings: {
        funds: '<',
        organization: '<',
        fundsFinancialOverview: '<',
    },
    controller: [
        'appConfigs',
        'FundService',
        'ModalService',
        'FileService',
        FinancialDashboardOverviewComponent
    ],
    templateUrl: 'assets/tpl/pages/financial-dashboard-overview.html'
};