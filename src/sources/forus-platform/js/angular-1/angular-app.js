require('./modules/select-control/SelectControlModule');
require('./modules/page-loading-bar/PageLoadingBarModule');
require('../../../forus-webshop/js/angular-1/modules/ui-controls/UIControlsModule');

let app = angular.module('forusApp', [
    'ui.router', 'pascalprecht.translate', 'ngCookies', 'uiCropper',
    'ngLocale', '720kb.datepicker', 'forus.selectControl', 'ngSanitize',
    'forus.uiControls', 'forus.pageLoadingBarModule',
]);

app.constant('appConfigs', env_data);

// Controllers
app.controller('BaseController', require('./controllers/BaseController'));

// Components
app.component('homeComponent', require('./components/HomeComponent'));
app.component('organizationsEditComponent', require('./components/OrganizationsEditComponent'));
app.component('organizationFundsComponent', require('./components/OrganizationFundsComponent'));
app.component('providerFundsComponent', require('./components/ProviderFundsComponent'));
app.component('fundsEditComponent', require('./components/FundsEditComponent'));
app.component('fundsShowComponent', require('./components/FundsShowComponent'));
app.component('fundBackofficeEdit', require('./components/FundBackofficeEditComponent'));
app.component('transactionsComponent', require('./components/TransactionsComponent'));
app.component('reservationsComponent', require('./components/ReservationsComponent'));
app.component('vouchersComponent', require('./components/VouchersComponent'));
app.component('vouchersShowComponent', require('./components/VouchersShowComponent'));
app.component('productVouchersComponent', require('./components/ProductVouchersComponent'));
app.component('officesComponent', require('./components/OfficesComponent'));
app.component('officesEditComponent', require('./components/OfficesEditComponent'));
app.component('productsComponent', require('./components/ProductsComponent'));
app.component('productsEditComponent', require('./components/ProductsEditComponent'));
app.component('productsShowComponent', require('./components/ProductsShowComponent'));
app.component('sponsorProviderOrganizationsComponent', require('./components/SponsorProviderOrganizationsComponent'));
app.component('sponsorProviderOrganizationComponent', require('./components/SponsorProviderOrganizationComponent'));
app.component('organizationEmployeesComponent', require('./components/OrganizationEmployeesComponent'));
app.component('csvValidationComponent', require('./components/CsvValidationComponent'));
app.component('fundRequestsComponent', require('./components/FundRequestsComponent'));
app.component('validationRequestComponent', require('./components/ValidationRequestComponent'));
app.component('providerSignUpComponent', require('./components/ProviderSignUpComponent'));
app.component('sponsorSignUpComponent', require('./components/SponsorSignUpComponent'));
app.component('validatorSignUpComponent', require('./components/ValidatorSignUpComponent'));
app.component('financialDashboardComponent', require('./components/FinancialDashboardComponent'));
app.component('financialDashboardOverviewComponent', require('./components/FinancialDashboardOverviewComponent'));
app.component('transactionComponent', require('./components/TransactionComponent'));
app.component('fundProviderComponent', require('./components/FundProviderComponent'));
app.component('fundProviderProductComponent', require('./components/FundProviderProductComponent'));
app.component('fundProviderProductSubsidyEditComponent', require('./components/FundProviderProductSubsidyEditComponent'));
app.component('noPermissionComponent', require('./components/NoPermissionComponent'));
app.component('emailPreferencesComponent', require('./components/EmailPreferencesComponent'));
app.component('securitySessionsComponent', require('./components/SecuritySessionsComponent'));
app.component('fundProviderInviteComponent', require('./components/FundProviderInviteComponent'));
app.component('identityEmailsComponent', require('./components/IdentityEmailsComponent'));
app.component('externalValidatorsComponent', require('./components/ExternalValidatorsComponent'));
app.component('externalFundsComponent', require('./components/ExternalFundsComponent'));
app.component('organizationNotificationsComponent', require('./components/OrganizationNotificationsComponent'));
app.component('implementationsComponent', require('./components/ImplementationsComponent'));
app.component('implementationViewComponent', require('./components/ImplementationViewComponent'));
app.component('implementationCmsEditComponent', require('./components/ImplementationCmsEditComponent'));
app.component('implementationEmailEditComponent', require('./components/ImplementationEmailEditComponent'));
app.component('implementationDigidEditComponent', require('./components/ImplementationDigidEditComponent'));
app.component('providerOverviewComponent', require('./components/ProviderOverviewComponent'));

