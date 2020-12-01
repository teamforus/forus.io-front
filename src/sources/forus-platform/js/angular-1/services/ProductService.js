let sprintf = require('sprintf-js').sprintf;

let ProductService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';
    let uriPublicPrefix = '/platform/products/';

    return new (function() {
        this.list = function(organization_id, query = {}) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/products', query
            );
        };

        this.listAll = function(query = {}) {
            return ApiRequest.get('/platform/products', query);
        };

        this.listProductFunds = function(organization_id, fund_id, query = {}) {
            return ApiRequest.get(
                sprintf('%s%s/products/%s/funds', uriPrefix, organization_id, fund_id),
                query
            );
        };

        this.store = function(organization_id, values) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/products',
                this.apiFormToResource(values)
            );
        };

        this.update = function(organization_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/products/' + id,
                this.apiFormToResource(values));
        };

        this.updateExclusions = function(organization_id, product_id, values) {
            return ApiRequest.patch(
                sprintf('%s%s/products/%s/exclusions', uriPrefix, organization_id, product_id),
                values
            );
        };

        this.read = function(organization_id, id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/products/' + id
            );
        };

        this.readPublic = function(id, query = {}) {
            return ApiRequest.get(sprintf(
                sprintf('%s%s', uriPublicPrefix, id),
                query
            ));
        };

        this.destroy = function(organization_id, id) {
            return ApiRequest.delete(
                uriPrefix + organization_id + '/products/' + id
            );
        };

        this.apiFormToResource = function(formData) {
            let values = JSON.parse(JSON.stringify(formData));

            values.expire_at = moment(values.expire_at, 'DD-MM-YYYY').format('YYYY-MM-DD');

            return values;
        };

        this.apiResourceToForm = function(apiResource) {
            let values = {
                name: apiResource.name,
                description: apiResource.description,
                price: parseFloat(apiResource.price),
                old_price: parseFloat(apiResource.old_price),
                no_price: apiResource.no_price,
                no_price_type: apiResource.no_price_type,
                no_price_discount: parseFloat(apiResource.no_price_discount),
                total_amount: apiResource.total_amount,
                stock_amount: apiResource.stock_amount,
                sold_amount: apiResource.total_amount - apiResource.stock_amount,
                expire_at: moment(apiResource.expire_at).format('DD-MM-YYYY'),
                product_category_id: apiResource.product_category_id,
            };

            if (apiResource.no_price) {
                delete values.price;
                delete values.old_price;
            }

            return values;
        };
    });
};

module.exports = [
    'ApiRequest',
    ProductService
];