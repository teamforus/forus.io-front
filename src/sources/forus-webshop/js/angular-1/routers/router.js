const repackResponse = (promise) => new Promise((resolve, reject) => {
    promise.then((res) => resolve(
        res.data.data ? res.data.data : res.data
    ), reject);
});

const resolveConfigs = () => {
    return ['ConfigService', 'appConfigs', (ConfigService, appConfigs) => {
        return appConfigs.features || repackResponse(ConfigService.get('webshop'));
    }];
}

const repackPagination = (promise) => new Promise((resolve, reject) => {
    promise.then((res) => resolve(res.data), reject);
});

const promiseResolve = (res) => {
    return new Promise(resolve => resolve(res));
};

const handleAuthTarget = ($state, target) => {
    if (target[0] == 'homeStart') {
        return !!$state.go('home', {
            confirmed: true
        });
    }

    if (target[0] == 'fundRequest') {
        return target[1] ? !!$state.go('fund-request', {
            fund_id: target[1]
        }) : !!$state.go('start', {});
    }

    if (target[0] == 'voucher') {
        return !!$state.go('voucher', {
            address: target[1]
        });
    }

    if (target[0] == 'requestClarification') {
        return target[1] ? !!$state.go('fund-request-clarification', {
            fund_id: target[1],
            request_id: target[2],
            clarification_id: target[3]
        }) : !!$state.go('start', {});
    }

    return false;
};

const resolveCmsPage = (pageSlug) => {
    return {
        configs: resolveConfigs(),
        pages: ['configs', '$q', (configs, $q) => $q((resolve) => resolve(configs.pages || null))],
        page: ['pages', '$state', '$q', (pages, $state, $q) => {
            return $q((resolve) => {
                const page = pages[pageSlug] || false;
                const { external, external_url } = page ? page : {};

                if (!page || (external && !external_url)) {
                    return $state.go('home');
                } else if (external && external_url) {
                    return document.location = external_url;
                }

                resolve(page);
            });
        }]
    };
}

