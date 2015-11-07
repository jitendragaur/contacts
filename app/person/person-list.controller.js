(function () {
    'use strict';

    angular
        .module('person')
        .controller('PersonListController', PersonListController);

    PersonListController.$inject = ['ContactService', '$scope', '$modal'];

    /* @ngInject */
    function PersonListController(ContactService, $scope, $modal) {
        var vm = this;

        vm.contactsLayout = 'card';

        vm.contacts = ContactService;
        vm.loadMore = loadMore;

        function loadMore() {
            ContactService.loadMore(); //load next page from ContactService
        }
    }

})();

