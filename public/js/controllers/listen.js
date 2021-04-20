eva.controller('listen', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    Object.assign($scope, dataTableValues());

    $scope.list = function () {
        $http.get('/api/common?db=googlestt').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { idioma: $scope.idioma, codigo: $scope.codigo, watson: $scope.watson };
        $http.post('/api/common?db=googlestt', json).then(function successCallback(response) {
            $scope.idioma = '';
            $scope.codigo = '';
            $scope.watson = '';
            $scope.nombre = '';
            $('#myModal').modal('hide');
            $scope.list();
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.idioma = l.idioma;
        $scope.codigo = l.codigo;
        $scope.watson = l.watson;
        $scope.icon = false;
        $scope.accion = 'Editar';
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { idioma: $scope.idioma, codigo: $scope.codigo, watson: $scope.watson };
        $http.put('/api/common/' + $scope.updateid + '?db=googlestt', json).then(function successCallback(response) {
            $scope.idioma = '';
            $scope.codigo = '';
            $scope.watson = '';
            $scope.icon = true;
            $('#myModal').modal('hide');
            $scope.list();
            $scope.accion = 'Agregar';
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/common/' + id + '?db=googlestt').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }
    
    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'codigo', 'watson', 'idioma');
        Object.assign($scope, obj);
    }

    $scope.list();
}]);