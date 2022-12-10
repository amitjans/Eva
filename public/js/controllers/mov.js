eva.controller('mov', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    $scope.accion = locale().COMMON.ADD;
    Object.assign($scope, dataTableValues());
    $scope.codes = [];

    $scope.list = function () {
        $http.get('/api/common?db=mov').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.codes = function () {
        $http.get('/api/mov').then(function successCallback(response) {
            $scope.codes = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.execute = function (l) {
        $http.post('/nodes', { type: 'mov', mov: l.codigo }).then(function successCallback(response) {
        }, function errorCallback(response) {
            notify(locale().MOVEMENT.NOTIFY.ERROR,  'danger');
        });;
    }

    $scope.uploadcloud = function () {
        $http.post('https://eva-repository.herokuapp.com/api/mov/import', $scope.listado).then(function successCallback(response) {
            $scope.clear();
            notify(locale().SCRIPT_DATA.NOTIFY.POST.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().SCRIPT_DATA.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.create = function () {
        var json = { nombre: $scope.nombre, codigo: $scope.codigo };
        $http.post('/api/common?db=mov', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().MOVEMENT.NOTIFY.POST.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().MOVEMENT.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.nombre = l.nombre;
        $scope.codigo = l.codigo;
        $scope.icon = false;
        $scope.accion = locale().COMMON.EDIT;
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { nombre: $scope.nombre, codigo: $scope.codigo };
        $http.put('/api/common/' + $scope.updateid + '?db=mov', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().MOVEMENT.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().MOVEMENT.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.delete = function (id) {
        if (confirm(locale().COMMON.DELETE)) {
            $http.delete('/api/common/' + id + '?db=mov').then(function successCallback(response) {
                $scope.list();
                notify(locale().MOVEMENT.NOTIFY.DELETE.SUCCESS);
            }, function errorCallback(response) {
                notify(locale().MOVEMENT.NOTIFY.ERROR, 'danger');
            });
        }
    }

    $scope.addCode = function (value) {
        $scope.codigo = ($scope.codigo || '') + value;
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre', 'codigo');
        Object.assign($scope, obj);
    }

    $scope.clear = function () {
        Object.assign($scope, { nombre: '', codigo: '', icon: true, accion: locale().COMMON.ADD });
        $('#myModal').modal('hide');
        $scope.list();
    }

    $scope.list();
    $scope.codes();
}]);

eva.filter('trusted', ['$sce', function($sce) {
    var div = document.createElement('div');
    return function(text) {
        div.innerHTML = text;
        return $sce.trustAsHtml(div.textContent);
    };
}])