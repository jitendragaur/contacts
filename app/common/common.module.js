(function () {
    'use strict';

    angular
        .module('common', [
            'ngResource',
            'infinite-scroll',
            'ngAnimate',
            'angular-loading-bar',
            'jcs-autoValidate',
            'angular-ladda',
            'mgcrea.ngStrap',
            'toaster',
            'ui.router'
        ])
        .config(['$httpProvider', '$resourceProvider', 'laddaProvider', '$datepickerProvider',
            function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
                $httpProvider.defaults.headers.common['Authorization'] =
                    'Token 411a90c21e74fbe163914fc78d83ef4ddb4ac0cd';
                $resourceProvider.defaults.stripTrailingSlashes = false;
                laddaProvider.setOption({
                    'style': 'expand-right'
                });
                angular.extend($datepickerProvider.defaults, {
                    dateFormat: 'dd/MM/yyyy',
                    autoclose: true
                });
            }])

})();