// Modal Components
app.component('modalAuthComponent', require('./components/Modals/ModalAuthComponent'));
app.component('modalPinCodeComponent', require('./components/Modals/ModalPinCodeComponent'));
app.component('modalFundTopUpComponent', require('./components/Modals/ModalFundTopUpComponent'));
app.component('modalEmployeeEditComponent', require('./components/Modals/ModalEmployeeEditComponent'));
app.component('modalNotificationComponent', require('./components/Modals/ModalNotificationComponent'));
app.component('modalPhotoUploaderComponent', require('./components/Modals/ModalPhotoUploaderComponent'));
app.component('modalVoucherCreateComponent', require('./components/Modals/ModalVoucherCreateComponent'));
app.component('modalReservationCreateComponent', require('./components/Modals/ModalReservationCreateComponent'));
app.component('modalReservationUploadComponent', require('./components/Modals/ModalReservationUploadComponent'));
app.component('modalProductVoucherCreateComponent', require('./components/Modals/ModalProductVoucherCreateComponent'));
app.component('modalVoucherQrCodeComponent', require('./components/Modals/ModalVoucherQrCodeComponent'));
app.component('modalVouchersUploadComponent', require('./components/Modals/ModalVouchersUploadComponent'));
app.component('modalMarkdownCustomLinkComponent', require('./components/Modals/ModalMarkdownCustomLinkComponent'));
app.component('modalPdfPreviewComponent', require('./components/Modals/FilePreviews/ModalPdfPreviewComponent'));
app.component('modalImagePreviewComponent', require('./components/Modals/FilePreviews/ModalImagePreviewComponent'));
app.component('modalFundRequestRecordClarifyComponent', require('./components/Modals/FundRequests/ModalFundRequestRecordClarifyComponent'));
app.component('modalFundRequestRecordDeclineComponent', require('./components/Modals/FundRequests/ModalFundRequestRecordDeclineComponent'));
app.component('modalFundRequestRecordsDeclineComponent', require('./components/Modals/FundRequests/ModalFundRequestRecordsDeclineComponent'));
app.component('modalFundCriteriaDescriptionEditComponent', require('./components/Modals/ModalFundCriteriaDescriptionEditComponent'));
app.component('modalFundInviteProvidersComponent', require('./components/Modals/ModalFundInviteProvidersComponent'));
app.component('modalEmployeeAddConfirmationComponent', require('./components/Modals/ModalEmployeeAddConfirmationComponent'));
app.component('modalFundOffersComponent', require('./components/Modals/ModalFundOffersComponent'));
app.component('modalBusinessSelectComponent', require('./components/Modals/ModalBusinessSelectComponent'));
app.component('modalCreatePrevalidationComponent', require('./components/Modals/ModalCreatePrevalidationComponent'));
app.component('modalVoucherExportTypeComponent', require('./components/Modals/ModalVoucherExportTypeComponent'));
app.component('modalDangerZoneComponent', require('./components/Modals/ModalDangerZoneComponent'));
app.component('modalFundProviderChatSponsorComponent', require('./components/Modals/ModalFundProviderChatSponsorComponent'));
app.component('modalFundProviderChatProviderComponent', require('./components/Modals/ModalFundProviderChatProviderComponent'));
app.component('modalFundProviderChatMessageComponent', require('./components/Modals/ModalFundProviderChatMessageComponent'));
app.component('modalDuplicatesPickerComponent', require('./components/Modals/ModalDuplicatesPickerComponent'));
app.component('modalFundAppendRequestRecordComponent', require('./components/Modals/ModalFundAppendRequestRecordComponent'));
app.component('modalPhysicalCardComponent', require('./components/Modals/ModalPhysicalCardComponent'));
app.component('modalExportTypeComponent', require('./components/Modals/ModalExportTypeComponent'));
app.component('modalTransferOrganizationOwnershipComponent', require('./components/Modals/ModalTransferOrganizationOwnershipComponent'));

// Modal Components
app.component('printableVoucherQrCodeComponent', require('./components/Printables/PrintableVoucherQrCodeComponent'));