module.exports = ['$stateProvider', '$locationProvider', 'appConfigs', function(
    $stateProvider, $locationProvider, appConfigs
) {
    $stateProvider.state({
        name: "home",
        url: "/?digid_error",
        component: "homeComponent",
        params: {
            confirmed: null,
            digid_error: null
        },
        resolve: {
            funds: ['FundService', (FundService) => repackResponse(FundService.list())],
            products: ['ProductService', (ProductService) => repackPagination(ProductService.sample('budget'))],
            subsidies: ['ProductService', (ProductService) => repackPagination(ProductService.sample('subsidies'))],
        }
    });

    $stateProvider.state({
        name: "sign-up-redirect",
        url: "/aanbieders/inloggen",
        controller: ['ConfigService', (ConfigService) => {
            ConfigService.get().then(res => document.location = res.data.fronts.url_provider)
        }]
    });

    $stateProvider.state({
        name: "sign-up",
        url: "/aanbieders/aanmelden",
        component: "signUpSelectionComponent",
        resolve: resolveCmsPage('provider'),
    });

    $stateProvider.state({
        name: "sign-up-en",
        url: "/sign-up",
        controller: ['$state', ($state) => $state.go('sign-up')],
    });

    $stateProvider.state({
        name: "sign-up-redirect-en",
        url: "/providers/sign-in",
        controller: ['$state', ($state) => $state.go('sign-up-redirect')],
    });

    $stateProvider.state({
        name: "start",
        url: "/start",
        component: "signUpComponent",
        params: {
            confirmed: null,
            digid_error: null,
            email_address: null,
        },
        resolve: {
            funds: ['FundService', (
                FundService
            ) => repackResponse(FundService.list())],
        }
    });

    $stateProvider.state({
        name: "privacy",
        url: "/privacy",
        component: "privacyComponent",
        resolve: resolveCmsPage('privacy'),
    });

    $stateProvider.state({
        name: "accessibility",
        url: "/accessibility",
        component: "accessibilityComponent",
        resolve: resolveCmsPage('accessibility'),
    });

    $stateProvider.state({
        name: "terms_and_conditions",
        url: "/terms-and-conditions",
        component: "termsAndConditionsComponent",
        resolve: resolveCmsPage('terms_and_conditions'),
    });

    $stateProvider.state({
        name: "me-app",
        url: "/me",
        component: "meComponent",
        params: {
            confirmed: null
        }
    });

    $stateProvider.state({
        name: "products",
        url: "/products?{page:int}&{q:string}&{fund_id:int}&{display_type:string}&{product_category_id:int}&{show_menu:bool}&{organization_id:int}",
        component: "productsComponent",
        params: {
            q: {
                dynamic: true,
                value: "",
                squash: true,
            },
            page: {
                dynamic: true,
                value: 1,
                squash: true,
            },
            fund_id: {
                value: null,
                squash: true
            },
            organization_id: {
                value: null,
                squash: true
            },
            product_category_id: {
                value: null,
                squash: true
            },
            display_type: {
                dynamic: true,
                value: 'list',
                squash: true
            },
            fund_type: {
                dynamic: true,
                value: 'budget',
                squash: true
            },
            show_menu: {
                dynamic: true,
                value: false,
                squash: true
            },
        },
        resolve: {
            funds: ['FundService', (
                FundService
            ) => repackResponse(FundService.list())],
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                q: $transition$.params().q,
                page: $transition$.params().page,
                fund_id: $transition$.params().fund_id,
                fund_type: $transition$.params().fund_type,
                organization_id: $transition$.params().organization_id,
                product_category_id: $transition$.params().product_category_id
            }))],
            productCategories: ['ProductCategoryService', (
                ProductCategoryService
            ) => repackResponse(ProductCategoryService.list({
                parent_id: 'null',
                used: 1,
            }))],
            organizations: ['OrganizationService', 'HelperService', (
                OrganizationService, HelperService
            ) => HelperService.recursiveLeacher((page) => {
                return OrganizationService.list({
                    is_employee: 0,
                    has_products: 1,
                    per_page: 100,
                    page: page,
                    fund_type: 'budget'
                });
            }, 4)],
        }
    });

    $stateProvider.state({
        name: "actions",
        url: "/actions?{page:int}&{q:string}&{fund_id:int}&{display_type:string}&{product_category_id:int}&{show_menu:bool}&{organization_id:int}",
        component: "productsComponent",
        params: {
            q: {
                dynamic: true,
                value: "",
                squash: true,
            },
            page: {
                dynamic: true,
                value: 1,
                squash: true,
            },
            fund_id: {
                value: null,
                squash: true
            },
            organization_id: {
                value: null,
                squash: true
            },
            product_category_id: {
                value: null,
                squash: true
            },
            display_type: {
                dynamic: true,
                value: 'list',
                squash: true
            },
            fund_type: {
                dynamic: true,
                value: 'subsidies',
                squash: true
            },
            show_menu: {
                dynamic: true,
                value: false,
                squash: true
            },
        },
        resolve: {
            funds: ['FundService', (
                FundService
            ) => repackResponse(FundService.list())],
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                q: $transition$.params().q,
                page: $transition$.params().page,
                fund_id: $transition$.params().fund_id,
                fund_type: $transition$.params().fund_type,
                organization_id: $transition$.params().organization_id,
                product_category_id: $transition$.params().product_category_id
            }))],
            productCategories: ['ProductCategoryService', (
                ProductCategoryService
            ) => repackResponse(ProductCategoryService.list({
                parent_id: 'null',
                used: 1,
            }))],
            organizations: ['OrganizationService', 'HelperService', (
                OrganizationService, HelperService
            ) => HelperService.recursiveLeacher((page) => {
                return OrganizationService.list({
                    is_employee: 0,
                    has_products: 1,
                    per_page: 100,
                    page: page,
                    fund_type: 'subsidies'
                });
            }, 4)],
        }
    });

    $stateProvider.state({
        name: "products-show",
        url: "/products/{id}",
        component: "productComponent",
        data: {
            id: null
        },
        resolve: {
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : new Promise(resolve => resolve([]))],
            product: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.read(
                $transition$.params().id
            ))],
        }
    });

    $stateProvider.state({
        name: "providers",
        url: "/providers?{page:int}&{q:string}&{fund_id:int}&{business_type_id:int}&{show_map:bool}&{show_menu:bool}",
        component: "providersComponent",
        params: {
            q: {
                dynamic: true,
                value: "",
                squash: true,
            },
            page: {
                dynamic: true,
                value: 1,
                squash: true,
            },
            fund_id: {
                value: null,
                squash: true
            },
            business_type_id: {
                value: null,
                squash: true
            },
            show_map: {
                value: false,
                squash: true
            },
            show_menu: {
                dynamic: true,
                value: false,
                squash: true
            },
        },
        resolve: {
            funds: ['FundService', (
                FundService
            ) => repackResponse(FundService.list())],
            businessTypes: ['BusinessTypeService', (
                BusinessTypeService
            ) => repackResponse(BusinessTypeService.list({
                per_page: 9999,
                used: 1,
            }))],
            providers: ['$transition$', 'ProvidersService', (
                $transition$, ProvidersService
            ) => repackPagination(ProvidersService.search({
                q: $transition$.params().q,
                page: $transition$.params().page,
                fund_id: $transition$.params().fund_id,
                business_type_id: $transition$.params().business_type_id,
            }))]
        }
    });

    $stateProvider.state({
        name: "explanation",
        url: "/explanation",
        component: "explanationComponent",
        resolve: resolveCmsPage('explanation')
    });

    $stateProvider.state({
        name: "provider-office",
        url: "/providers/{provider_id}/offices/{office_id}",
        component: "providerOfficeComponent",
        resolve: {
            provider: ['$transition$', 'ProvidersService', (
                $transition$, ProvidersService
            ) => repackResponse(ProvidersService.read(
                $transition$.params().provider_id
            ))],
            office: ['$transition$', 'OfficeService', (
                $transition$, OfficeService
            ) => repackResponse(OfficeService.read(
                $transition$.params().office_id
            ))],
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                fund_type: 'budget',
                organization_id: $transition$.params().provider_id,
                per_page: 3,
                page: 1,
            }))],
            subsidies: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                fund_type: 'subsidies',
                organization_id: $transition$.params().provider_id,
                per_page: 3,
                page: 1,
            }))],
        }
    });

    $stateProvider.state({
        name: "provider",
        url: "/providers/{provider_id}",
        component: "providerComponent",
        resolve: {
            provider: ['$transition$', 'ProvidersService', (
                $transition$, ProvidersService
            ) => repackResponse(ProvidersService.read(
                $transition$.params().provider_id
            ))],
            products: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                fund_type: 'budget',
                organization_id: $transition$.params().provider_id,
                per_page: 3,
                page: 1,
            }))],
            subsidies: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackPagination(ProductService.list({
                fund_type: 'subsidies',
                organization_id: $transition$.params().provider_id,
                per_page: 3,
                page: 1,
            }))],
        }
    });

    $stateProvider.state({
        name: "products-apply",
        url: "/products/{id}/apply",
        component: "productApplyComponent",
        data: {
            id: null
        },
        resolve: {
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : new Promise(resolve => resolve([]))],
            product: ['$transition$', 'ProductService', (
                $transition$, ProductService
            ) => repackResponse(ProductService.read(
                $transition$.params().id
            ))],
        }
    });

    $stateProvider.state({
        name: "vouchers",
        url: "/vouchers",
        component: "vouchersComponent",
        resolve: {
            vouchers: ['VoucherService', (
                VoucherService
            ) => repackResponse(VoucherService.list())],
        }
    });

    $stateProvider.state({
        name: 'voucher',
        url: '/voucher/{address}',
        component: 'voucherComponent',
        data: { address: null },
        resolve: {
            voucher: ['$transition$', 'VoucherService', (
                $transition$, VoucherService
            ) => repackResponse(VoucherService.get(
                $transition$.params().address
            ))],
            loadProducts: ['voucher', (voucher) => !voucher.product && voucher.fund.type == 'budget'],
            loadSubsidies: ['voucher', (voucher) => voucher.fund.type == 'subsidies'],
            products: ['voucher', 'loadProducts', 'ProductService', (
                voucher, loadProducts, ProductService
            ) => loadProducts ? repackPagination(ProductService.list({
                fund_type: 'budget',
                sample: 1,
                per_page: 6,
                fund_id: voucher.fund_id,
            })) : null],
            subsidies: ['voucher', 'loadSubsidies', 'ProductService', (
                voucher, loadSubsidies, ProductService
            ) => loadSubsidies ? repackPagination(ProductService.list({
                fund_type: 'subsidies',
                sample: 1,
                per_page: 6,
                fund_id: voucher.fund_id,
            })) : null],
        }
    });

    $stateProvider.state({
        name: 'records',
        url: '/records',
        component: 'recordsComponent',
        resolve: {
            records: ['RecordService', (
                RecordService
            ) => repackResponse(RecordService.list())],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
        }
    });

    $stateProvider.state({
        name: 'record-validate',
        url: '/records/{id}/validate',
        component: 'recordValidateComponent',
        data: {
            id: null
        },
        resolve: {
            record: ['$transition$', 'RecordService', (
                $transition$, RecordService
            ) => repackResponse(RecordService.read($transition$.params().id))],
            records: ['RecordService', (
                RecordService
            ) => repackResponse(RecordService.list())],
            validators: ['ValidatorService', (
                ValidatorService
            ) => repackResponse(ValidatorService.list())],
            validationRequests: ['ValidatorRequestService', (
                ValidatorRequestService
            ) => repackResponse(ValidatorRequestService.list())],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
        }
    });

    $stateProvider.state({
        name: 'record-validations',
        url: '/records/{id}/validations',
        component: 'recordValidationsComponent',
        data: {
            id: null
        },
        resolve: {
            record: ['$transition$', 'RecordService', (
                $transition$, RecordService
            ) => repackResponse(RecordService.read($transition$.params().id))],
            records: ['RecordService', (
                RecordService
            ) => repackResponse(RecordService.list())],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
        }
    });

    $stateProvider.state({
        name: 'record-create',
        url: '/records/create',
        component: 'recordCreateComponent',
        data: {},
        resolve: {
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
        }
    });

    $stateProvider.state({
        name: "funds",
        url: "/funds?{page:int}&{q:string}&{display_type:string}&{organization_id:int}&{show_menu:bool}",
        component: "fundsComponent",
        params: {
            q: {
                dynamic: true,
                value: "",
                squash: true,
            },
            page: {
                dynamic: true,
                value: 1,
                squash: true,
            },
            organization_id: {
                value: null,
                squash: true
            },
            display_type: {
                dynamic: true,
                value: 'list',
                squash: true
            },
            show_menu: {
                dynamic: true,
                value: false,
                squash: true
            },
        },
        resolve: {
            funds: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => repackPagination(FundService.list(null, {
                q: $transition$.params().q,
                page: $transition$.params().page,
                organization_id: $transition$.params().organization_id,
                per_page: 10,
            }))],
            records: ['AuthService', 'RecordService', (
                AuthService, RecordService
            ) => AuthService.hasCredentials() ? repackResponse(
                RecordService.list()
            ) : promiseResolve(null)],
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : promiseResolve([])],
            organizations: ['OrganizationService', (
                OrganizationService
            ) => repackResponse(OrganizationService.list({
                implementation: 1,
                is_employee: 0
            }))],
        }
    });

    $stateProvider.state({
        name: "fund",
        url: "/funds/{id}",
        component: "fundComponent",
        data: { id: null },
        resolve: {
            configs: resolveConfigs(),
            fund: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => repackResponse(FundService.readById(
                $transition$.params().id
            ))],
            loadProducts: ['fund', (fund) => fund.type == 'budget'],
            loadSubsidies: ['fund', (fund) => fund.type == 'subsidies'],
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : new Promise(resolve => resolve([]))],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
            products: ['$transition$','loadProducts', 'ProductService', (
                $transition$, loadProducts, ProductService
            ) => loadProducts ? repackPagination(ProductService.list({
                fund_type: 'budget',
                sample: 1,
                per_page: 6,
                fund_id: $transition$.params().id,
            })) : null],
            subsidies: ['$transition$','loadSubsidies', 'ProductService', (
                $transition$, loadSubsidies, ProductService
            ) => loadSubsidies ? repackPagination(ProductService.list({
                fund_type: 'subsidies',
                sample: 1,
                per_page: 6,
                fund_id: $transition$.params().id,
            })) : null],
        }
    });

    // Activate fund
    $stateProvider.state({
        name: "fund-activate",
        url: "/funds/{fund_id}/activate?digid_success&digid_error",
        component: "fundActivateComponent",
        data: {
            fund_id: null,
            digid_success: false,
            digid_error: false,
        },
        resolve: {
            identity: ['AuthService', (
                AuthService
            ) => AuthService.hasCredentials() ? repackResponse(AuthService.identity()) : null],
            fund: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => repackResponse(FundService.readById($transition$.params().fund_id))],
            fundRequests: ['$transition$', 'FundRequestService', 'AuthService', (
                $transition$, FundRequestService, AuthService
            ) => AuthService.hasCredentials() ? repackPagination(
                FundRequestService.index($transition$.params().fund_id)
            ) : null],
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : []],
        }
    });

    // Apply to fund by submitting fund request
    $stateProvider.state({
        name: "fund-request",
        url: "/fund/{fund_id}/request?digid_success&digid_error",
        component: "fundRequestComponent",
        data: {
            fund_id: null,
            digid_success: false,
            digid_error: false,
        },
        resolve: {
            identity: ['AuthService', (
                AuthService
            ) => AuthService.hasCredentials() ? repackResponse(AuthService.identity()) : null],
            fund: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => repackResponse(FundService.readById(
                $transition$.params().fund_id
            ))],
            fundRequests: ['$transition$', 'FundRequestService', 'AuthService', (
                $transition$, FundRequestService, AuthService
            ) => AuthService.hasCredentials() ? repackPagination(
                FundRequestService.index($transition$.params().fund_id)
            ) : new Promise((resolve) => resolve(null))],
            recordTypes: ['RecordTypeService', (
                RecordTypeService
            ) => repackResponse(RecordTypeService.list())],
            vouchers: ['AuthService', 'VoucherService', (
                AuthService, VoucherService
            ) => AuthService.hasCredentials() ? repackResponse(
                VoucherService.list()
            ) : []],
            records: ['AuthService', 'RecordService', (
                AuthService, RecordService
            ) => AuthService.hasCredentials() ? repackResponse(
                RecordService.list()
            ) : promiseResolve(null)],
        }
    });

    // Apply to fund by submitting fund request
    $stateProvider.state({
        name: "fund-request-clarification",
        url: "/funds/{fund_id}/requests/{request_id}/clarifications/{clarification_id}",
        component: "fundRequestClarificationComponent",
        data: {
            fund_id: null,
            request_id: null,
            clarification_id: null,
        },
        resolve: {
            fund: ['$transition$', 'FundService', (
                $transition$, FundService
            ) => repackResponse(FundService.readById(
                $transition$.params().fund_id
            ))],
            clarification: ['$transition$', 'FundRequestClarificationService', 'AuthService', (
                $transition$, FundRequestClarificationService, AuthService
            ) => AuthService.hasCredentials() ? repackResponse(FundRequestClarificationService.read(
                $transition$.params().fund_id,
                $transition$.params().request_id,
                $transition$.params().clarification_id
            )) : promiseResolve(null)],
        }
    });

    $stateProvider.state({
        name: "restore-email",
        url: "/identity-restore?token&target",
        controller: ['$rootScope', '$state', 'IdentityService', 'CredentialsService', 'ModalService', 'AuthService', 'appConfigs', (
            $rootScope, $state, IdentityService, CredentialsService, ModalService, AuthService, appConfigs
        ) => {
            let target = $state.params.target || '';

            IdentityService.authorizeAuthEmailToken(
                $state.params.token
            ).then(function(res) {
                CredentialsService.set(res.data.access_token);
                $rootScope.loadAuthUser();

                if (typeof target == 'string') {
                    if (!handleAuthTarget($state, target.split('-'))) {
                        $state.go('vouchers');
                    }
                }
            }, () => {
                $state.go('home');

                if (!AuthService.hasCredentials()) {
                    ModalService.open('identityProxyExpired', {});
                }
            });
        }],
        data: {
            token: null
        }
    });

    $stateProvider.state({
        name: "confirmation-email",
        url: "/confirmation/email/{token}?target",
        data: {
            token: null
        },
        controller: ['$rootScope', '$state', 'IdentityService', 'CredentialsService', (
            $rootScope, $state, IdentityService, CredentialsService
        ) => {
            let target = $state.params.target || '';

            IdentityService.exchangeConfirmationToken(
                $state.params.token
            ).then(function(res) {
                CredentialsService.set(res.data.access_token);
                $rootScope.loadAuthUser();

                if (typeof target == 'string') {
                    if (!handleAuthTarget($state, target.split('-'))) {
                        $state.go('home', {
                            confirmed: 1
                        });
                    }
                }
            }, () => {
                alert("Deze link is reeds gebruikt of ongeldig.");
                $state.go('home');
            });
        }]
    });

    $stateProvider.state({
        name: 'notifications',
        url: '/notifications?{page:int}',
        component: 'notificationsComponent',
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
        name: 'error',
        url: '/error/{errorCode}',
        component: 'errorComponent',
        data: {
            errorCode: 'unknown_error',
        }
    });

    $stateProvider.state({
        name: "auth-link",
        url: "/auth-link?token&target",
        data: {
            token: null
        },
        controller: ['$state', '$rootScope', 'IdentityService', 'CredentialsService', 'PushNotificationsService', (
            $state, $rootScope, IdentityService, CredentialsService, PushNotificationsService
        ) => {
            let target = $state.params.target || '';

            IdentityService.exchangeShortToken($state.params.token).then(res => {
                CredentialsService.set(res.data.access_token);

                $rootScope.loadAuthUser().then(() => {
                    if (typeof target == 'string') {
                        if (!handleAuthTarget($state, target.split('-'))) {
                            $state.go('home');
                        }
                    }
                });
            }, () => {
                PushNotificationsService.danger("Deze link is reeds gebruikt of ongeldig.");
                $state.go('home');
            });
        }]
    });

    $stateProvider.state({
        name: 'error-404',
        url: '/*params',
        component: 'errorPageComponent',
        resolve: {
            error: () => 404,
        }
    });

    if (appConfigs.html5ModeEnabled) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        }).hashPrefix('!');
    }
}];