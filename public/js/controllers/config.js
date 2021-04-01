eva.controller('config', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/common?db=voice').then(function successCallback(response) {
            $scope.listado = response.data;
            $http.get('/api/config').then(function successCallback(response) {
                $scope.nombre = response.data.name;
                $scope.voice = response.data.voice;
            }, function errorCallback(response) {
            });
        }, function errorCallback(response) {
        });
    }

    $scope.update = function () {
        var json = { name: $scope.nombre, voice: $scope.voice };
        $http.put('/api/config', json).then(function successCallback(response) {
            $scope.list();
            notify('Se ha aplicado la configuración correctamente.');
        }, function errorCallback(response) {
            notify('ha ocurrido un error al intentar aplicar la configuración.');
        });
    }

    $scope.list();
}]);