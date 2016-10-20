import Mousetrap from "ccampbell/mousetrap";

class ProductsCtrl {
    constructor($scope, $uibModal, $http, $templateRequest, $stateParams, $state, $translate, SFUtilities) {
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$http = $http;
        this.$templateRequest = $templateRequest;
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.$translate = $translate;
        this.SFUtilities = SFUtilities;

        this.actions = [];
        this.$templateRequest("/app/products/product-details.html");

        this.applyQueryStringFilters();
    }

    createProduct() {
        Mousetrap.reset();
        let modalInstance = this.$uibModal.open({
            templateUrl: "/app/products/create-product.html",
            controller: "CreateProductCtrl as vm",
            size: "lm",
            resolve: {
                productsGrid: this.$scope.productsGrid,
            }
        });

        modalInstance.opened.then(() => { this.$scope.$root.$broadcast("modalOpened"); });
        modalInstance.result.finally(() => { this.$scope.$root.$broadcast("modalClosed"); });
    }

    applyQueryStringFilters() {
        if (this.$stateParams.productNumber) {
            this.gridFilters = [{field: "accountProductNumber", value: this.$stateParams.productNumber}];
            this.$scope.$root.userMessage = {text: this.$translate.instant("PRODUCTS.FILTER_MESSAGE_PRODUCT", {productNumber: this.SFUtilities.escapeHTML(this.$stateParams.productNumber)}), icon: "info"};

            // Remove the query strings so that the filter doesn't get unintentionally re-applied if, for example, the page is refreshed (use of undefined is intentional and necessary here)
            /*eslint no-undefined:0*/
            this.$stateParams.productNumber = undefined;
            this.$state.go("products", this.$stateParams);
        }
    }
}

ProductsCtrl.$inject = ["$scope", "$uibModal", "$http", "$templateRequest", "$stateParams", "$state", "$translate", "SFUtilities"];

ProductsCtrl.angularName = "ProductsCtrl";
ProductsCtrl.angularType = "controller";

export default ProductsCtrl;
