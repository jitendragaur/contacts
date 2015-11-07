(function () {
    'use strict';

    angular
        .module('common')
        .filter('defaultImage', defaultImage);

    function defaultImage() {
        return function (input, param) {
            return input ? input : param;
        }
    }

})();

