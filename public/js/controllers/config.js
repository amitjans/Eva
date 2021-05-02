eva.controller('config', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.led = [];
    $scope.sttlist = [];
    $scope.temp = [];
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/common?db=voice').then(function successCallback(response) {
            $scope.listado = response.data;
            $http.get('/api/config').then(function successCallback(response) {
                $scope.nombre = response.data.name;
                $scope.voice = response.data.voice;
                $scope.voiceled = response.data.voiceled._id;
                $scope.listen = response.data.listen._id;
                $scope.listenled = response.data.listenled._id;
            }, function errorCallback(response) {
            });
        }, function errorCallback(response) {
        });
        $http.get('api/common?db=led').then(function successCallback(response) { 
            $scope.led = response.data;
        }, function errorCallback(response) {
        });
        $http.get('/api/common?db=googlestt').then(function successCallback(response) {
            $scope.sttlist = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.update = function () {
        var json = { name: $scope.nombre, voice: $scope.voice, 
            voiceled: $scope.led.filter(x => x._id == $scope.voiceled)[0], 
            listen: $scope.sttlist.filter(x => x._id == $scope.listen)[0],
            listenled: $scope.led.filter(x => x._id == $scope.listenled)[0]
        };
        $http.put('/api/config', json).then(function successCallback(response) {
            $scope.list();
            notify('Se ha aplicado la configuración correctamente.');
        }, function errorCallback(response) {
            notify('ha ocurrido un error al intentar aplicar la configuración.');
        });
    }

    $scope.list();
}]);