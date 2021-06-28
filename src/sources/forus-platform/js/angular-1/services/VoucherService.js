const VoucherService = function(ApiRequest) {
    return new (function() {
        this.index = (organization_id, query) => {
            return ApiRequest.get([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers'
            ].join(''), query);
        };

        this.readProvider = function(address) {
            return ApiRequest.get('/platform/provider/vouchers/' + address);
        };

        this.readProviderProducts = function(address, query = {}) {
            return ApiRequest.get('/platform/provider/vouchers/' + address + '/products', query);
        };

        this.get = function(address) {
            return ApiRequest.get('/platform/organizations/' + address);
        };

        this.store = (organization_id, data) => {
            return ApiRequest.post([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers'
            ].join(''), data);
        };

        this.storeValidate = (organization_id, data) => {
            return ApiRequest.post([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/validate'
            ].join(''), data);
        };

        this.storeCollection = function(organization_id, fund_id, vouchers) {
            return ApiRequest.post([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/batch'
            ].join(''), {
                fund_id: fund_id,
                vouchers: vouchers
            });
        };

        this.show = (organization_id, voucher_id) => {
            return ApiRequest.get([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/' + voucher_id
            ].join(''));
        };

        this.assign = (organization_id, voucher_id, query) => {
            return ApiRequest.patch([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/' + voucher_id + '/assign',
            ].join(''), query);
        };

        this.activate = (organization_id, voucher_id) => {
            return ApiRequest.patch([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/' + voucher_id + '/activate',
            ].join(''));
        };

        this.makeActivationCode = (organization_id, voucher_id) => {
            return ApiRequest.patch([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/' + voucher_id + '/activation-code',
            ].join(''));
        };

        this.sendToEmail = (organization_id, voucher_id, email) => {
            return ApiRequest.post([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/' + voucher_id + '/send',
            ].join(''), {
                email: email
            });
        };

        this.downloadQRCodesXls = function(organization_id, query) {
            return ApiRequest.get([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/export-xls',
            ].join(''), query, {}, true, (_cfg) => {
                _cfg.responseType = 'arraybuffer';
                _cfg.cache = false;

                return _cfg;
            });
        };

        this.downloadQRCodes = function(organization_id, query) {
            return ApiRequest.get([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/export',
            ].join(''), query, {}, true, (params) => {
                params.responseType = 'blob';
                return params;
            });
        };

        this.downloadQRCodesData = function(organization_id, query) {
            return ApiRequest.get([
                '/platform/organizations/' + organization_id,
                '/sponsor/vouchers/export-data',
            ].join(''), query);
        };

        this.sampleCSVBudgetVoucher = (expires_at = "2020-02-20") => {
            const headers = ['amount', 'expires_at', 'note', 'email', 'activate', 'activation_code'];
            const values = [10, expires_at, 'voorbeeld notitie', 'test@example.com', 0, 0];

            return Papa.unparse([headers, values]);
        };

        this.sampleCSVProductVoucher = (product_id = null, expires_at = "2020-02-20") => {
            const headers = ['product_id', 'expires_at', 'note', 'email', 'activate', 'activation_code'];
            const values = [product_id, expires_at, 'voorbeeld notitie', 'test@example.com', 0, 0];

            return Papa.unparse([headers, values]);
        };
    });
};

module.exports = [
    'ApiRequest',
    VoucherService
];
