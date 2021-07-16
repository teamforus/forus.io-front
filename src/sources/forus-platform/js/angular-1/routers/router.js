let targetHome = 'homeStart';
let targetNewSignup = 'newSignup';

let repackResponse = (promise, onError = () => { }) => new Promise((resolve, reject) => {
    promise.then((res) => resolve(
        res.data.data ? res.data.data : res.data
    ), (res) => {
        onError(res);
        reject(res);
    });
});

let repackPagination = (promise) => new Promise((resolve, reject) => {
    promise.then((res) => resolve(res.data), reject);
});

let objectOnlyKeys = (obj, keys) => {
    let out = {};
    keys.forEach(key => out[key] = obj[key]);
    return out;
};

let handleAuthTarget = ($state, target) => {
    if (target[0] == targetHome) {
        $state.go('home', {
            confirmed: true
        });

        return true;
    }

    if (target[0] == targetNewSignup) {
        $state.go('sign-up', {
            organization_id: target[1] || undefined,
            fund_id: target[2] || undefined,
            tag: target[3] || undefined,
        });
        return true;
    }

    return false;
};

/**
 * Permission middleware
 *
 * @param {string} messageKey Error message key
 * @param {string|string[]} permissions List all required permissions
 * @param {bool} permissionsAll Require all permissions from the list
 * @param {string} dependencyKey Other resolver dependency
 * @param {function|bool} dependencyResolver Custom organization resolver from dependency
 */
let permissionMiddleware = (
    messageKey,
    permissions,
    permissionsAll = true,
    dependencyKey = 'organization',
    dependencyResolver = false
) => {
    return [
        dependencyKey,
        '$state',
        'PermissionsService', (
            dependency,
            $state,
            PermissionsService
        ) => {
            let organization;

            if (dependencyResolver && typeof (dependencyResolver) == 'function') {
                organization = dependencyResolver(dependency);
            } else {
                if (dependencyKey == 'organization') {
                    organization = dependency;
                } else if (dependencyKey == 'fund') {
                    organization = dependency.organization;
                }
            }

            if (!PermissionsService.hasPermission(organization, permissions, permissionsAll)) {
                return setTimeout(() => $state.go('no-permission', { error: messageKey }), 0);
            }

            return true;
        }
    ];
};

let organziationResolver = (uriKey = 'organization_id') => {
    return ['$transition$', 'OrganizationService', (
        $transition$, OrganizationService
    ) => repackResponse(
        OrganizationService.read($transition$.params()[uriKey])
    )];
};

