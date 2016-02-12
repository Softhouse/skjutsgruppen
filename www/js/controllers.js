angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('registerTripDriverCtrl', function($scope) {
  $scope.addTripDriver = function(form) {
      alert('Hej');
  };
})

.controller('StartpageCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AchievementsCtrl', function($scope) {
  $scope.achievements = [{
    name: 'Chauffeur',
    description: 'Complete your first skjutsgruppen drive',
    unlocked: true,
    image: 'img/achievements/first-drive-unlocked.png',
    progress: null
  }, {
    name: 'Crowded',
    description: 'Utilize all your cars seats (and the trunk!) when being the driver',
    unlocked: false,
    image: 'img/achievements/full-car-locked.png',
    progress: null
  }, {
    name: 'City dweller',
    description: 'As a passenger, travel to 10 unique cities',
    unlocked: false,
    image: 'img/achievements/city-dweller-locked.png',
    progress: {
      current: 5,
      total: 10
    }
  }, {
    name: 'SHITSHITSHITSHIT',
    description: 'Accidentally set your car on fire when refilling washer fluid',
    unlocked: false,
    image: 'img/achievements/shitshitshitshit-locked.png',
    progress: null
  }];
});
