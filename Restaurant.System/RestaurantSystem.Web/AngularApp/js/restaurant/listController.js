(function (app) {
    var restaurantListController = function ($scope, $http) {
        $scope.TitlePage = 'Restaurantes';
        function getAll() {
            $http.get('http://localhost:7317/api/Restaurant').then(successCallback, errorCallback);
        }
        function getName(name) {
            $http.get('http://localhost:7317/api/Restaurant/SearchByName/?name=' + name).then(successCallback, errorCallback);
        }
        
        function successCallback(response) {
            if (response.statusText === 'OK')
                $scope.restaurants = response.data;
        }
        function errorCallback(error) {
            if (error) {
                $scope.messages = error;
            }
        }
        $scope.searchRestaurant = function () {
            if ($scope.name === undefined || $scope.name === '')
                getAll();
            else
                getName($scope.name);
        };
        getAll();
    };
    app.controller('restaurantListController', restaurantListController);
}(angular.module("restaurantSystem", [])))