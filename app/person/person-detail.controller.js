(function () {
    'use strict';

    angular
        .module('person')
        .controller('PersonDetailController', PersonDetailController);

    PersonDetailController.$inject = ['ContactService', '$stateParams', '$state'];

    /* @ngInject */
    function PersonDetailController(ContactService, $stateParams, $state) {
        var vm = this;
        vm.contacts = ContactService;
        vm.saveContact = saveContact;
        vm.removeContact = removeContact;
        vm.mode = 'edit';

        vm.contacts.selectedPerson = vm.contacts.getPerson($stateParams.email);

        function saveContact() {
            vm.contacts.updatePerson(vm.contacts.selectedPerson)
                .then(function () {
                    $state.go('list');
                });
        }

        function removeContact() {
            vm.contacts.removePerson(vm.contacts.selectedPerson)
                .then(function () {
                    $state.go('list');
                });
        }
    }

})();
