eva.controller('cloud', ['$scope', '$http', function ($scope, $http) {
    $scope.list = [];
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;

    $scope.index = function () {
        $http.get('/api/cloud').then(function successCallback(response) {
            $scope.listado = [];
            for (let i = 0; i < response.data.length; i++) {
                let l = response.data[i];
                $scope.listado.push({ service: l.service, rowspan: l.keys.length, 
                    key: l.keys[0].key, value: l.keys[0].value, color: (l.level == 100 ? 'green' : 'red'), icon: (l.level == 100 ? 'check' : 'times') });
                if (l.keys.length > 1) {
                    for (let j = 1; j < l.keys.length; j++) {
                        $scope.listado.push({ service: l.service, key: l.keys[j].key, value: l.keys[j].value, before: true });
                    }
                }
            }
        }, function errorCallback(response) {
        });
    }

    $scope.modal = function (key, value) {
        $scope.key = key;
        $scope.value = value;
        $('#myModal').modal('show');
    }

    $scope.update = function () {
        var json = { key: $scope.key, value: $scope.value };
        $http.put('/api/cloud', json).then(function successCallback(response) {
            $('#myModal').modal('hide');
            $scope.index();
            notify(response.data.message);
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.put('/api/cloud', { key: id, value: '' }).then(function successCallback(response) {
            $scope.index();
        }, function errorCallback(response) {
        });
    }

    $scope.index();
}]);