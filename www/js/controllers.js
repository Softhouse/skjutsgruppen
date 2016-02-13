/* global google */
angular.module('starter.controllers', [])

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

    .controller('registerTripDriverCtrl', function ($scope) {
        $scope.myForm = {};
        var listOfViaLocations = [];

        $scope.addTripDriver = function (form) {
            console.log(listOfViaLocations);
            alert('Add trip to list');
        };

        $scope.addLocation = function () {
            listOfViaLocations.push($scope.myForm.viaLocation);
            console.log(listOfViaLocations);
        };
    })

    .controller('StartpageCtrl', function ($scope) {

    })


    .controller('ResultCtrl', function ($scope) {
        $scope.items = [
            { title: "Info 1" },
            { title: "Info 2" },
            { title: "Info 3" },
            { title: "Info 4" },
            { title: "Info 5" },
        ]
        $scope.data = {
            showReordering: false
        }
    })

    .controller('AchievementsCtrl', function ($scope, AchievementService) {
        AchievementService.getAchievements().all().then(function(data) {
          $scope.achievements = data;
        });
    })

    .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
        var options = { timeout: 10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        }, function (error) {
            console.log("Could not get location");
        })
    })

    .controller('SettingsCtrl', function ($scope, SettingService) {

        SettingService.getSettings().all().then(function(data) {
          $scope.settings = data;
        });

        $scope.toggleSetting = function (settingId, newValue) {
            SettingService.updateSetting(settingId, newValue);
        }
    });
