eva.controller('led', ['$scope', '$http', function ($scope, $http) {
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
        $http.get('/api/common?db=led').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { nombre: $scope.nombre, codigo: $scope.codigo };
        $http.post('/api/common?db=led', json).then(function successCallback(response) {
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
        $http.put('/api/common/' + $scope.updateid + '?db=led', json).then(function successCallback(response) {
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
        $http.delete('/api/common/' + id + '?db=led').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.dataTable = function (way = 0) {
        if (way == 0) {
            $scope.temp = [];
            for (let i = 0; i < $scope.listado.length; i++) {
                if ($scope.listado[i].nombre.toLowerCase().includes($scope.q.toLowerCase()) || $scope.listado[i].codigo.toLowerCase().includes($scope.q.toLowerCase())) {
                    $scope.temp.push($scope.listado[i]);
                }
            }
            $scope.maxpage = ($scope.temp.length % $scope.limit == 0 ? $scope.temp.length / $scope.limit : Math.ceil($scope.temp.length / $scope.limit));
        } else {
            if ($scope.page + way < 0 || $scope.page + way >= $scope.maxpage) {
                return;
            } else {
                $scope.page += way;
                $scope.from = $scope.page == 0 ? 1 : (($scope.page * $scope.limit) + 1);
                $scope.to = $scope.from + parseInt($scope.limit) - 1;
            }
        }

        $scope.to = ($scope.temp.length < $scope.to) ? $scope.temp.length : $scope.limit * ($scope.page + 1);

        $scope.sublist = $scope.temp.slice($scope.from - 1, $scope.to);
    }

    $scope.list();
}]);