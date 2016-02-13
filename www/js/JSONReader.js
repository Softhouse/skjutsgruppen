angular.module('skjutsgruppen.JSONReader', [])

.factory('JSONReader', function($q, $http) {
    var creator = {};

    creator.create = function(file, rootKey, extra) {
        var methods = Array.isArray(extra) ?  extra : [];

        var size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        };
        var deferred = $q.defer();

        var temp = {
            mymethods:methods,
            json: {},
            test: function() {
                var d = $q.defer();
                d.resolve(size(this.json));
                return d.promise;
            },
            all: function() {
                var d = $q.defer();
                if (size(this.json) > 0) {
                    d.resolve(this.json[rootKey]);
                } else {
                    $http.get(file).success(function(data) {
                        this.json = data;
                        d.resolve(data[rootKey]);
                    }).error(function(data) {
                        d.reject("Could not read file: " + file);
                    });
                }
                return d.promise;
            },
            get: function(key) {
                return this.all(rootKey).then(function(obj) {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].id === parseInt(key)) {
                            return obj[i];
                        }
                    }
                    return null;
                });
            },
            allWL: function(category) {
                var savedJson = JSON.parse(window.localStorage[category] || '{}');
                alert("savedJson: " + savedJson);
            }
        };

        // Generate Find Methods
        var arrayLength = methods.length;
        function PropKey(propkey) {
            return function(key) {
                return this.all(rootKey).then(function(obj) {
                    for (var i = 0; i < obj.length; i++) {
                        var value = obj[i];
                        if (value[propkey] === key) {
                            return value;
                        }
                    }
                    return null;
                });
            };
        }

        for (var mi = 0; mi < arrayLength; mi++) {
            var propKey = methods[mi];
            // Javascript capture rules, will always set propKey to last item in array.
            // wrapping everything in a function forces a copy
            var methodName = propKey.charAt(0).toUpperCase() + propKey.slice(1);
            temp['ob' + methodName] = propKey;
            temp['findBy' + methodName] = PropKey(propKey);
        }
        return temp;
    };
    return creator;
});
