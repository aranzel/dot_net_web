(function (app) {
    var layoutController = function ($scope) {
        $scope.myNumber = 1;

        $scope.go = function () {
            $scope.myNumber = $scope.myNumber + 1;
            console.log("hit");
        };
    };
    app.controller('layoutController', layoutController);
}(angular.module("restaurantSystem", [])))