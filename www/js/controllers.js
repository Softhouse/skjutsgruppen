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

        $scope.browseSofthouseWebsite = function () {
            var url = 'http://www.softhouse.se';
            window.open(url, '_system', 'location=no');
            return false;
        };
    })

    .controller('registerTripDriverCtrl', function ($scope, $state) {
        $scope.myForm = {};
        var listOfViaLocations = [];

        $scope.addTripDriver = function (form) {

            window.localStorage.result = JSON.stringify($scope.myForm);
            window.localStorage.listOfViaLocations = JSON.stringify(listOfViaLocations);

            $state.go('app.summary');
        };

        $scope.addLocation = function () {
            listOfViaLocations.push($scope.myForm.viaLocation);
        };
    })

    .controller('StartpageCtrl', function ($scope) {
    })

    .controller('ResultCtrl', function ($scope, $ionicPopup) {
        //var result = JSON.parse(window.localStorage.resultForResult || '{}');

        $scope.matches = [
            { who: "Karl", from: "Göteborg", to: "Stockholm", firstTime: "2016-02-18 07:00", secondTime: "2016-02-18 12:00", availableSeats: "1" },
            { who: "Pelle", from: "Göteborg", to: "Stockholm", firstTime: "2016-02-17 12:00", secondTime: "2016-02-18 13:00", availableSeats: "4" },
            { who: "Niklas", from: "Göteborg", to: "Stockholm", firstTime: "2016-02-18 11:00", secondTime: "2016-02-18 12:00", availableSeats: "3" }
        ];

         $scope.showConfirm = function(match) {
           var confirmPopup = $ionicPopup.confirm({
             title: 'Kolla in profil för ' + match.who,
             template: 'Vill du gå vidare och kolla in profilen för ' + match.who + '?'
           });

           confirmPopup.then(function(res) {
             if(res) {
               console.log('Gå vidare till profil');
             } else {
               console.log('Stanna kvar');
             }
           });
         };

        $scope.onMatchClick = function(match) {
          var matchAccepted;
          var messageString = "Info om föraren \nNamn: " + match.who + "\nSamt annan info om resan";

          if(confirm(messageString) == true){
              matchAccepted = true;
          } 
          else{
              matchAccepted = false;
          }

          if(matchAccepted == true){
            alert("Vi kommer nu att matcha ihop dig med " + match.who);
          }
        };

    })

    .controller('PushCtrl', function ($scope) {
    })

    .controller('SummaryCtrl', function ($scope) {

        var result = JSON.parse(window.localStorage.result || '{}');
        var listOfViaLocations = JSON.parse(window.localStorage.listOfViaLocations || '{}');

        $scope.listHasLocations = false;
        $scope.item =
        { from: result.from, to: result.to, firstTime: result.firstTime, secondTime: result.secondTime, availableSeats: result.availableSeats, viaLocation: listOfViaLocations };

        if (listOfViaLocations.length > 1) {
            $scope.listHasLocations = true;
        }
        else {
            $scope.listHasLocations = false;
        }
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
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                var markerIcon = {
                    url: 'img/map/me.png',
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(32, 50),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(15, 50)
                };

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.NONE,
                    icon: markerIcon,
                    position: currentLatLng
                });

                //var infoWindow = new google.maps.InfoWindow();
                //var infoWindowContent;

                google.maps.event.addListener(marker, 'click', function () {
                    // infoWindowContent =
                    // '<div class="info_content">' +
                    // '<p>Här är du!</p>' +
                    // '</div>';
                    // infoWindow.setContent(infoWindowContent);
                    //infoWindow.open($scope.map, marker);
                });
            });

            MapFactory.getCoordinates().all().then(function (data) {
                $scope.mapCoordinates = data;

                console.log(data);

                if (data !== undefined && data.length > 0) {
                    var bounds = new google.maps.LatLngBounds();
                    var infoWindow = new google.maps.InfoWindow(), marker, i;
                    var markerIcon, coordinateLatLng, infoWindowContent, bonusWindowContent;

                    for (i = 0; i < data.length; i++) {
                        console.log(data[i].username);

                        if (data[i].ETA !== undefined) {
                            $scope.ETA = data[i].ETA;
                        }

                        markerIcon = {
                            url: 'img/map/' + data[i].marker + '.png',
                            // This marker is 20 pixels wide by 32 pixels high.
                            size: new google.maps.Size(32, 50),
                            // The origin for this image is (0, 0).
                            origin: new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at (0, 32).
                            anchor: new google.maps.Point(15, 50)
                        };

                        console.log(markerIcon.url);

                        coordinateLatLng = new google.maps.LatLng(data[i].longitud, data[i].latitud);
                        bounds.extend(coordinateLatLng);
                        marker = new google.maps.Marker({
                            title: data[i].username,
                            map: $scope.map,
                            animation: google.maps.Animation.DROP,
                            icon: markerIcon,
                            position: new google.maps.LatLng(data[i].longitud, data[i].latitud)
                        });

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                if (data[i].marker === 'accepted') {
                                    bonusWindowContent = '<p>' + data[i].username + ' är påväg till dig och ankomer om ca. ' + data[i].ETA.substr(3, 2) + ' minuter och ' + data[i].ETA.substr(6, 2) + ' sekunder.</p>'
                                }
                                else {
                                    bonusWindowContent = "";
                                }
                                infoWindowContent =
                                '<div class="info_content">' +
                                '<p>Här är ' + data[i].username + '!</p>' +
                                bonusWindowContent
                                '</div>';
                                infoWindow.setContent(infoWindowContent);
                                infoWindow.open($scope.map, marker);
                            }
                        })(marker, i));

                        $scope.map.fitBounds(bounds);
                    }

                    var boundsListener = google.maps.event.addListener(($scope.map), 'bounds_changed', function (event) {
                        this.setZoom(15);
                        google.maps.event.removeListener(boundsListener);
                    });
                }
                else {
                    console.log("Coordinates data is empty or undefined!")
                }
            });

        }, function (error) {
            console.log("Could not get location");
        })
    })

    .controller('StatisticsCtrl', function($scope, StatisticsFactory) {

      StatisticsFactory.getStatistics().all().then(function(data) {
        $scope.statistics = data;
      });

    })

    .controller('SettingsCtrl', function ($scope, SettingsFactory) {

        SettingsFactory.getSettings().all().then(function (data) {
            $scope.settings = data;
        });

        $scope.toggleSetting = function (settingId, newValue) {
            SettingsFactory.updateSetting(settingId, newValue);
        };
    })

    .controller('registerTripPassengerCtrl', function ($scope, $state) {
        $scope.myForm = {};

        $scope.addTripPassanger = function (form) {
            window.localStorage.resultForResult = JSON.stringify($scope.myForm);
            $state.go('app.result');
        };
    })

    .controller('ProfileCtrl', function ($scope) {
        $scope.recurringTrips = [{
            title: 'Malmö - Göteborg (ToR)'
        }, {
                title: 'Hem - Jobbet (ToR)'
            }];

        $scope.storedAddresses = [{
            name: 'Hem'
        }, {
                name: 'Jobbet'
            }, {
                name: 'Maxi'
            }];
    });
