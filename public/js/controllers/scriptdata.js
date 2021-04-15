eva.controller('scriptdata', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;
    $scope.limit = '10';
    $scope.page = 0;
    $scope.maxpage = 0;
    $scope.from = 1;
    $scope.to = 10;
    $scope.q = '';

    $scope.list = function () {
        $http.get('/api/script/data/' + $scope.script).then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.slist = function () {
        $http.get('/api/common?db=script').then(function successCallback(response) {
            $scope.slistado = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { campo1: $scope.c1, campo2: $scope.c2, campo3: $scope.c3, campo4: $scope.c4, script: $scope.script };
        $http.post('/api/common?db=scriptdata', json).then(function successCallback(response) {
            $scope.c1 = '';
            $scope.c2 = '';
            $scope.c3 = '';
            $scope.c4 = '';
            $('#myModal').modal('hide');
            $scope.list();
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.c1 = l.campo1;
        $scope.c2 = l.campo2;
        $scope.c3 = l.campo3;
        $scope.c4 = l.campo4;
        $scope.icon = false;
        $scope.accion = 'Editar';
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { campo1: $scope.c1, campo2: $scope.c2, campo3: $scope.c3, campo4: $scope.c4 };
        $http.put('/api/common/' + $scope.updateid + '?db=scriptdata', json).then(function successCallback(response) {
            $scope.c1 = '';
            $scope.c2 = '';
            $scope.c3 = '';
            $scope.c4 = '';
            $scope.icon = true;
            $('#myModal').modal('hide');
            $scope.list();
            $scope.accion = 'Agregar';
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/common/' + id + '?db=scriptdata').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.speak = function (value) {
        $http.get('/speak?speak=' + value).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'campo1', 'campo2');
        Object.assign($scope, obj);
    }

    $scope.slist();
}]);