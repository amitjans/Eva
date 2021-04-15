eva.controller('mov', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    $scope.limit = '10';
    $scope.page = 0;
    $scope.maxpage = 0;
    $scope.from = 1;
    $scope.to = 10;
    $scope.q = '';

    $scope.list = function () {
        $http.get('/api/common?db=mov').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { nombre: $scope.nombre, codigo: $scope.codigo };
        $http.post('/api/common?db=mov', json).then(function successCallback(response) {
            $scope.nombre = '';
            $scope.codigo = '';
            $('#myModal').modal('hide');
            $scope.list();
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.nombre = l.nombre;
        $scope.codigo = l.codigo;
        $scope.icon = false;
        $scope.accion = 'Editar';
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { nombre: $scope.nombre, codigo: $scope.codigo };
        $http.put('/api/common/' + $scope.updateid + '?db=mov', json).then(function successCallback(response) {
            $scope.nombre = '';
            $scope.codigo = '';
            $scope.icon = true;
            $('#myModal').modal('hide');
            $scope.list();
            $scope.accion = 'Agregar';
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/common/' + id + '?db=mov').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre', 'codigo');
        Object.assign($scope, obj);
    }

    $scope.list();
}]);