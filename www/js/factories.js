angular.module('starter.factories', ['starter.JSONReader'])

.factory('Achievements', function(JSONReader) {
    var reader = JSONReader.create('data/achievments.json', 'achievments', ['url']);
    return reader;
})