module.exports = ['$stateProvider', '$locationProvider', 'appConfigs', (
    $stateProvider, $locationProvider, appConfigs
) => {
    $stateProvider.state({
        name: "home",
        url: "/?digid_error",
        component: "homeComponent",
        params: {
            confirmed: null,
            digid_error: null
        },
    });

    $stateProvider.state({
        name: "no-permission",
        url: "/no-permission?error",
        component: "noPermissionComponent",
        resolve: {
            message: ['$filter', ($filter) => ({
                title: $filter('translate')('permissions.title'),
                description: $filter('translate')('permissions.description')
            })]
        }
    });

    /**
     * Organizations
     */
    $stateProvider.state({
        name: "organizations",
        url: "/organizations",
        controller: ['$rootScope', ($rootScope) => {
            if (!$rootScope.auth_user) {
                $rootScope.loadAuthUser().then(() => $rootScope.autoSelectOrganization());
            } else {
                $rootScope.autoSelectOrganization()
            }
        }]
    });

    // Provider overview
    $stateProvider.state({
        name: "provider-overview",
        url: "/organizations/{organization_id}/overview",
        component: "providerOverviewComponent",
        resolve: {
            organization: organziationResolver(),
            funds: ['$transition$', 'ProviderFundService', (
                $transition$, ProviderFundService
            ) => repackResponse(ProviderFundService.listFunds(
                $transition$.params().organization_id
            ))],
            employeesTotal: ['$q', '$transition$', 'OrganizationEmployeesService', (
                $q, $transition$, OrganizationEmployeesService
            ) => $q((resolve) => OrganizationEmployeesService.list(
                $transition$.params().organization_id,
                { per_page: 1 }
            ).then(res => resolve(res.data.meta.total)))],
            productsTotal: ['$q', '$transition$', 'ProductService', (
                $q, $transition$, ProductService
            ) => $q((resolve) => ProductService.list(
                $transition$.params().organization_id,
                { per_page: 1 }
            ).then(res => resolve(res.data.meta.total)))],
            transactionsTotal: ['$q', '$transition$', 'appConfigs', 'TransactionService', (
                $q, $transition$, appConfigs, TransactionService
            ) => $q((resolve) => TransactionService.list(
                appConfigs.panel_type,
                $transition$.params().organization_id,
                { per_page: 1 }
            ).then(res => resolve(res.data.meta.total_amount)))]
        }
    });

    $stateProvider.state({
        name: "organizations-view",
        url: "/organization/{id}",
        controller: ['$rootScope', '$transition$', 'OrganizationService', (
            $rootScope, $transition$, OrganizationService
        ) => {
            $rootScope.loadAuthUser().then(() => {
                OrganizationService.use($transition$.params().id);
                $rootScope.redirectToDashboard($transition$.params().id);
            });
        }]
    });

    $stateProvider.state({
        name: "organizations-create",
        url: "/organizations/create",
        component: "organizationsEditComponent",
        resolve: {
            businessTypes: ['BusinessTypeService', (
                BusinessTypeService
            ) => repackResponse(BusinessTypeService.list({
                per_page: 9999
            }))]
        }
    });

    $stateProvider.state({
        name: "organizations-edit",
        url: "/organizations/{id}/edit",
        component: "organizationsEditComponent",
        resolve: {
            permission: permissionMiddleware('organization-edit', 'manage_organization'),
            organization: organziationResolver('id'),
            businessTypes: ['BusinessTypeService', (
                BusinessTypeService
            ) => repackResponse(BusinessTypeService.list({
                per_page: 9999
            }))]
        }
    });

    $stateProvider.state({
        name: "organization-funds",
        url: "/organizations/{organization_id}/funds",
        component: "organizationFundsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-funds', [
                'manage_funds', 'view_finances', 'view_funds',
            ], false),
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id
            ))],
            fundLevel: [('permission'), (permission) => "organizationFunds"],
            recordTypes: ['permission', 'RecordTypeService', (
                permission, RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
            validatorOrganizations: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.readListValidators(
                $transition$.params().organization_id, {
                per_page: 100
            }
            ))],
        }
    });

    $stateProvider.state({
        name: "external-validators",
        url: "/organizations/{organization_id}/external-validators",
        component: "externalValidatorsComponent",
        params: {
            fund_id: null,
        },
        resolve: {
            permission: permissionMiddleware('organization-providers', 'manage_organization'),
            organization: organziationResolver(),
            validatorOrganizations: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.listValidatorsAvailable())],
            validatorOrganizationsApproved: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.readListValidators(
                $transition$.params().organization_id, {
                per_page: 100
            }
            ))],
        }
    });

    $stateProvider.state({
        name: "external-funds",
        url: "/organizations/{organization_id}/external-funds",
        component: "externalFundsComponent",
        params: {
            fund_id: null,
        },
        resolve: {
            permission: permissionMiddleware('organization-providers', 'manage_organization'),
            organization: organziationResolver(),
            funds: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.listExternalFunds(
                $transition$.params().organization_id
            ))],
        }
    });

    // Organization providers
    $stateProvider.state({
        name: "sponsor-provider-organizations",
        url: "/organizations/{organization_id}/providers",
        component: "sponsorProviderOrganizationsComponent",
        resolve: {
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            organization: organziationResolver(),
            funds: ['$transition$', 'FundService', 'permission', (
                $transition$, FundService,
            ) => repackResponse(FundService.list($transition$.params().organization_id, {
                per_page: 100
            }))],
            providerOrganizations: ['permission', 'OrganizationService', '$transition$', (
                permission, OrganizationService, $transition$
            ) => permission ? repackPagination(OrganizationService.providerOrganizations(
                $transition$.params().organization_id
            )) : permission],
        }
    });

    // Organization provider
    $stateProvider.state({
        name: "sponsor-provider-organization",
        url: "/organizations/{organization_id}/provider/{provider_organization_id}",
        component: "sponsorProviderOrganizationComponent",
        resolve: {
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            organization: organziationResolver(),
            providerOrganization: ['permission', 'OrganizationService', '$transition$', (
                permission, OrganizationService, $transition$
            ) => permission ? repackResponse(OrganizationService.providerOrganization(
                $transition$.params().organization_id,
                $transition$.params().provider_organization_id,
            )) : permission],
        }
    });

    // Organization provider product create
    $stateProvider.state({
        name: "fund-provider-product-create",
        url: "/organizations/{organization_id}/funds/{fund_id}/providers/{fund_provider_id}/products/create?source=",
        component: "productsEditComponent",
        resolve: {
            source: () => 'sponsor',
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            organization: organziationResolver(),
            sourceProduct: ['$transition$', 'FundService', 'permission', (
                $transition$, FundService
            ) => $transition$.params().source ? repackResponse(FundService.getProviderProduct(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id,
                $transition$.params().source
            )) : new Promise((res) => res(null))],
            fundProvider: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(FundService.readProvider(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id
            )) : new Promise((res) => res(null))],
            providerOrganization: ['permission', 'OrganizationService', '$transition$', 'fundProvider', (
                permission, OrganizationService, $transition$, fundProvider
            ) => permission ? repackResponse(OrganizationService.providerOrganization(
                $transition$.params().organization_id,
                fundProvider.organization_id,
            )) : permission],
        }
    });

    // Organization provider
    $stateProvider.state({
        name: "fund-provider-product-edit",
        url: "/organizations/{organization_id}/funds/{fund_id}/providers/{fund_provider_id}/products/{product_id}/edit",
        component: "productsEditComponent",
        resolve: {
            source: () => 'sponsor',
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            fundProvider: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(FundService.readProvider(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id
            )) : new Promise((res) => res(null))],
            providerOrganization: ['permission', 'OrganizationService', '$transition$', 'fundProvider', (
                permission, OrganizationService, $transition$, fundProvider
            ) => permission ? repackResponse(OrganizationService.providerOrganization(
                $transition$.params().organization_id,
                fundProvider.organization_id,
            )) : permission],
            product: ['$transition$', 'FundService', 'permission', (
                $transition$, FundService
            ) => $transition$.params().product_id ? repackResponse(FundService.getProviderProduct(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id,
                $transition$.params().product_id
            )) : new Promise((res) => res(null))],
        }
    });

    // Organization providers
    $stateProvider.state({
        name: "fund-provider",
        url: "/organizations/{organization_id}/funds/{fund_id}/providers/{fund_provider_id}",
        component: "fundProviderComponent",
        params: {
            organization_id: null,
            fund_id: null,
            fund_provider_id: null
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            fundProvider: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(FundService.readProvider(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id
            )) : new Promise((res) => res(null))],
            fund: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.readPublic($transition$.params().fund_id)
            ) : new Promise((res) => res(null))]
        }
    });

    // Organization providers
    $stateProvider.state({
        name: "fund-provider-product",
        url: "/organizations/{organization_id}/funds/{fund_id}/providers/{fund_provider_id}/products/{product_id}",
        component: "fundProviderProductComponent",
        params: {
            organization_id: null,
            fund_id: null,
            fund_provider_id: null,
            product_id: null,
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            fundProvider: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(FundService.readProvider(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id
            )) : new Promise((res) => res(null))],
            fund: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.readPublic($transition$.params().fund_id)
            ) : new Promise((res) => res(null))],
            product: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.getProviderProduct(
                    $transition$.params().organization_id,
                    $transition$.params().fund_id,
                    $transition$.params().fund_provider_id,
                    $transition$.params().product_id
                )
            ) : new Promise((res) => res(null))],
            fundProviderProductChats: ['permission', '$transition$', 'FundProviderChatService', (
                permission, $transition$, FundProviderChatService
            ) => $transition$.params().fund_id != null ? repackResponse(FundProviderChatService.list(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id, {
                product_id: $transition$.params().product_id
            }
            )) : new Promise((res) => res(null))],
        }
    });

    // Organization providers
    $stateProvider.state({
        name: "fund-provider-product-subsidy-edit",
        url: "/organizations/{organization_id}/funds/{fund_id}/providers/{fund_provider_id}/products/{product_id}/subsidy?deal_id",
        component: "fundProviderProductSubsidyEditComponent",
        params: {
            organization_id: null,
            fund_id: null,
            fund_provider_id: null,
            product_id: null,
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            fundProvider: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(FundService.readProvider(
                $transition$.params().organization_id,
                $transition$.params().fund_id,
                $transition$.params().fund_provider_id
            )) : new Promise((res) => res(null))],
            fund: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.readPublic($transition$.params().fund_id)
            ) : new Promise((res) => res(null))],
            product: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.getProviderProduct(
                    $transition$.params().organization_id,
                    $transition$.params().fund_id,
                    $transition$.params().fund_provider_id,
                    $transition$.params().product_id
                )
            ) : new Promise((res) => res(null))],
        }
    });

    // Organization employees
    $stateProvider.state({
        name: "employees",
        url: "/organizations/{organization_id}/employees",
        component: "organizationEmployeesComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('employees-list', 'manage_employees'),
            employees: ['permission', '$transition$', 'OrganizationEmployeesService', (
                permission, $transition$, OrganizationEmployeesService
            ) => repackPagination(OrganizationEmployeesService.list(
                $transition$.params().organization_id
            ))],
            roles: ['permission', 'RoleService', (
                permission, RoleService
            ) => repackResponse(RoleService.list())]
        }
    });

    // Organization employees
    $stateProvider.state({
        name: "notifications",
        url: "/organizations/{organization_id}/notifications",
        component: "organizationNotificationsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('employees-list', 'manage_employees'),
        }
    });

    $stateProvider.state({
        name: "financial-dashboard",
        url: "/organizations/{organization_id}/financial-dashboard",
        component: "financialDashboardComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('financial-dashboard', 'view_finances'),
            options: ['permission', 'organization', 'FundService', (permission, organization, FundService) => {
                return permission ? FundService.readFinances(organization.id, {
                    filters: 1,
                }).then(res => res.data.filters) : null;
            }],
        }
    });

    $stateProvider.state({
        name: "financial-dashboard-overview",
        url: "/organizations/{organization_id}/financial-dashboard/overview",
        component: "financialDashboardOverviewComponent",
        resolve: {
            permission: permissionMiddleware('financial-dashboard', 'view_finances'),
            organization: organziationResolver(),
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => permission ? repackPagination(FundService.list(
                $transition$.params().organization_id
            )) : null],
            fundsFinancialOverview: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => permission ? repackPagination(FundService.financialOverview(
                $transition$.params().organization_id
            )) : permission],
        }
    });

    /**
     * Offices
     */
    $stateProvider.state({
        name: "offices",
        url: "/organizations/{organization_id}/offices",
        component: "officesComponent",
        resolve: {
            organization: organziationResolver(),
            offices: ['organization', '$transition$', 'PermissionsService', 'OfficeService', (
                organization, $transition$, PermissionsService, OfficeService
            ) => {
                if (!PermissionsService.hasPermission(organization, 'manage_offices')) {
                    return false;
                }

                return repackResponse(OfficeService.list(
                    $transition$.params().organization_id, {
                    per_page: 100
                }));
            }]
        }
    });

    $stateProvider.state({
        name: "offices-create",
        url: "/organization/{organization_id}/offices/create",
        component: "officesEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('offices-create', 'manage_offices'),
        }
    });

    $stateProvider.state({
        name: "offices-edit",
        url: "/organization/{organization_id}/offices/{id}/edit",
        component: "officesEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('offices-edit', 'manage_offices'),
            office: ['permission', '$transition$', 'OfficeService', (
                permission, $transition$, OfficeService
            ) => repackResponse(OfficeService.read(
                $transition$.params().organization_id,
                $transition$.params().id
            ))]
        }
    });

    /**
     * Funds
     */
    $stateProvider.state({
        name: "funds-create",
        url: "/organizations/{organization_id}/funds/create",
        component: "fundsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-create', 'manage_funds'),
            validators: ['permission', '$transition$', 'OrganizationEmployeesService', (
                permission, $transition$, OrganizationEmployeesService
            ) => repackResponse(OrganizationEmployeesService.list(
                $transition$.params().organization_id, {
                role: 'validation'
            }
            ))],
            productCategories: ['permission', 'ProductCategoryService', (
                permission, ProductCategoryService
            ) => repackResponse(ProductCategoryService.listAll())],
            fundStates: ['permission', 'FundService', (
                permission, FundService
            ) => FundService.states()],
            recordTypes: ['permission', 'RecordTypeService', (
                permission, RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
            validatorOrganizations: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.readListValidators(
                $transition$.params().organization_id, {
                per_page: 100
            }
            ))],
        }
    });

    /* $stateProvider.state({
        name: "funds-show",
        url: "/organizations/{organization_id}/funds/{id}",
        component: "fundsShowComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-show', [
                'manage_funds', 'view_finances'
            ], false),
            fund: [
                'permission', '$transition$', 'FundService', (
                    permission, $transition$, FundService
                ) => {
                    return repackResponse(
                        FundService.read(
                            $transition$.params().organization_id,
                            $transition$.params().id
                        )
                    );
                }
            ],
            fundLevel: ['permission', (permission) => "fundShow"]
        }
    }); */

    $stateProvider.state({
        name: "funds-edit",
        url: "/organizations/{organization_id}/funds/{id}/edit",
        component: "fundsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-edit', 'manage_funds'),
            fund: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.read(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
            validators: ['permission', '$transition$', 'OrganizationEmployeesService', (
                permission, $transition$, OrganizationEmployeesService
            ) => repackResponse(OrganizationEmployeesService.list(
                $transition$.params().organization_id, {
                role: 'validation'
            }
            ))],
            productCategories: ['permission', 'ProductCategoryService', (
                permission, ProductCategoryService
            ) => repackResponse(ProductCategoryService.listAll())],
            fundStates: ['permission', 'FundService', (
                permission, FundService
            ) => FundService.states()],
            recordTypes: ['permission', 'RecordTypeService', (
                permission, RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
            validatorOrganizations: ['permission', '$transition$', 'OrganizationService', (
                permission, $transition$, OrganizationService
            ) => repackPagination(OrganizationService.readListValidators(
                $transition$.params().organization_id, {
                per_page: 100
            }
            ))],
        }
    });

    $stateProvider.state({
        name: "fund-backoffice-edit",
        url: "/organizations/{organization_id}/funds/{id}/backoffice",
        component: "fundBackofficeEdit",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-edit', 'manage_funds'),
            fund: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.read(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
        }
    });

    if (!appConfigs.hide_voucher_generators) {
        /**
         * Vouchers
         */
        $stateProvider.state({
            name: "vouchers",
            url: "/organizations/{organization_id}/vouchers?fund_id",
            component: "vouchersComponent",
            params: {
                fund_id: null,
            },
            resolve: {
                organization: organziationResolver(),
                permission: permissionMiddleware('vouchers-list', 'manage_vouchers'),
                funds: [
                    'permission', '$transition$', 'FundService',
                    function(permission, $transition$, FundService) {
                        return repackResponse(
                            FundService.list(
                                $transition$.params().organization_id, {
                                per_page: 100
                            }
                            )
                        );
                    }
                ],
                fund: [
                    'funds', '$transition$',
                    function(funds, $transition$) {
                        // $state.params.token
                        let fund_id = $transition$.params().fund_id;

                        return $transition$.params().fund_id ? funds.filter(
                            fund => fund.id == $transition$.params().fund_id
                        )[0] || false : null;
                    }
                ],
            }
        });

        /**
         * Voucher details
         */
        $stateProvider.state({
            name: "vouchers-show",
            url: "/organizations/{organization_id}/vouchers/{voucher_id}",
            component: "vouchersShowComponent",
            resolve: {
                organization: organziationResolver(),
                permission: permissionMiddleware('vouchers-list', 'manage_vouchers'),
                voucher: [
                    'permission', '$transition$', 'VoucherService',
                    function(permission, $transition$, VoucherService) {
                        return repackResponse(
                            VoucherService.show(
                                $transition$.params().organization_id,
                                $transition$.params().voucher_id,
                            )
                        );
                    }
                ],
            }
        });

        /**
         * Vouchers
         */
        $stateProvider.state({
            name: "product-vouchers",
            url: "/organizations/{organization_id}/product-vouchers?fund_id",
            component: "productVouchersComponent",
            params: {
                fund_id: null,
            },
            resolve: {
                organization: organziationResolver(),
                permission: permissionMiddleware('vouchers-list', 'manage_vouchers'),
                funds: [
                    'permission', '$transition$', 'FundService',
                    function(permission, $transition$, FundService) {
                        return repackResponse(
                            FundService.list(
                                $transition$.params().organization_id, {
                                per_page: 100
                            }
                            )
                        );
                    }
                ],
                fund: [
                    'funds', '$transition$',
                    function(funds, $transition$) {
                        // $state.params.token
                        let fund_id = $transition$.params().fund_id;

                        return $transition$.params(), fund_id ? funds.filter(
                            fund => fund.id == $transition$.params().fund_id
                        )[0] || false : null;
                    }
                ],
            }
        });
    }

    /**
     * Implementations
     */
    $stateProvider.state({
        name: "implementations",
        url: "/organizations/{organization_id}/implementations",
        component: "implementationsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('implementation-manage', [
                'manage_implementation', 'manage_implementation_cms'
            ], false),
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id
            ))],
            implementations: ['permission', '$transition$', 'ImplementationService', (
                permission, $transition$, ImplementationService
            ) => repackPagination(ImplementationService.list(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
        }
    });

    /**
     * Implementation view
     */
    $stateProvider.state({
        name: "implementation-view",
        url: "/organizations/{organization_id}/implementation/{id}",
        component: "implementationViewComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('implementation-manage', [
                'manage_implementation', 'manage_implementation_cms'
            ], false),
            implementation: ['permission', '$transition$', '$timeout', '$state', 'ImplementationService', (
                permission, $transition$, $timeout, $state, ImplementationService
            ) => {
                return repackResponse(ImplementationService.read(
                    $transition$.params().organization_id,
                    $transition$.params().id,
                ), (res) => {
                    res.status === 403 && $timeout(() => {
                        $state.go('implementations', {
                            organization_id: $transition$.params().organization_id
                        });
                    }, 100);
                });
            }],
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id, {
                implementation_id: $transition$.params().id
            }
            ))]
        }
    });

    /**
     * Implementation edit (CMS)
     */
    $stateProvider.state({
        name: "implementation-cms",
        url: "/organizations/{organization_id}/implementation/{id}/cms",
        component: "implementationCmsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('implementation-manage', [
                'manage_implementation', 'manage_implementation_cms'
            ], false),
            implementation: ['permission', '$transition$', '$timeout', '$state', 'ImplementationService', (
                permission, $transition$, $timeout, $state, ImplementationService
            ) => {
                return repackResponse(ImplementationService.read(
                    $transition$.params().organization_id,
                    $transition$.params().id,
                ), (res) => {
                    if (res.status === 403) {
                        $timeout(() => {
                            $state.go('implementations', {
                                organization_id: $transition$.params().organization_id
                            });
                        }, 100);
                    }
                });
            }],
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id, {
                implementation_id: $transition$.params().id
            }
            ))]
        }
    });

    /**
     * Implementation edit (email)
     */
    $stateProvider.state({
        name: "implementation-email",
        url: "/organizations/{organization_id}/implementation/{id}/email",
        component: "implementationEmailEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('implementation-manage', 'manage_implementation'),
            implementation: ['permission', '$transition$', '$timeout', '$state', 'ImplementationService', (
                permission, $transition$, $timeout, $state, ImplementationService
            ) => {
                return repackResponse(ImplementationService.read(
                    $transition$.params().organization_id,
                    $transition$.params().id,
                ), (res) => {
                    if (res.status === 403) {
                        $timeout(() => {
                            $state.go('implementations', {
                                organization_id: $transition$.params().organization_id
                            });
                        }, 100);
                    }
                });
            }],
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id, {
                implementation_id: $transition$.params().id
            }
            ))]
        }
    });

    /**
     * Implementation edit (DigiD)
     */
    $stateProvider.state({
        name: "implementation-digid",
        url: "/organizations/{organization_id}/implementation/{id}/digid",
        component: "implementationDigidEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('implementation-manage', 'manage_implementation'),
            implementation: ['permission', '$transition$', '$timeout', '$state', 'ImplementationService', (
                permission, $transition$, $timeout, $state, ImplementationService
            ) => {
                return repackResponse(ImplementationService.read(
                    $transition$.params().organization_id,
                    $transition$.params().id,
                ), (res) => {
                    if (res.status === 403) {
                        $timeout(() => {
                            $state.go('implementations', {
                                organization_id: $transition$.params().organization_id
                            });
                        }, 100);
                    }
                });
            }],
            funds: ['permission', '$transition$', 'FundService', (
                permission, $transition$, FundService
            ) => repackResponse(FundService.list(
                $transition$.params().organization_id, {
                implementation_id: $transition$.params().id
            }
            ))]
        }
    });

    /**
     * Transactions
     */
    $stateProvider.state({
        name: "transactions",
        url: "/organizations/{organization_id}/transactions",
        component: "transactionsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('transactions-list', 'view_finances')
        }
    });

    $stateProvider.state({
        name: "transaction",
        url: "/organizations/{organization_id}/transactions/{address}",
        component: "transactionComponent",
        params: {
            fund_id: null,
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('transactions-show', 'view_finances'),
            transaction: ['$transition$', 'TransactionService', 'appConfigs', (
                $transition$, TransactionService, appConfigs
            ) => repackResponse(TransactionService.show(
                appConfigs.panel_type,
                $transition$.params().organization_id,
                $transition$.params().address
            ))]
        }
    });

    $stateProvider.state({
        name: "products",
        url: "/organizations/{organization_id}/products?source=",
        component: "productsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-list', 'manage_products'),
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.list(
                $transition$.params().organization_id
            ))]
        }
    });

    $stateProvider.state({
        name: "reservations",
        url: "/organizations/{organization_id}/reservations",
        component: "reservationsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('reservations-list', 'scan_vouchers'),
            funds: ['$transition$', 'ProviderFundService', (
                $transition$, ProviderFundService
            ) => repackResponse(ProviderFundService.listFunds($transition$.params().organization_id, {
                per_page: 100,
            }))],
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.list($transition$.params().organization_id, {
                per_page: 100,
            }))]
        }
    });

    $stateProvider.state({
        name: "products-create",
        url: "/organizations/{organization_id}/products/create",
        component: "productsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-create', 'manage_products'),
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.list(
                $transition$.params().organization_id
            ))],
        }
    });

    $stateProvider.state({
        name: "products-edit",
        url: "/organizations/{organization_id}/products/{id}/edit",
        component: "productsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-edit', 'manage_products'),
            product: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.read(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
        }
    });

    $stateProvider.state({
        name: "products-show",
        url: "/organizations/{organization_id}/products/{id}",
        component: "productsShowComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-show', 'manage_products'),
            product: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.read(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
            funds: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.listProductFunds(
                $transition$.params().organization_id,
                $transition$.params().id
            ))],
            chats: ['$transition$', 'ProductChatService', (
                $transition$, ProductChatService
            ) => repackPagination(ProductChatService.list(
                $transition$.params().organization_id,
                $transition$.params().id, {
                per_page: 100
            }
            ))],
        }
    });

    $stateProvider.state({
        name: "provider-funds",
        url: "/organizations/{organization_id}/provider/funds?fundsType",
        component: "providerFundsComponent",
        params: {
            fundsType: {
                squash: true,
                value: null
            },
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('provider-funds-list', 'manage_provider_funds'),
            fundsAvailable: ['$transition$', 'ProviderFundService', (
                $transition$, ProviderFundService
            ) => repackPagination(ProviderFundService.listAvailableFunds($transition$.params().organization_id, {
                per_page: 10
            }))],
            funds: ['$transition$', 'ProviderFundService', (
                $transition$, ProviderFundService
            ) => repackResponse(ProviderFundService.listFunds(
                $transition$.params().organization_id
            ))],
            fundInvitations: ['$transition$', 'FundProviderInvitationsService', (
                $transition$, FundProviderInvitationsService
            ) => repackResponse(FundProviderInvitationsService.listInvitations(
                $transition$.params().organization_id
            ))],
            fundLevel: () => 'fundsAvailable'
        }
    });

    // Validators
    $stateProvider.state({
        name: 'csv-validation',
        url: '/csv-validation/funds/{fund_id}?page&q',
        component: 'csvValidationComponent',
        params: {
            fund_id: {
                squash: true,
                value: null
            },
        },
        resolve: {
            fund: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => $transition$.params().fund_id != null ? repackResponse(
                FundService.readPublic($transition$.params().fund_id)
            ) : new Promise((res) => res(null))],
            funds: ['FundService', (
                FundService
            ) => repackResponse(FundService.list(null, {
                state: 'active_and_closed'
            }))],
            prevalidations: ['$transition$', 'PrevalidationService', (
                $transition$, PrevalidationService
            ) => repackPagination(PrevalidationService.list(objectOnlyKeys($transition$.params(), [
                'page', 'q'
            ])))],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())]
        }
    });

    // Validators
    $stateProvider.state({
        name: 'fund-requests',
        url: '/organizations/{organization_id}/requests',
        component: 'fundRequestsComponent',
        params: {
            organization_id: null,
        },
        resolve: {
            organization: organziationResolver(),
        }
    });

    $stateProvider.state({
        name: 'validation-request',
        url: '/validation-request/{id}',
        component: 'validationRequestComponent',
        resolve: {
            validatorRequest: ['$transition$', 'ValidatorRequestService', (
                $transition$, ValidatorRequestService
            ) => repackResponse(ValidatorRequestService.read(
                $transition$.params().id
            ))]
        }
    });

    $stateProvider.state({
        name: 'preferences-notifications',
        url: '/preferences/notifications',
        component: 'emailPreferencesComponent'
    });

    $stateProvider.state({
        name: 'identity-emails',
        url: '/preferences/emails',
        component: 'identityEmailsComponent'
    });

    $stateProvider.state({
        name: 'security-sessions',
        url: '/security/sessions',
        component: 'securitySessionsComponent'
    });

    $stateProvider.state({
        name: "restore-email",
        url: "/identity-restore?token&target",
        data: {
            token: null
        },
        controller: ['$rootScope', '$state', 'PermissionsService', 'IdentityService', 'CredentialsService', 'ModalService', 'PushNotificationsService', (
            $rootScope, $state, PermissionsService, IdentityService, CredentialsService, ModalService, PushNotificationsService
        ) => {
            IdentityService.authorizeAuthEmailToken(
                $state.params.token
            ).then(function(res) {
                let target = $state.params.target || '';

                CredentialsService.set(res.data.access_token);

                $rootScope.loadAuthUser().then(auth_user => {
                    let organizations = auth_user.organizations.filter(organization =>
                        !organization.business_type_id &&
                        PermissionsService.hasPermission(organization, 'manage_organization')
                    );

                    let onReady = () => {
                        if (typeof target != 'string' || !handleAuthTarget($state, target.split('-'))) {
                            return $state.go('organizations');
                        }
                    };

                    if (organizations.length > 0) {
                        ModalService.open('businessSelect', {
                            organizations: organizations,
                            onReady: () => onReady(),
                        });
                    } else {
                        onReady();
                    }
                });
            }, () => {
                PushNotificationsService.danger(
                    "Helaas, het is niet gelukt om in te loggen. ",
                    "De link is reeds gebruikt of niet meer geldig, probeer het opnieuw met een andere link.",
                    'close', { timeout: 8000 }
                );

                $state.go('home');
            });
        }]
    });

    $stateProvider.state({
        name: "confirmation-email",
        url: "/confirmation/email/{token}?target",
        data: {
            token: null
        },
        controller: ['$rootScope', '$state', 'IdentityService', 'CredentialsService', 'PushNotificationsService', (
            $rootScope, $state, IdentityService, CredentialsService, PushNotificationsService
        ) => {
            let target = $state.params.target || '';

            IdentityService.exchangeConfirmationToken(
                $state.params.token
            ).then(function(res) {
                CredentialsService.set(res.data.access_token);
                $rootScope.loadAuthUser().then(() => {
                    if (typeof target != 'string' || !handleAuthTarget($state, target.split('-'))) {
                        $state.go('home', {
                            confirmed: 1
                        });
                    }
                });
            }, () => {
                PushNotificationsService.danger(res.data.message, "Deze link is reeds gebruikt of ongeldig.", 'close', {
                    timeout: 8000,
                });

                $state.go('home');
            });
        }]
    });

    $stateProvider.state({
        name: "auth-link",
        url: "/auth-link?token",
        data: {
            token: null
        },
        controller: ['$state', '$rootScope', 'IdentityService', 'CredentialsService', 'PushNotificationsService', (
            $state, $rootScope, IdentityService, CredentialsService, PushNotificationsService
        ) => {
            IdentityService.exchangeShortToken($state.params.token).then(res => {
                CredentialsService.set(res.data.access_token);
                $rootScope.loadAuthUser().then(() => $state.go('organizations'));
            }, () => {
                PushNotificationsService.danger(res.data.message, "Deze link is reeds gebruikt of ongeldig.", 'close', {
                    timeout: 8000,
                });

                $state.go('home');
            });
        }]
    });

    $stateProvider.state({
        name: "sign-up",
        url: "/sign-up?fund_id&organization_id&tag&back",
        component: appConfigs.panel_type + "SignUpComponent",
        params: {
            fund_id: {
                squash: true,
                value: null,
            },
            tag: {
                squash: true,
                value: null,
            },
            organization_id: {
                squash: true,
                value: null
            },
            back: {
                squash: true,
                value: null
            },
        },
        resolve: {
            businessTypes: ['BusinessTypeService', (
                BusinessTypeService
            ) => repackResponse(BusinessTypeService.list({
                per_page: 9999
            }))]
        }
    });

    if (['provider'].indexOf(appConfigs.panel_type) != -1) {
        $stateProvider.state({
            name: "provider-invitation-link",
            url: "/provider-invitations/{token}",
            component: 'fundProviderInviteComponent',
            data: {
                token: null
            }
        });
    }

    if (appConfigs.html5ModeEnabled) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        }).hashPrefix('!');
    }
}];