// Services
app.service('AuthService', require('./services/AuthService'));
app.service('DateService', require('./services/DateService'));
app.service('OrganizationService', require('./services/OrganizationService'));
app.service('TransactionService', require('./services/TransactionService'));
app.service('VoucherService', require('./services/VoucherService'));
app.service('FundService', require('./services/FundService'));
app.service('CredentialsService', require('./services/CredentialsService'));
app.service('FormBuilderService', require('./services/FormBuilderService'));
app.service('IdentityService', require('./services/IdentityService'));
app.service('RecordService', require('./services/RecordService'));
app.service('RecordTypeService', require('./services/RecordTypeService'));
app.service('RecordCategoryService', require('./services/RecordCategoryService'));
app.service('RecordValidationService', require('./services/RecordValidationService'));
app.service('ProductCategoryService', require('./services/ProductCategoryService'));
app.service('BusinessTypeService', require('./services/BusinessTypeService'));
app.service('OfficeService', require('./services/OfficeService'));
app.service('ProductService', require('./services/ProductService'));
app.service('ProviderFundService', require('./services/ProviderFundService'));
app.service('OrganizationEmployeesService', require('./services/OrganizationEmployeesService'));
app.service('PrevalidationService', require('./services/PrevalidationService'));
app.service('ProgressFakerService', require('./services/ProgressFakerService'));
app.service('ValidatorRequestService', require('./services/ValidatorRequestService'));
app.service('MediaService', require('./services/MediaService'));
app.service('ProviderIdentityService', require('./services/ProviderIdentityService'));
app.service('ConfigService', require('./services/ConfigService'));
app.service('ImageConvertorService', require('./services/ImageConvertorService'));
app.service('ModalService', require('./services/ModalService'));
app.service('PrintableService', require('./services/PrintableService'));
app.service('PermissionsService', require('./services/PermissionsService'));
app.service('RoleService', require('./services/RoleService'));
app.service('ShareService', require('./services/ShareService'));
app.service('FileService', require('./services/FileService'));
app.service('FundRequestValidatorService', require('./services/FundRequestValidatorService'));
app.service('FundProviderInvitationsService', require('./services/FundProviderInvitationsService'));
app.service('EmailPreferencesService', require('./services/EmailPreferencesService'));
app.service('PushNotificationsService', require('./services/PushNotificationsService'));
app.service('DigIdService', require('./services/DigIdService'));
app.service('SessionService', require('./services/SessionService'));
app.service('DemoTransactionService', require('./services/DemoTransactionService'));
app.service('GoogleMapService', require('./services/GoogleMapService'));
app.service('SignUpService', require('./services/SignUpService'));
app.service('IdentityEmailsService', require('./services/IdentityEmailsService'));
app.service('ProductChatService', require('./services/ProductChatService'));
app.service('FundProviderChatService', require('./services/FundProviderChatService'));
app.service('NotificationsService', require('./services/NotificationsService'));
app.service('ImplementationService', require('./services/ImplementationService'));
app.service('HelperService', require('./services/HelperService'));
app.service('PhysicalCardsService', require('./services/PhysicalCardsService'));
app.service('ProductReservationService', require('./services/ProductReservationService'));

// Directives
app.directive('menu', {
    sponsor: require('./directives/MenuSponsorDirective'),
    provider: require('./directives/MenuProviderDirective'),
    validator: require('./directives/MenuValidatorDirective'),
} [env_data.panel_type]);

app.directive('appFooter', require('./directives/AppFooterDirective'));
app.directive('dashboardSwitcher', require('./directives/DashboardSwitcherDirective'));
app.directive('fundSelector', require('./directives/FundSelectorDirective'));
app.directive('fundCardSponsor', require('./directives/FundCardSponsorDirective'));
app.directive('fundCardProvider', require('./directives/FundCardProviderDirective'));
app.directive('fundCardAvailableProvider', require('./directives/FundCardAvailableProviderDirective'));
app.directive('fundCardProviderCanJoin', require('./directives/FundCardProviderCanJoinDirective'));
app.directive('productCard', require('./directives/ProductCardDirective'));
app.directive('multiSelect', require('./directives/MultiSelectDirective'));
app.directive('scheduleControl', require('./directives/ScheduleControlDirective.js'));
app.directive('csvUpload', require('./directives/CsvUploadDirective'));
app.directive('progressBar', require('./directives/ProgressBarDirective'));
app.directive('prevalidatedTable', require('./directives/PrevalidatedTableDirective'));
app.directive('photoSelector', require('./directives/PhotoSelectorDirective'));
app.directive('radialChart', require('./directives/RadialChartDirective'));
app.directive('barChart', require('./directives/BarChartDirective'));
app.directive('collapse', require('./directives/CollpaseDirective'));
app.directive('landingNavbar', require('./directives/landing/NavbarDirective'));
app.directive('landingContactForm', require('./directives/landing/ContactFormDirective'));
app.directive('landingAuth', require('./directives/landing/AuthDirective'));
app.directive('forusChat', require('./directives/ForusChatDirective'));
app.directive('forusSupport', require('./directives/ForusSupportDirective'));
app.directive('pincodeControl', require('./directives/PincodeControlDirective'));
app.directive('productCategoriesControl', require('./directives/ProductCategoriesControlDirective'));
app.directive('officeEditInline', require('./directives/OfficeEditInlineDirective'));
app.directive('tooltip', require('./directives/TooltipDirective'));
app.directive('informationBlock', require('./directives/InformationBlockDirective'));
app.directive('menuScrollToggle', require('./directives/landing/MenuScrollToggleDirective'));
app.directive('phoneControl', require('./directives/PhoneControlDirective'));
app.directive('i18n', require('./directives/I18nDirective'));
app.directive('preventPropagation', require('./directives/PreventPropagation'));
app.directive('markdown', require('./directives/MarkdownDirective'));
app.directive('inputCheckboxControl', require('./directives/InputCheckboxControlDirective'));
app.directive('formLabelToggle', require('./directives/FormLabelToggleDirective'));
app.directive('clickOutside', require('./directives/ClickOutsideDirective'));
app.directive('scrollEnd', require('./directives/ScrollEndDirective'));
app.directive('qrCode', require('./directives/QrCodeDirective'));
app.directive('pdfPreview', require('./directives/file_preview/PdfPreviewDirective'));
app.directive('pushNotifications', require('./directives/PushNotificationsDirective'));
app.directive('fundCardInvitationProvider', require('./directives/FundCardInvitationProviderDirective'));
app.directive('googleMap', require('./directives/GoogleMapDirective'));
app.directive('fundCriteriaEditor', require('./directives/FundCriteriaEditorDirective'));
app.directive('fundCriteriaEditorItem', require('./directives/FundCriteriaEditorItemDirective'));
app.directive('headerNotifications', require('./directives/HeaderNotificationsDirective'));
app.directive('providerFundFilters', require('./directives/ProviderFundFiltersDirective'));

