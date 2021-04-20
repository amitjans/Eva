eva.controller('audio', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    Object.assign($scope, dataTableValues());

    $scope.list = function () {
        $http.get('/api/audio').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.details = function (id) {
        $http.post('/nodes', { type: 'sound', src: id }).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/audio/' + id).then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre');
        Object.assign($scope, obj);
    }

    $("div#drop").dropzone({ url: "/api/audio", acceptedFiles: '.wav', timeout: 100000 });
    $scope.list();
}]);