const sprintf = require('sprintf-js').sprintf;

const FundService = function(ApiRequest, ModalService) {
    let uriPrefix = '/platform/organizations/';

    return new (function() {
        this.list = function(organization_id, query = {}) {
            if (!organization_id) {
                return this.listPublic(query);
            }

            return ApiRequest.get(sprintf(uriPrefix + '%s/funds', organization_id), query);
        };

        this.listPublic = function(query = {}) {
            return ApiRequest.get(sprintf('/platform/funds'), query);
        };

        this.store = function(organization_id, data) {
            return ApiRequest.post(
                sprintf(uriPrefix + '%s/funds', organization_id),
                this.apiFormToResource(data)
            );
        };

        this.update = function(organization_id, fund_id, data) {
            return ApiRequest.patch(sprintf(
                uriPrefix + '%s/funds/%s',
                organization_id,
                fund_id
            ), this.apiFormToResource(data));
        };

        this.updateCriteria = function(organization_id, id, criteria) {
            return ApiRequest.patch(uriPrefix + organization_id + '/funds/' + id + '/criteria', {
                criteria: criteria
            });
        };

        this.read = function(organization_id, fund_id, query = {}) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s',
                organization_id,
                fund_id
            ), query);
        };

        this.readPublic = function(fund_id, query = {}) {
            return ApiRequest.get(sprintf('/platform/funds/%s', fund_id), query);
        };

        this.readFinances = function(organization_id, query = {}) {
            return ApiRequest.get(uriPrefix + `${organization_id}/sponsor/finances`, query);
        };

        this.listProviders = function(organization_id, fund_id, state, query = {}) {
            query.state = state;

            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers',
                organization_id,
                fund_id
            ), query);
        };

        this.readProvider = function(organization_id, fund_id, provider_id, query) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s',
                organization_id,
                fund_id,
                provider_id
            ), query);
        };

        this.listProviderProducts = function(organization_id, fund_id, provider_id, query = {}) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/products',
                organization_id,
                fund_id,
                provider_id
            ), query);
        };

        this.getProviderProduct = function(organization_id, fund_id, provider_id, product_id, query = {}) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/products/%s',
                organization_id,
                fund_id,
                provider_id,
                product_id,
            ), query);
        };

        this.readProviderChats = function(organization_id, fund_id, provider_id, query = {}) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/products',
                organization_id,
                fund_id,
                provider_id
            ), query);
        };

        /**
         * TODO: check for cleanup
         * Get provider transactions list
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {object} query 
         * @returns {Promise}
         */
        this.readProvidersTransactions = function(
            organization_id,
            fund_id,
            provider_id,
            query = {}
        ) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/transactions',
                organization_id,
                fund_id,
                provider_id
            ), query);
        };

        /**
         * TODO: check for cleanup
         * Get provider transaction
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {number} transaction_id 
         * @param {object} query 
         * @returns {Promise}
         */
        this.readProvidersTransaction = function(
            organization_id,
            fund_id,
            provider_id,
            transaction_id,
            query = {}
        ) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/transactions/%s',
                organization_id,
                fund_id,
                provider_id,
                transaction_id
            ), query);
        };

        /**
         * TODO: check for cleanup
         * Export provider transactions list
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {object} query 
         * @returns {Promise}
         */
        this.exportProvidersTransactions = function(
            organization_id,
            fund_id,
            provider_id,
            query = {}
        ) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/transactions/export',
                organization_id,
                fund_id,
                provider_id
            ), query, {}, true, (_cfg) => {
                _cfg.responseType = 'arraybuffer';
                _cfg.cache = false;

                return _cfg;
            });
        };

        /**
         * Export funds data
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {object} query 
         * @returns {Promise}
         */
        this.financialOverview = function(organization_id, query = {}) 
        {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/sponsor/finances-overview', 
                organization_id
            ), query);
        };

        /**
         * Export funds data
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {object} query 
         * @returns {Promise}
         */
         this.financialOverviewExport = function(
            organization_id,
            query = {}
        ) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/sponsor/finances-overview-export', 
                organization_id
            ), query, {}, true, (_cfg) => {
                _cfg.responseType = 'arraybuffer';
                _cfg.cache = false;

                return _cfg;
            });
        };

        /**
         * Get provider finances overview
         * 
         * @param {number} organization_id 
         * @param {number} fund_id 
         * @param {number} provider_id 
         * @param {object} query 
         * @returns {Promise}
         */
        this.readProvidersFinances = function(
            organization_id,
            fund_id,
            provider_id,
            query = {}
        ) {
            return ApiRequest.get(sprintf(
                uriPrefix + '%s/funds/%s/providers/%s/finances',
                organization_id,
                fund_id,
                provider_id
            ), query);
        };

        this.dismissProvider = function(organization_id, fund_id, id) {
            return this.updateProvider(organization_id, fund_id, id, {
                dismissed: true,
                allow_budget: false,
                allow_products: false,
                allow_some_products: false,
            });
        };

        this.updateProvider = function(organization_id, fund_id, id, data = {}) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + id, data);
        };

        this.states = function() {
            return [{
                name: "Waiting",
                value: 'waiting',
            }, {
                name: "Actief",
                value: 'active',
            }, {
                name: "Gepauzeerd",
                value: 'paused',
            }, {
                name: "Gesloten",
                value: 'closed',
            }];
        };

        this.makeTopUp = function(organization_id, fund_id) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/funds/' + fund_id + '/top-up');
        };

        this.apiFormToResource = function(formData) {
            let values = JSON.parse(JSON.stringify(formData));

            values.start_date = moment(values.start_date, 'DD-MM-YYYY').format('YYYY-MM-DD');
            values.end_date = moment(values.end_date, 'DD-MM-YYYY').format('YYYY-MM-DD');

            return values;
        };

        this.apiResourceToForm = function(apiResource) {
            return {
                type: apiResource.type,
                criteria: apiResource.criteria,
                formula_products: apiResource.formula_products || [],
                name: apiResource.name,
                description: apiResource.description,
                state: apiResource.state,
                start_date: moment(apiResource.start_date).format('DD-MM-YYYY'),
                end_date: moment(apiResource.end_date).format('DD-MM-YYYY'),
                notification_amount: apiResource.notification_amount,
                default_validator_employee_id: apiResource.default_validator_employee_id,
                auto_requests_validation: apiResource.auto_requests_validation,
            };
        };

        this.changeState = function(apiResource, state) {
            let formValues = this.apiResourceToForm(apiResource);

            formValues.state = state;

            return this.update(
                apiResource.organization_id,
                apiResource.id,
                formValues
            );
        };

        this.destroy = function(organization_id, fund_id) {
            return ApiRequest.delete(
                uriPrefix + organization_id + '/funds/' + fund_id
            );
        };

        this.sampleCSV = (fund) => {
            return Papa.unparse([
                fund.csv_required_keys.filter(key => key.indexOf('_eligible') == -1)
            ]);
        };

        this.criterionValidate = (organization_id, fund_id, criteria) => {
            let path = fund_id ? sprintf(
                uriPrefix + '%s/funds/%s/criteria/validate',
                organization_id,
                fund_id
            ) : sprintf(
                uriPrefix + '%s/funds/criteria/validate',
                organization_id
            );

            return fund_id ? ApiRequest.patch(path, {
                criteria: criteria
            }) : ApiRequest.post(path, {
                criteria: criteria
            });
        };

        this.stopActionConfirmationModal = (onConfirm) => {
            ModalService.open("dangerZone", {
                header: "Subsidie stoppen",
                title: "De publicatie van het aanbod wordt van de website verwijderd",
                description:
                    "Hierna kan er van dit aanbod geen gebruik meer worden gemaakt.\n" +
                    "De gebruikte tegoeden blijven bewaard. " +
                    "Wanneer u de subsidie opnieuw start, worden de gebruikte tegoeden verrekend met het nieuwe ingestelde limiet.",
                cancelButton: "Annuleer",
                confirmButton: "Stop subsidie",
                onConfirm,
            })
        };
    });
};

module.exports = [
    'ApiRequest',
    'ModalService',
    FundService
];