app.directive('signUpOfficeEdit', require('./directives/sign_up/SignUpOfficeEditDirective'));

app.directive('paginator', require('./directives/paginators/PaginatorDirective'));
app.directive('paginatorLoader', require('./directives/paginators/PaginatorLoaderDirective'));

app.directive('appLinks', require('./directives/elements/AppLinksDirective'));

// Modals
app.directive('modalsRoot', require('./directives/modals/ModalsRootDirective'));
app.directive('modalItem', require('./directives/modals/ModalItemDirective'));
app.directive('modalScrollBraker', require('./directives/modals/ModalScrollBrakerDirective'));

// Printable
app.directive('printablesRoot', require('./directives/printables/PrintableRootDirective'));
app.directive('printableItem', require('./directives/printables/PrintableItemDirective'));
app.directive('printableEnabler', require('./directives/printables/PrintableEnablerDirective'));

app.directive('blockEmpty', require('./directives/blocks/BlockEmptyDirective'));
app.directive('blockNoPermission', require('./directives/blocks/BlockNoPermissionDirective'));
app.directive('blockProviderOrganizationOffices', require('./directives/blocks/sponsor/BlockProviderOrganizationOfficesDirective'));
app.directive('blockProviderOrganizationEmployees', require('./directives/blocks/sponsor/BlockProviderOrganizationEmployeesDirective'));
app.directive('blockProviderOrganizationOverview', require('./directives/blocks/sponsor/BlockProviderOrganizationOverviewDirective'));

// Providers
app.provider('PrintableRoute', require('./providers/PrintableRouteProvider'));
app.provider('ApiRequest', require('./providers/ApiRequestProvider'));
app.provider('ModalRoute', require('./providers/ModalRouteProvider'));
app.provider('I18nLib', require('./providers/I18nLibProvider'));

// Filters
app.filter('currency_format', require('./filters/CurrencyFormatFilter'));
app.filter('pretty_json', require('./filters/PrettyJsonFilter'));
app.filter('json_pretty', require('./filters/PrettyJsonFilter'));
app.filter('to_fixed', require('./filters/ToFixedFilter'));
app.filter('file_size', require('./filters/FileSizeFilter'));
app.filter('hasPerm', require('./filters/HasPerm'));
app.filter('i18n', require('./filters/I18nFilter'));
app.filter('str_limit', require('./filters/StrLimitFilter'));
app.filter('duration', require('./filters/DurationFilter'));
app.filter('duration_last_time', require('./filters/DurationLastTimeFilter'));
app.filter('lines_to_array', require('./filters/LinesToArrayFilter'));
app.filter('phone_number_format', require('./filters/PhoneNumberFormatFilter'));

// Config
app.config(require('./routers/printables'));
app.config(require('./routers/modals'));
app.config(require('./routers/router'));
app.config(require('./config/api-service'));
app.config(require('./config/i18n'));
app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
}]);

app.run(require('./routers/router-transitions'));
app.run(require('./routers/modals-transitions'));

app.run(['appConfigs', (appConfigs) => {
    appConfigs.flags = Object.assign(
        require('./config/flags.js'),
        env_data.flags || {}
    );
}]);

// Bootstrap the app
angular.bootstrap(document.querySelector('html'), ['forusApp']);

if (!env_data.html5ModeEnabled) {
    let hash = document.location.hash;

    if (hash.length > 3 && hash[hash.length - 1] == '/') {
        document.location.hash = hash.slice(0, hash.length - 1);
    } else if (hash.length < 3) {
        document.location.hash = '#!/';
    }
}

module.exports = app;