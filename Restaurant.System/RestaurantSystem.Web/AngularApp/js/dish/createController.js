(function (app) {
    var dishCreateController = function ($scope, $http, $window) {
        $scope.TitlePage = 'Cadastro de Pratos';
        $scope.restaurantId = 0;
        $scope.IsNewRestaurant = true;
        function getAll() {
            $http.get('http://localhost:7317/api/Restaurant').then(successCallback, errorCallback);
        }
        $scope.createDish = function () {
            const dish = new Object();
            dish.Id = -1;
            dish.Name = $scope.name;
            dish.Value = $scope.value;
            dish.RestaurantId = $scope.restaurantId;
            if ($scope.IsNewRestaurant) {
                $.post("http://localhost:7317/api/Dish",
                    dish,
                    function (data, status) {
                        successPostCallback({ data: data, statusText: (status === 'success') ? 'OK' : status });
                    });
            } else {
                const id = getUrlId($window.location.href);
                $http.put('http://localhost:7317/api/dish/' + id, { Id: $scope.id, Name: $scope.name }).then(successPostCallback, errorCallback);
            }
        };
        function successCallback(response) {
            if (response.statusText === 'OK') {
                $scope.restaurants = response.data;
            }
        }
        function successIdCallback(response) {
            if (response.statusText === 'OK') {
                $scope.restaurantId = response.data.RestaurantId;
            }
        }
        function errorCallback(error) {
            if (error) {
                $scope.messages = error;
            }
        }
        function successPostCallback(response) {
            if (response.statusText === 'OK')
                $window.location.href = '/Dish';
        };
        function getId(id) {
            $http.get('http://localhost:7317/api/Dish/' + id).then(successIdCallback, errorCallback);
        }
        function getUrlId(url) {
            if (/\/\d+$/i.test(url)) {
                return /\/(\d+)$/i.exec(url)[1];
            }
            return 'NONE';
        }
        function load() {
            const id = getUrlId($window.location.href);
            if (id !== 'NONE') {
                getId(id);
                $scope.IsNewRestaurant = false;
            } else {
                $scope.id = '';
                $scope.name = '';
            }
        }
        getAll();
    };
    app.controller('dishCreateController', dishCreateController);
}(angular.module("restaurantSystem", [])))