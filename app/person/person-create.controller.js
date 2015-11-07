(function () {
    'use strict';

    angular
        .module('person')
        .controller('PersonCreateController', PersonCreateController);

    PersonCreateController.$inject = ['ContactService', '$state'];

    /* @ngInject */
    function PersonCreateController(ContactService, $state) {
        var vm = this;
        vm.mode = 'create';
        vm.contacts = ContactService;
        vm.contacts.selectedPerson = {}; //reset our selectedPerson so we dont mess with
        vm.saveContact = saveContact;

        function saveContact() {
            vm.contacts.createPerson(vm.contacts.selectedPerson)
                .then(function () {
                    $state.go('list');
                });
        }
    }
})();


