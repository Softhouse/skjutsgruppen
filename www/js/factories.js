angular.module('skjutsgruppen.factories', ['skjutsgruppen.JSONReader'])

.factory('AchievementsFactory', function (JSONReader) {
    return {
        getAchievements: function () {
            return JSONReader.create('data/achievements.json', 'achievements', ['url']);
        }
    };
})

.factory('SettingsFactory', function (JSONReader) {
    return {
        getSettings: function() {
            return JSONReader.create('data/settings.json', 'settings', ['url']);
        },

        updateSetting: function(settingId, newValue) {
            console.log("Someone toggled the notification setting " + settingId + " and set it to " + newValue + "!");
        }
    };
})

.factory('MapFactory', function (JSONReader) {
    return {
        getCoordinates: function() {
            return JSONReader.create('data/mapCoordinates.json', 'coordinates', ['url']);
        }
    }
  })

.factory('StatisticsFactory', function(JSONReader) {
  return {
    getStatistics: function() {
      var reader = JSONReader.create('data/statistics.json', 'statistics', ['url']);
      return reader;
    }
  }
})
