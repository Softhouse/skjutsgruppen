// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngCordova', 
    'starter.controllers',
    'starter.factories',
    'starter.JSONReader'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('Bakåt');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.startpage', {
                url: '/startpage',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/startpage.html',
                        controller: 'StartpageCtrl'
                    }
                }
            })

            .state('app.registerTripDriver', {
                url: '/registerTripDriver',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/registerTripDriver.html',
                        controller: 'registerTripDriverCtrl'
                    }
                }
            })

            .state('app.resultat', {
                url: '/resultat',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/resultat.html',
                        controller: 'MainCtrl'
                    }
                }
            })

            .state('app.achievements', {
                url: '/achievements',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/achievements.html',
                        controller: 'AchievementsCtrl'
                    }
                }
            })
            
            .state('app.map', {
                url: '/map',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map.html',
                        controller: 'MapCtrl'
                    }
                }
            });
            
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/startpage');
    });
