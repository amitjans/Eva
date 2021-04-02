eva.controller('audio', ['$scope', '$http', function ($scope, $http) {
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
        $http.get('/api/audio').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.details = function (id) {
        $http.get('/interaccion/audio?id=' + id).then(function successCallback(response) {
        }, function errorCallback(response) {
        });;
    }

    $scope.delete = function (id) {
        $http.delete('/api/audio/' + id).then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });;
    }

    $scope.dataTable = function (way = 0) {
        if (way == 0) {
            $scope.temp = [];
            for (let i = 0; i < $scope.listado.length; i++) {
                if (datafilter($scope.listado[i], $scope.q, 'nombre')) {
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

    $("div#drop").dropzone({ url: "/api/audio", acceptedFiles: '.wav', timeout: 100000 });
    $scope.list();
}]);