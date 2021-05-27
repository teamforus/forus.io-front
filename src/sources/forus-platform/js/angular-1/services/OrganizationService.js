let sprintf = require('sprintf-js').sprintf;

module.exports = [
    'ApiRequest',
    '$rootScope',
    function(
        ApiRequest,
        $rootScope
    ) {
        return new (function() {
            this.list = function(query = {}) {
                return ApiRequest.get('/platform/organizations', query);
            };

            this.listValidatorsAvailable = function(query = {}) {
                return ApiRequest.get('/platform/organizations', Object.assign({
                    is_employee: 0,
                    is_validator: 1,
                }, query));
            };

            this.readListValidators = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/validators',
                    organization_id
                ), query);
            };

            this.addExternalValidator = function(
                organization_id,
                validator_organization_id,
                query = {}
            ) {
                return ApiRequest.post(sprintf(
                    '/platform/organizations/%s/validators',
                    organization_id
                ), Object.assign({
                    'organization_id': validator_organization_id
                }, query));
            };

            this.removeExternalValidator = function(
                organization_id,
                validator_organization_id,
                query = {}
            ) {
                return ApiRequest.delete(sprintf(
                    '/platform/organizations/%s/validators/%s',
                    organization_id,
                    validator_organization_id
                ), Object.assign({}, query));
            };

            this.listProviders = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/providers',
                    organization_id
                ), query);
            };

            this.listExternalFunds = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/external-funds',
                    organization_id
                ), query);
            };

            this.externalFundUpdate = function(organization_id, fund_id, query = {}) {
                return ApiRequest.patch(sprintf(
                    '/platform/organizations/%s/external-funds/%s',
                    organization_id,
                    fund_id
                ), query);
            };

            this.listProvidersExport = function(
                organization_id,
                query = {}
            ) {
                return ApiRequest.get(
                    '/platform/organizations/' + organization_id +
                    '/providers/export',
                    query, {}, true,
                    (_cfg) => {
                        _cfg.responseType = 'arraybuffer';
                        _cfg.cache = false;

                        return _cfg;
                    }
                );
            };

            this.providerOrganizations = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers',
                    organization_id
                ), query);
            };

            this.financeProviders = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/finances',
                    organization_id
                ), query);
            };

            this.financeProvidersExport = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/finances-export',
                    organization_id
                ), query, {}, true, (_cfg) => {
                    return { ..._cfg, ...{ responseType: 'arraybuffer', cache: false } };
                });
            };

            this.providerOrganizationsExport = function(organization_id, query = {}) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/export',
                    organization_id
                ), query, {}, true, (_cfg) => {
                    return { ..._cfg, ...{ responseType: 'arraybuffer', cache: false } };
                });
            };

            this.providerOrganization = function(
                organization_id,
                provider_organization_id,
                query = {}
            ) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/%s',
                    organization_id,
                    provider_organization_id
                ), query);
            };

            this.sponsorProducts = function(
                sponsor_organization_id,
                provider_organization_id,
                query = {}
            ) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/%s/products',
                    sponsor_organization_id,
                    provider_organization_id
                ), { ...query });
            };

            this.sponsorProduct = function(
                sponsor_organization_id,
                provider_organization_id,
                product_id
            ) {
                return ApiRequest.get(sprintf(
                    '/platform/organizations/%s/sponsor/providers/%s/products/%s',
                    sponsor_organization_id,
                    provider_organization_id,
                    product_id
                ));
            };

            this.sponsorProductUpdate = function(
                sponsor_organization_id,
                provider_organization_id,
                product_id,
                data = {}
            ) {
                return ApiRequest.patch(sprintf(
                    '/platform/organizations/%s/sponsor/providers/%s/products/%s',
                    sponsor_organization_id,
                    provider_organization_id,
                    product_id
                ), { ...data });
            };

            this.sponsorStoreProduct = function(
                sponsor_organization_id,
                provider_organization_id,
                data = {}
            ) {
                return ApiRequest.post(sprintf(
                    '/platform/organizations/%s/sponsor/providers/%s/products',
                    sponsor_organization_id,
                    provider_organization_id
                ), { ...data });
            };

            this.store = function(values) {
                return ApiRequest.post(
                    '/platform/organizations',
                    this.apiFormToResource(values)
                );
            };

            this.update = function(id, values) {
                return ApiRequest.patch(
                    '/platform/organizations/' + id,
                    this.apiFormToResource(values)
                );
            };

            this.updateRole = function(id, values) {
                return ApiRequest.patch(
                    '/platform/organizations/' + id + '/roles',
                    this.apiFormToResource(values)
                );
            };

            this.updateBusinessType = function(id, business_type_id) {
                return ApiRequest.patch(
                    '/platform/organizations/' + id + '/update-business', {
                    business_type_id: business_type_id
                });
            };

            this.read = function(id, query = {}) {
                return ApiRequest.get('/platform/organizations/' + id, query);
            };

            this.use = function(id) {
                localStorage.setItem('active_organization', id);
                $rootScope.$broadcast('organization-changed', id);
            };

            this.clearActive = function() {
                localStorage.removeItem('active_organization');
                $rootScope.$broadcast('organization-changed', null);
            };

            this.active = function() {
                let id = parseInt(localStorage.getItem('active_organization') || null);

                return isNaN(id) ? false : id;
            };

            this.apiFormToResource = function(formData) {
                let values = JSON.parse(JSON.stringify(formData));

                if (['http://', 'https://'].indexOf(values.website) != -1) {
                    values.website = '';
                }

                return values;
            };

            this.apiResourceToForm = function(apiResource) {
                return {
                    business_type_id: apiResource.business_type_id,
                    name: apiResource.name,
                    description: apiResource.description,
                    description_html: apiResource.description_html,
                    iban: apiResource.iban,
                    email: apiResource.email,
                    email_public: !!apiResource.email_public,
                    phone: apiResource.phone,
                    phone_public: !!apiResource.phone_public,
                    kvk: apiResource.kvk,
                    btw: apiResource.btw,
                    website: apiResource.website || 'https://',
                    website_public: !!apiResource.website_public,
                };
            };
        });
    }
];