(function () {
    'use strict';

    angular
        .module('contactApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource'];

    /* @ngInject */
    function Contact($resource) {
        return $resource('https://codecraftpro.com/api/samples/v1/contact/:id/', {
            id: '@id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }

})();