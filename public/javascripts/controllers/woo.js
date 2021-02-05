eva.controller('woo', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.temp = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;

    $scope.z = 0;
    $scope.wooid = '';
    $scope.commands = [];
    $scope.orden = [];

    $scope.list = function () {
        $http.get('/api/common?db=woo').then(function successCallback(response) {
            $scope.listado = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.loadcomands = function () {
        for (let i = 0; i < $scope.slistado.length; i++) {
            if ($scope.slistado[i]._id == $scope.wooid) {
                $scope.commands = $scope.slistado[i].command;
                $scope.orden = $scope.slistado[i].orden;
            }
        }
        $('#0').css('color', 'yellow');
    }

    $scope.execute = function name(params) {
        $('#' + $scope.z).css('color', 'black');
        $scope.z++;
        $('#' + $scope.z).css('color', 'yellow');
    }

    $scope.create = function (nombre) {
        $http.post('/api/common?db=woo', { name: nombre, command: [], orden: [] }).then(function successCallback(response) {
            $scope.list();
            $scope.wooid = response.data.obj._id;
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
        $http.put('/api/common/' + $scope.updateid + '?db=woo', json).then(function successCallback(response) {
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
        $http.delete('/api/common/' + id + '?db=woo').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.speak = function (value) {
        $http.get('/speak?speak=' + value).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
    }

    $scope.list();
}]);