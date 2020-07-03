eva.controller('audio', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/audio').then(function successCallback(response) {
            $scope.listado = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.details = function (id) {
        $http.get('/interaccion/audio?id=' + id).then(function successCallback(response) {
        }, function errorCallback(response) {
        });;
    }

    $scope.delete = function (id) {
        $http.delete('/api/audio/' + id).then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.list();
}]);