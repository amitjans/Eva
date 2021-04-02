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
        if (way == 0) {
            $scope.temp = [];
            for (let i = 0; i < $scope.listado.length; i++) {
                if (datafilter($scope.listado[i], $scope.q, 'campo1', 'campo2')) {
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

    $scope.slist();
}]);