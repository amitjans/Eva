var eva = angular.module('evaApp', []);
eva.controller('script', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
      $http.get('/api/script').then(function successCallback(response) {
          $scope.listado = response.data;
          $scope.listado.forEach(element => {
            element.data = JSON.parse(element.data);
          });
      }, function errorCallback(response) {
      });
    }

    $scope.create = function () {
      var json = { nombre: $scope.nombre, data: JSON.parse($scope.data.replace(/[\n\t]+/gi,''))};
      $http.post('/api/script', json).then(function successCallback(response) {
        $scope.nombre = '';
        $scope.data = '';
        $('#myModal').modal('hide');
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.prepare = function () {
        let temp = $scope.data.split('\n');
        if ($scope.multi) {
          $scope.data = '[';
          for (let i = 0; i < temp.length; i++) {
            $scope.data += '\n\t{ "hablar": "' + temp[i] + '", "respuesta": "' + temp[i+1] + '"},';
            i++;
          }
          $scope.data = $scope.data.substring(0, $scope.data.length - 1) + '\n]';
        } else {
          $scope.data = '[\n\t{ "hablar": "' +  temp.join('"},\n\t{ "hablar": "') + '"}\n]';
        }
    }

    $scope.update = function (l) {
      $scope.nombre = l.nombre;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      $scope.data = JSON.stringify(l.data).replace('[', '[\n\t').replace(/},/gi, '},\n\t').replace(']', '\n]');
      $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
      var json = { nombre: $scope.nombre, data: JSON.parse($scope.data.replace(/[\n\t]+/gi,''))};
      $http.put('/api/script/' + $scope.updateid, json).then(function successCallback(response) {
        $scope.nombre = '';
        $scope.data = '';
        $scope.icon = true;
        $('#myModal').modal('hide');
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/script/' + id).then(function successCallback(response) {
        $scope.list();
      }, function errorCallback(response) {
      });;
    }
    
    $scope.multi = false;
    $scope.list();
  }]);