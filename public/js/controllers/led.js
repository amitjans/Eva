eva.controller('led', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    Object.assign($scope, dataTableValues());

    $scope.list = function () {
        $http.get('/api/common?db=led').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        if (confirm(locale().COMMON.DELETE)) {
            $http.delete('/api/common/' + id + '?db=led').then(function successCallback(response) {
                $scope.list();
                notify(locale().LED.NOTIFY.DELETE.SUCCESS);
            }, function errorCallback(response) {
                notify(locale().LED.NOTIFY.ERROR, 'danger');
            });
        }
    }

    $scope.execute = function (l) {
        $http.post('/nodes', { type: 'led', anim: l._id, base: l.base }).then(function successCallback(response) {
        }, function errorCallback(response) {
            notify(locale().LED.NOTIFY.ERROR, 'danger');
        });;
    }

    $scope.clear = function () {
        Object.assign($scope, { nombre: '', icon: true, accion: locale().COMMON.ADD });
        $('#myModal').modal('hide');
        $scope.list();
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'name');
        Object.assign($scope, obj);
    }

    $scope.list();
}]);