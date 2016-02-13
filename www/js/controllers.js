/* global google */
angular.module('skjutsgruppen.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.goHome = function () {
            $state.go('app.startpage');
        };
    })

    .controller('registerTripDriverCtrl', function ($scope, $state) {
        $scope.myForm = {};
        var listOfViaLocations = [];

        $scope.addTripDriver = function (form) {
            // console.log("listOfViaLocations: " + listOfViaLocations);
            // console.log("form:");
            // console.log(form);
            // console.log("$scope.myForm:");
            // console.log($scope.myForm);
            //console.log($state.get());
            // alert('Add trip to list');

            window.localStorage['result'] = JSON.stringify($scope.myForm);
            // var result = JSON.parse(window.localStorage['result'] || '{}');
            // console.log("result: ");
            // console.log(result);


            $state.go('app.summary');
        };

        $scope.addLocation = function () {
            listOfViaLocations.push($scope.myForm.viaLocation);
        };
    })

    .controller('StartpageCtrl', function ($scope) {
    })

    .controller('ResultCtrl', function ($scope) {

    })

    .controller('SummaryCtrl', function ($scope) {

        var result = JSON.parse(window.localStorage['result'] || '{}');
        // console.log("result: ");
        // console.log(result);
        $scope.listHasLocations = false;
        $scope.item =
        { from: result.from, to: result.to, firstTime: result.firstTime, secondTime: result.secondTime, availableSeats: result.availableSeats, viaLocation: result.viaLocation };

        var listOfViaLocations = result.viaLocation;
        console.log(listOfViaLocations);
        // console.log("nr: " + result.viaLocation.length);

        if (listOfViaLocations.size > 1) {
            $scope.listHasLocations = true;
        }
        else {
            $scope.listHasLocations = false;
        }
        // for each()

        // {from: result.from},
        // {title: "Info 2"},
        // {title: "Info 3"},
        // {title: "Info 4"},
        // {title: "Info 5"},
  

        // $scope.data = {
        //   showReordering: false
        // }
    })

    .controller('AchievementsCtrl', function ($scope, AchievementsFactory) {
        AchievementsFactory.getAchievements().all().then(function (data) {
            $scope.achievements = data;
        });
    })

    .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, MapFactory) {
        var options = { timeout: 10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: currentLatLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.NONE,
                    position: currentLatLng
                });

                console.log(marker.position);

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open($scope.map, marker);
                });
            });

            MapFactory.getCoordinates.all().then(function (data) {
                $scope.mapCoordinates = data;

                console.log(data);

                if (data !== undefined && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var coordinate = data[i];
                        console.log(coordinate);

                        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                            var marker = new google.maps.Marker({
                                map: $scope.map,
                                animation: google.maps.Animation.DROP,
                                position: new google.maps.LatLng(coordinate.longitud, coordinate.latitud)
                            });

                            console.log(marker.position);

                            var infoWindow = new google.maps.InfoWindow({
                                content: "Here are another person!"
                            });

                            google.maps.event.addListener(marker, 'click', function () {
                                infoWindow.open($scope.map, marker);
                            });
                        });
                    }
                }
                else {
                    console.log("Coordinates data is empty or undefined!")
                }
            });

        }, function (error) {
            console.log("Could not get location");
        })
    })

    .controller('SettingsCtrl', function ($scope, SettingsFactory) {

        SettingsFactory.getSettings().all().then(function (data) {
            $scope.settings = data;
        });

        $scope.toggleSetting = function (settingId, newValue) {
            SettingsFactory.updateSetting(settingId, newValue);
        }
    });
