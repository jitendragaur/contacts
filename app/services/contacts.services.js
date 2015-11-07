(function () {
    'use strict';

    angular
        .module('contactApp')
        .service('ContactService', ContactService);

    ContactService.$inject = ['Contact', '$q', 'toaster', '$rootScope'];


    function ContactService(Contact, $q, toaster, $rootScope) {
        var self = this;

        self.page = 1,
            self.hasMore = true,
            self.isSaving = false,
            self.isDeleting = false,
            self.isLoading = false,
            self.selectedPerson = null,
            self.search = null,
            self.ordering = name,
            self.persons = [];


        self.loadContacts = loadContacts;
        self.loadMore = loadMore;
        self.doSearch = doSearch;
        self.doOrder = doOrder;

        self.getPerson = getPerson;
        self.createPerson = createPerson;
        self.updatePerson = updatePerson;
        self.removePerson = removePerson;

        self.watchFilters = watchFilters;

        function getPerson(email) {
            for (var i = 0; i < self.persons.length; i++) {
                if (self.persons[i].email == email) {
                    return self.persons[i];
                }
            }
        }

        function loadContacts() {
            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;

                var params = {
                    'page': self.page,
                    'search': self.search,
                    'ordering': self.ordering
                };

                Contact.get(params, function (data) {
                    angular.forEach(data.results, function (person) {
                        self.persons.push(new Contact(person));
                    });

                    //check if the api has more data
                    if (!data.next) {
                        self.hasMore = false;
                    }
                    self.isLoading = false;
                });
            }
        }

        function loadMore() {
            //call loadMore only if there is more data in api and its not loading
            if (self.hasMore && !self.isLoading) {
                self.page += 1; //increase the page number
                self.loadContacts();
            }
        }

        function doSearch() {
            self.page = 1;
            self.hasMore = true;
            self.isLoading = false;
            self.persons = [];
            self.selectedPerson = null;

            if (self.hasMore && !self.isLoading) {
                self.loadContacts();
            }

        }

        function doOrder() {
            self.page = 1;
            self.hasMore = true;
            self.isLoading = false;
            self.persons = [];
            self.selectedPerson = null;
            if (self.hasMore && !self.isLoading) {
                self.loadContacts();
            }
        }

        function updatePerson(person) {
            var defer = $q.defer();
            self.isSaving = true;
            //We can also use the person resource internal updae method.
            person.$update().then(function () {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + person.name);
                defer.resolve();
            });
            return defer.promise;
        }

        function removePerson(person) {
            var defer = $q.defer();
            self.isDeleting = true;
            //We can also use the person resource internal updae method.
            person.$remove().then(function () {
                self.isDeleting = false;
                self.selectedPerson = null;
                var index = self.persons.indexOf(person);
                self.persons.splice(index, 1); //also update our persons list.
                toaster.pop('success', 'Deleted ' + person.name);
                defer.resolve();
            });
            return defer.promise;
            //Contact.update(person).$promise.then(function(){
            //    self.isSaving = false;
            //})
        }


        function createPerson(person) {
            var defer = $q.defer(); //create promise so we can close the Modal after saving
            self.isSaving = true;
            // the person we passed is not resource object so we need to use ContactService
            Contact.save(person).$promise.then(function () {
                self.page = 1;
                self.hasMore = true;
                self.isLoading = false;
                self.persons = [];
                self.selectedPerson = null;
                self.isSaving = false;
                self.loadContacts();
                defer.resolve();
                toaster.pop('success', 'Created ' + person.name);
            });
            return defer.promise;
        }

        function watchFilters() {
            $rootScope.$watch(function () {
                return self.search;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    self.doSearch();
                }
            });

            $rootScope.$watch(function () {
                return self.ordering;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    self.doOrder();
                }
            });
        }

        self.loadContacts();
        self.watchFilters();

    }
})();
