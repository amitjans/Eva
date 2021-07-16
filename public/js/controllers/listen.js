eva.controller('listen', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    $scope.accion = locale().COMMON.ADD;
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
            $scope.clear();
            notify(locale().LISTEN.NOTIFY.POST.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().LISTEN.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.update = function (l) {
        $scope.updateid = l._id;
        $scope.idioma = l.idioma;
        $scope.codigo = l.codigo;
        $scope.watson = l.watson;
        $scope.icon = false;
        $scope.accion = locale().COMMON.EDIT;
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        var json = { idioma: $scope.idioma, codigo: $scope.codigo, watson: $scope.watson };
        $http.put('/api/common/' + $scope.updateid + '?db=googlestt', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().LISTEN.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().LISTEN.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.clear = function () {
        Object.assign($scope, { idioma: '', codigo: '', watson: '', icon: true, accion: locale().COMMON.ADD })
        $('#myModal').modal('hide');
        $scope.list();
    }

    $scope.delete = function (id) {
        if (confirm(locale().COMMON.DELETE)) {
            $http.delete('/api/common/' + id + '?db=googlestt').then(function successCallback(response) {
                $scope.list();
                notify(locale().LISTEN.NOTIFY.DELETE.SUCCESS);
            }, function errorCallback(response) {
                notify(locale().LISTEN.NOTIFY.ERROR, 'danger');
            });
        }
    }
    
    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'codigo', 'watson', 'idioma');
        Object.assign($scope, obj);
    }

    $scope.list();
}]);