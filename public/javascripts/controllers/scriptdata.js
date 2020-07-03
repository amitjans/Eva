eva.controller('scriptdata', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/script/data/' + $scope.script).then(function successCallback(response) {
            $scope.listado = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.slist = function () {
        $http.get('/api/script').then(function successCallback(response) {
            $scope.slistado = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { campo1: $scope.c1, campo2: $scope.c2, script: $scope.script };
        $http.post('/api/scriptdata', json).then(function successCallback(response) {
            $scope.c1 = '';
            $scope.c2 = '';
            $('#myModal').modal('hide');
            $scope.list();
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.c1 = l.campo1;
        $scope.c2 = l.campo2;
        $scope.icon = false;
        $scope.accion = 'Editar';
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { campo1: $scope.c1, campo2: $scope.c2 };
        $http.put('/api/scriptdata/' + $scope.updateid, json).then(function successCallback(response) {
            $scope.campo1 = '';
            $scope.campo2 = '';
            $scope.icon = true;
            $('#myModal').modal('hide');
            $scope.list();
            $scope.accion = 'Agregar';
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/scriptdata/' + id).then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.slist();
}]);