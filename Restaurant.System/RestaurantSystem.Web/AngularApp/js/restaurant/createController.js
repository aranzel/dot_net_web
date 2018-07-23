(function (app) {
    var restaurantCreateController = function ($scope, $http, $window) {
        $scope.TitlePage = 'Cadastro de Restaurante';
        $http.defaults.headers.post["Content-Type"] = "application/json";
        $scope.IsNewRestaurant = true;
        $scope.createRestaurant = function () {
            const restaurant = new Object();
            restaurant.Id = -1;
            restaurant.Name = $scope.name;
            if ($scope.IsNewRestaurant) {
                $.post("http://localhost:7317/api/Restaurant",
                    restaurant,
                    function (data, status) {
                        successPostCallback({ data: data, statusText: (status === 'success') ? 'OK' : status });
                    });
            } else {
                const id = getUrlId($window.location.href);
                $http.put('http://localhost:7317/api/Restaurant/' + id , { Id: $scope.id, Name: $scope.name }).then(successPostCallback, errorCallback);
            }
        };
        function getId(id) {
            $http.get('http://localhost:7317/api/Restaurant/' + id).then(successCallback, errorCallback);
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

        function successCallback(response) {
            if (response.statusText === 'OK') {
                $scope.id = response.data.Id;
                $scope.name = response.data.Name;
            }
        };
        function successPostCallback(response) {
            if (response.statusText === 'OK')
                $window.location.href = '/Restaurant';
        };
        function errorCallback(error) {
            if (error) {
                $scope.messages = error;
            }
        };
        load();
    };
    app.controller('restaurantCreateController', restaurantCreateController);
}(angular.module("restaurantSystem", [])))