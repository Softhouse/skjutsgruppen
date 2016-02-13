angular.module('starter.factories', ['starter.JSONReader'])

.factory('AchievementService', function(JSONReader) {
    return {
        getAchievements: function() {
          var reader = JSONReader.create('data/achievements.json', 'achievements', ['url']);
          return reader;
        }
    }
})
.factory('SettingService', function(JSONReader) {
  return {
    getSettings: function() {
      var reader = JSONReader.create('data/settings.json', 'settings', ['url']);
      return reader;
    }
  }
})
