(function (app) {
    var dishListController = function ($scope, $http) {
        $scope.TitlePage = 'Pratos';
        function getAll() {
            $http.get("http://localhost:7317/api/Dish/List").then(successCallback, errorCallback);
        }
        function successCallback(response) {
            if (response.statusText === 'OK')
                $scope.dishes = response.data;
        }
        function errorCallback(error) {
            if (error) {
                $scope.messages = error;
            }
        }
        getAll();
    };
    app.controller('dishListController', dishListController);
}(angular.module("restaurantSystem", [])))