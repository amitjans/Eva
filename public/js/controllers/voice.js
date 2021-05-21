eva.controller('voice', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    $scope.accion = locale().COMMON.ADD;
    Object.assign($scope, dataTableValues());

    $scope.list = function () {
        $http.get('/api/common?db=voice').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        var json = { idioma: $scope.idioma, codigo: $scope.codigo, nombre: $scope.nombre };
        $http.post('/api/common?db=voice', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().VOICE.NOTIFY.POST.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().VOICE.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.idioma = l.idioma;
        $scope.codigo = l.codigo;
        $scope.nombre = l.nombre;
        $scope.icon = false;
        $scope.accion = locale().COMMON.EDIT;
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { idioma: $scope.idioma, codigo: $scope.codigo, nombre: $scope.nombre };
        $http.put('/api/common/' + $scope.updateid + '?db=voice', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().VOICE.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().VOICE.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/common/' + id + '?db=voice').then(function successCallback(response) {
            $scope.list();
            notify(locale().VOICE.NOTIFY.DELETE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().VOICE.NOTIFY.ERROR,  'danger');
        });;
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre', 'codigo', 'idioma');
        Object.assign($scope, obj);
    }

    $scope.clear = function () {
        Object.assign($scope, { idioma: '', codigo: '', nombre: '', icon: true, accion: locale().COMMON.ADD });
        $('#myModal').modal('hide');
        $scope.list();
    }

    $scope.list();
}]);