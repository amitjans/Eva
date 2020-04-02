var eva = angular.module('evaApp', []);
eva.controller('interaccion', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
      $http.get('/api/interaccion').then(function successCallback(response) {
          $scope.listado = response.data;
      }, function errorCallback(response) {
      });
    }

    $scope.create = function () {
      $scope.xml = $scope.xml.replace(/\n/gi, '').replace(/\t/gi, '').replace(/\r/gi, '');
      console.log($scope.xml);
      var json = '{ "nombre": "' + $scope.nombre + '", "xml": "' + $scope.xml + '" }';
      $http.post('/api/interaccion', json).then(function successCallback(response) {
        $scope.nombre = '';
        $scope.xml = '';
        $scope.list();
      }, function errorCallback(response) {
        $scope.format();
      });
    }

    $scope.update = function (l) {
      $scope.nombre = l.nombre;
      $scope.xml = l.xml;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      $scope.format();
      //up();
    }

    $scope.updatesend = function () {
      $scope.xml = $scope.xml.replace(/\n/gi, '').replace(/\t/gi, '').replace(/\r/gi, '');
      var json = '{ "nombre": "' + $scope.nombre + '", "xml": "' + $scope.xml + '" }';
      $http.put('/api/interaccion/' + $scope.updateid, json).then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.nombre = '';
        $scope.xml = '';
        $scope.list();
      }, function errorCallback(response) {
        $scope.format();
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/interaccion/' + id).then(function successCallback(response) {
        //notify(response.data.mensaje);
        $scope.list();
        //up();
      }, function errorCallback(response) {
        //notify(response.data.mensaje);
      });;
    }

    $scope.format = function () {
      var formatted = '', indent= '';
      var xml = $scope.xml;
      var tab = '\t';
      xml.split(/>\s*</).forEach(function(node) {
          if (node.match( /^\/\w/ )) indent = indent.substring(tab.length);
          formatted += indent + '<' + node + '>\r\n';
          if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;
      });
      $scope.xml = formatted.substring(1, formatted.length-3);
    }

    $scope.setemocion = function () {
      $scope.xml = ($scope.xml || '') + "<emotion><category name='" + $scope.emocion + "' value='" + $scope.nivel + "' speed='" + $scope.velocidad + "' />";
      if (!!$scope.texto || $scope.texto != '') {
        $scope.xml += "<speak>" + $scope.texto + "</speak>";
      }
      $scope.xml += "</emotion>";
      $scope.format();
    }

    $scope.setlisten = function () {
      $scope.xml = ($scope.xml || '') + '<listen></listen>';
      $scope.format();
    }

    $scope.list();
  }]);