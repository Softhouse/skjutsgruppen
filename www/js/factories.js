angular.module('skjutsgruppen.factories', ['skjutsgruppen.JSONReader'])

.factory('AchievementService', function(JSONReader) {
    return {
        getAchievements: function() {
          var reader = JSONReader.create('data/achievements.json', 'achievements', ['url']);
          return reader;
        }
    }
    return reader;
})

.factory('MapCoordinates', function(JSONReader) {
    var reader = JSONReader.create('data/mapCoordinates.json', 'coordinates', ['url']);
    return reader;
})

.factory('SettingService', function(JSONReader) {
  return {
    getSettings: function() {
      var reader = JSONReader.create('data/settings.json', 'settings', ['url']);
      return reader;
    },

    updateSetting: function(settingId, newValue) {
      console.log("Someone toggled the notification setting " + settingId + " and set it to " + newValue + "!");
    }
  }
})
