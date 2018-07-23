(function () {
    var app = angular.module('restaurantSystem', ['ngTable']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '~/Views/Shared/_LayoutAngular.html',
                controller: 'layoutController'
            })
            .when('/restaurant', {
                templateUrl: '~/Views/Shared/_LayoutAngular.html',
                controller: 'restaurantListController'
            });
    });
    app.factory('getUrlAPI', function ($httpParamSerializer) {
        function getUrlAPI(url, params) {
            url = 'http://localhost:7317/api' + (url[0] === '/') ? url : '/' + url;

            var serializedParams = $httpParamSerializer(params);

            if (serializedParams.length > 0) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + serializedParams;
            }

            return url;
        }

        return getUrlAPI;
    });

}());