(function () {
    'use strict';

    angular.module('person')
        .constant('TEMPLATE_URL', './person/templates/')

        .config(['$stateProvider', '$urlRouterProvider', 'TEMPLATE_URL', function ($stateProvider, $urlRouterProvider, TEMPLATE_URL) {
            $stateProvider.state('list', {
                    url: '/',
                    views: {
                        'main': {
                            templateUrl: TEMPLATE_URL + 'list.html',
                            controller: 'PersonListController as vm'
                        },
                        'search': {
                            templateUrl: TEMPLATE_URL + 'search.form.html',
                            controller: 'PersonListController as vm'
                        }
                    }
                })
                .state('edit', {
                    url: '/edit/:email',
                    views: {
                        'main': {
                            templateUrl: TEMPLATE_URL + 'edit.html',
                            controller: 'PersonDetailController as vm'
                        }
                    }
                })
                .state('create', {
                    url: '/create',
                    views: {
                        'main': {
                            templateUrl: TEMPLATE_URL + 'edit.html',
                            controller: 'PersonCreateController as vm'
                        }
                    }
                })

            $urlRouterProvider.otherwise('/');

        }])

})();