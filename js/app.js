(function () {
    "use strict";

    const usStates = {
        AL: "ALABAMA",
        AK: "ALASKA",
        AS: "AMERICAN SAMOA",
        AZ: "ARIZONA",
        AR: "ARKANSAS",
        CA: "CALIFORNIA",
        CO: "COLORADO",
        CT: "CONNECTICUT",
        DE: "DELAWARE",
        DC: "DISTRICT OF COLUMBIA",
        FM: "FEDERATED STATES OF MICRONESIA",
        FL: "FLORIDA",
        GA: "GEORGIA",
        GU: "GUAM",
        HI: "HAWAII",
        ID: "IDAHO",
        IL: "ILLINOIS",
        IN: "INDIANA",
        IA: "IOWA",
        KS: "KANSAS",
        KY: "KENTUCKY",
        LA: "LOUISIANA",
        ME: "MAINE",
        MH: "MARSHALL ISLANDS",
        MD: "MARYLAND",
        MA: "MASSACHUSETTS",
        MI: "MICHIGAN",
        MN: "MINNESOTA",
        MS: "MISSISSIPPI",
        MO: "MISSOURI",
        MT: "MONTANA",
        NE: "NEBRASKA",
        NV: "NEVADA",
        NH: "NEW HAMPSHIRE",
        NJ: "NEW JERSEY",
        NM: "NEW MEXICO",
        NY: "NEW YORK",
        NC: "NORTH CAROLINA",
        ND: "NORTH DAKOTA",
        MP: "NORTHERN MARIANA ISLANDS",
        OH: "OHIO",
        OK: "OKLAHOMA",
        OR: "OREGON",
        PW: "PALAU",
        PA: "PENNSYLVANIA",
        PR: "PUERTO RICO",
        RI: "RHODE ISLAND",
        SC: "SOUTH CAROLINA",
        SD: "SOUTH DAKOTA",
        TN: "TENNESSEE",
        TX: "TEXAS",
        UT: "UTAH",
        VT: "VERMONT",
        VI: "VIRGIN ISLANDS",
        VA: "VIRGINIA",
        WA: "WASHINGTON",
        WV: "WEST VIRGINIA",
        WI: "WISCONSIN",
        WY: "WYOMING"
    };

    angular.module('contactApp', ['ngRoute', 'LocalStorageModule', 'ngMap'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/contactList.html',
                controller: 'contactListController'
            }).when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'contactController', 
            }).when('/contact/:id', {
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            });
            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');
        })
        .directive('cswFileInput', function () {
            return {
                restrict: 'A',
                scope: {
                    data: '=fileData'
                },
                link: function (scope, element) {
                    element.on('change', function (domEvent) {
                        let reader = new FileReader();
                        reader.onload = function (fileReaderEvent) {
                            scope.$apply(function (scope) {
                                scope.data = fileReaderEvent.target.result;
                            });
                            angular.element(domEvent.target).val('');
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    });
                }
            };
        })
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('08724.hw5');
        })
        .controller('contactListController', function ($scope, localStorageService, $routeParams, $location) {
            $scope.submittedAddresses = [];
            var onClickName = '';
            for (var item in localStorage) {
                var newItem = JSON.parse(localStorage[item]);    
                $scope.submittedAddresses.push(newItem);
            }
            
            $scope.removeContact = function (index, item) {
                var key = $scope.submittedAddresses[index].email;
                localStorage.removeItem(key);
                $scope.submittedAddresses.splice(index, 1);

            }
            
            $scope.showContact = function (index, item) {
                var key2 = $scope.submittedAddresses[index].email;
                /*
                localStorage.getItem(key2)
                */
                $location.path('/contact/' + key2);
            }
            
            $scope.goAdd = function () {
                $location.path('/contact');
            }
            
              
        })

        .controller('contactController', function ($scope, localStorageService, $routeParams, $location) {
            //$scope.files = [];
            $scope.stateOptions = usStates;
            //$scope.submittedAddresses = [];
            
            

                
                if($routeParams.id !== 'undefined') {
               $scope.address = JSON.parse(localStorage.getItem($routeParams.id));
                    console.log($scope.address);
                 
                }
          else {
                          $scope.address = {};

          }
              
 $scope.submit = function () {
     
                localStorage.setItem(
                    $scope.address.email,
                    JSON.stringify($scope.address)
                );

             //   $scope.submittedAddresses.push(newContact);
                
                //reset input value
             //   $scope.address = {};
                                $location.path('/');

                }

            })
            
            
        
            
            
            
        




 



})();
