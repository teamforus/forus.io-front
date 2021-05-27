let FundProviderProductSubsidyEditComponent = function(
    $state,
    $stateParams,
    $timeout,
    FundService,
    FormBuilderService,
    PushNotificationsService
) {
    let $ctrl = this;
    let timeout = null

    $ctrl.max = (a, b) => Math.max(a, b);

    $ctrl.loaded = false;
    $ctrl.stateParams = {};

    $ctrl.amountChange = () => {
        $timeout.cancel(timeout);

        if (!$ctrl.form.values.amount && $ctrl.form.values.amount !== 0) {
            timeout = $timeout(() => $ctrl.form.values.amount = 0, 1000);
        }
    };

    $ctrl.$onInit = () => {
        const deal_id = $stateParams.deal_id || false;
        const dealsHistory = $ctrl.product.deals_history;
        const deal = dealsHistory.filter((deal) => deal_id ? deal.id == deal_id : deal.active)[0] || false;

        if (deal_id && !deal || $ctrl.fund.type !== 'subsidies') {
            return $state.go('fund-provider', $stateParams);
        }

        const values = deal ? {
            expire_at: deal.expire_at ? deal.expire_at : $ctrl.fundProvider.fund.end_date,
            expires_with_fund: deal.expire_at ? false : true,
            limit_total: parseFloat(deal.limit_total),
            unlimited_stock: deal.limit_total_unlimited,
            limit_per_identity: parseInt(deal.limit_per_identity),
            amount: parseFloat(deal.amount),
            gratis: parseFloat(deal.amount) === parseFloat($ctrl.product.price),
        } : {
            expire_at: $ctrl.fundProvider.fund.end_date,
            expires_with_fund: true,
            limit_total: 1,
            unlimited_stock: false,
            limit_per_identity: 1,
            amount: 0,
            gratis: false,
        };
        
        $ctrl.deal = deal;
        $ctrl.loaded = true;
        $ctrl.readOnly = deal_id || ($ctrl.fundProvider.products.indexOf($ctrl.product.id) !== -1);

        $ctrl.stateParams = {
            sponsor_provider_organization: {
                organization_id: $ctrl.organization.id,
                provider_organization_id: $ctrl.fundProvider.organization.id
            },
            fund_provider_product: {
                organization_id: $ctrl.organization.id,
                fund_id: $ctrl.fund.id,
                fund_provider_id: $ctrl.fundProvider.id,
                product_id: $ctrl.product.id
            },
        };

        $ctrl.form = FormBuilderService.build(values, (form) => {
            if ($ctrl.readOnly) {
                return form.unlock();
            }

            FundService.updateProvider($ctrl.fund.organization_id, $ctrl.fund.id, $ctrl.fundProvider.id, {
                enable_products: [{
                    id: $ctrl.product.id,
                    amount: form.values.gratis ? $ctrl.product.price : form.values.amount,
                    limit_total: form.values.limit_total,
                    limit_total_unlimited: form.values.unlimited_stock ? 1 : 0,
                    limit_per_identity: form.values.limit_per_identity,
                    expire_at: form.values.expires_with_fund ? null : form.values.expire_at,
                }],
            }).then(() => {
                $state.go('fund-provider-product', $ctrl.stateParams.fund_provider_product);
                PushNotificationsService.success("Het product is goedgekeurd.");
            }, (res) => {
                form.errors = res.data.errors;
                return form.unlock();
            });
        }, true);
    };
};

module.exports = {
    bindings: {
        organization: '<',
        fundProvider: '<',
        fund: '<',
        product: '<'
    },
    controller: [
        '$state',
        '$stateParams',
        '$timeout',
        'FundService',
        'FormBuilderService',
        'PushNotificationsService',
        FundProviderProductSubsidyEditComponent
    ],
    templateUrl: 'assets/tpl/pages/fund-provider-product-subsidy-edit.html',
};
