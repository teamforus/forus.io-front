const FundProviderProductComponent = function(
    $stateParams,
    FundService,
    ModalService,
    FundProviderChatService,
    PushNotificationsService
) {
    const $ctrl = this;

    $ctrl.disableProductItem = function(fundProvider, product) {
        FundService.stopActionConfirmationModal(() => {
            product.allowed = false;
            $ctrl.updateAllowBudgetItem(fundProvider, product);
        });
    };

    $ctrl.updateAllowBudgetItem = function(fundProvider, product) {
        FundService.updateProvider(
            fundProvider.fund.organization_id,
            fundProvider.fund.id,
            fundProvider.id, {
            enable_products: product.allowed ? [{ id: product.id }] : [],
            disable_products: !product.allowed ? [product.id] : [],
        }).then((res) => {
            PushNotificationsService.success('Opgeslagen!');
            $ctrl.fundProvider = res.data.data;
            $ctrl.updateProviderProduct();
            $ctrl.$onInit();
        }, console.error);
    };

    $ctrl.makeChat = () => {
        ModalService.open('fundProviderChatMessage', {
            organization_id: $ctrl.organization.id,
            fund_id: $ctrl.fund.id,
            fund_provider_id: $ctrl.fundProvider.id,
            product_id: $ctrl.product.id,
            submit: (fundProviderProductChat) => {
                $ctrl.fundProviderProductChat = fundProviderProductChat;
                PushNotificationsService.success('Opgeslagen!');
                $ctrl.showTheChat();
            }
        });
    };

    $ctrl.loadChat = () => {
        FundProviderChatService.list(
            $ctrl.organization.id,
            $ctrl.fund.id,
            $ctrl.fundProvider.id, {
            product_id: $ctrl.product.id
        }
        ).then((res) => {
            $ctrl.fundProviderProductChats = res.data.data;
            $ctrl.$onInit();
        });
    };

    $ctrl.showTheChat = () => {
        if (!$ctrl.fundProviderProductChat) {
            return;
        }

        ModalService.open('fundProviderChatSponsor', {
            organization_id: $ctrl.organization.id,
            fund_id: $ctrl.fund.id,
            fund_provider_id: $ctrl.fundProvider.id,
            fund_provider_chat_id: $ctrl.fundProviderProductChat.id,
            product: $ctrl.product,
            onClose: $ctrl.loadChat,
        });
    };

    $ctrl.updateProviderProduct = () => {
        FundService.getProviderProduct(
            $stateParams.organization_id,
            $stateParams.fund_id,
            $stateParams.fund_provider_id,
            $stateParams.product_id,
        ).then((res) => {
            $ctrl.product = res.data.data;
            $ctrl.updateProductMeta();
        });
    };

    $ctrl.updateProductMeta = () => {
        $ctrl.product.allowed = $ctrl.fundProvider.products.indexOf($ctrl.product.id) !== -1;
        $ctrl.product.approvedActionParams = { ...$stateParams };
        $ctrl.product.editParams = { ...$stateParams };
    };

    $ctrl.$onInit = function() {
        $ctrl.fundProviderProductChat = $ctrl.fundProviderProductChats[0] || null;
        $ctrl.updateProductMeta();

        if ($ctrl.product.deals_history && Array.isArray($ctrl.product.deals_history)) {
            $ctrl.product.deals_history = $ctrl.product.deals_history.map(deal => ({
                ...deal, ...{
                    showSubsidyDealParams: { ...$stateParams, ...{ deal_id: deal.id } }
                }
            }));
        }
    };
};

module.exports = {
    bindings: {
        organization: '<',
        fundProvider: '<',
        fundProviderProductChats: '<',
        fund: '<',
        product: '<'
    },
    controller: [
        '$stateParams',
        'FundService',
        'ModalService',
        'FundProviderChatService',
        'PushNotificationsService',
        FundProviderProductComponent
    ],
    templateUrl: 'assets/tpl/pages/fund-provider-product.html'
};