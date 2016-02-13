angular.module('skjutsgruppen.factories', ['skjutsgruppen.JSONReader'])

.factory('Achievements', function(JSONReader) {
    var reader = JSONReader.create('data/achievments.json', 'achievments', ['url']);
    return reader;
})

.factory('MapCoordinates', function(JSONReader) {
    var reader = JSONReader.create('data/mapCoordinates.json', 'coordinates', ['url']);
    return reader;
})