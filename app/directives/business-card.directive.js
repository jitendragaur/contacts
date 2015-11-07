(function () {
    'use strict';

    angular
        .module('contactApp')
        .directive('businessCard', businessCard);

    //businessCard.$inject = ['dependency'];

    /* @ngInject */
    function businessCard() {
        var businessCard = {
            restrict: 'E',
            templateUrl: './directives/templates/business-card.html',
            scope: {
                'user': '='
            },
            controller: businessCardController,
            controllerAs: 'vm'
        };
        return businessCard;


    }

    businessCardController.$inject = ['ContactService'];

    /* @ngInject */
    function businessCardController(ContactService) {
        var vm = this;
        vm.deleteUser = function (user) {
            console.log('User:',user);
            vm.isDeleting = true;
            ContactService.removePerson(user).then(function () {
                vm.isDeleting = false;
            });
        };

        vm.addFavorite = function (user) {
            vm.isSaving = true;
            ContactService.updatePerson(user).then(function () {
                vm.isSaving = false;
            });
        }
    }

})();