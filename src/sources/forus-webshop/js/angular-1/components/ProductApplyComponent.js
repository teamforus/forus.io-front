let ProductApplyComponent = function(
    $state,
    VoucherService,
    ModalService
) {
    let $ctrl = this;

    $ctrl.isApplicable = false;

    $ctrl.$onInit = function() {
        let fundIds = $ctrl.product.funds.map(fund => fund.id);

        $ctrl.applicableVouchers = $ctrl.vouchers.filter(voucher => {
            return (fundIds.indexOf(voucher.fund_id) != -1) && (
                parseFloat($ctrl.product.price) <= parseFloat(voucher.amount)
            ) && !voucher.parent && !voucher.expired && voucher.fund.type == 'budget';
        });

        $ctrl.isApplicable = $ctrl.applicableVouchers.length > 0;

        if (!$ctrl.isApplicable) {
            return $state.go('products-show', {
                id: $ctrl.product.id
            });
        }
    };


    $ctrl.dateParse = (date, date_locale) => {
        return date ? {
            unix: moment(typeof date === 'object' ? date.date : date).unix(),
            locale: date_locale,
        } : false;
    };

    $ctrl.applyForProduct = (voucher) => {
        const dates = [
            $ctrl.dateParse(voucher.fund.end_date, voucher.fund.end_date_locale),
            $ctrl.dateParse(voucher.expire_at, voucher.expire_at_locale),
            $ctrl.dateParse($ctrl.product.expire_at, $ctrl.product.expire_at_locale),
        ].filter((value) => value);

        dates.sort((a, b) => {
            if (a.unix != b.unix) {
                return a.unix < b.unix ? -1 : 1;
            }
        });

        return ModalService.open('modalProductApply', {
            expire_at: dates[0].locale,
            product: $ctrl.product,
            org_name: $ctrl.product.organization.name,
            confirm: () => {
                VoucherService.makeProductVoucher(
                    voucher.address,
                    $ctrl.product.id
                ).then(res => $state.go('voucher', res.data.data), console.error);
            }
        });
    };
};

module.exports = {
    bindings: {
        product: '<',
        vouchers: '<',
    },
    controller: [
        '$state',
        'VoucherService',
        'ModalService',
        ProductApplyComponent
    ],
    templateUrl: 'assets/tpl/pages/product-apply.html'
};