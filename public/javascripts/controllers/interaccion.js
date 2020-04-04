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
      var json = { nombre: $scope.nombre, data: { node: node, link: link }};
      $http.post('/api/interaccion', json).then(function successCallback(response) {
        $scope.reset();
        $scope.list();
      }, function errorCallback(response) {
        $scope.format();
      });
    }

    $scope.update = function (l) {
      $scope.nombre = l.nombre;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Editar';
      var data = JSON.parse(l.data);
      node = data.node;
      link = data.link;
      $scope.node = node;
      id = 0;
      node.forEach(element => {
        if (id < element.key) {
          id = element.key;
        }
      });
      id++;
      reload();
    }

    $scope.updatesend = function () {
      //$scope.xml = $scope.xml.replace(/\n/gi, '').replace(/\t/gi, '').replace(/\r/gi, '');
      var json = { nombre: $scope.nombre, data: { node: node, link: link }};
      $http.put('/api/interaccion/' + $scope.updateid, json).then(function successCallback(response) {
        $scope.updateid = '';
        $scope.accion = 'Agregar';
        $scope.icon = true;
        $scope.reset();
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.delete = function (id) {
      $http.delete('/api/interaccion/' + id).then(function successCallback(response) {
        $scope.list();
      }, function errorCallback(response) {
      });;
    }

    $scope.reset = function () {
      $scope.nombre = '';
      node = [];
      link = [];
      reload();
    }

    $scope.actualizar = function () {
      $scope.node = node;
      reload();
    }

    $scope.setemocion = function () {
      var color = "lightgray";
      switch ($scope.emocion) {
        case 'joy':
          color = "lightyellow";
          break;
        case 'sad':
          color = "lightblue";
          break;
        case 'surprised':
          color = 'lightgreen';
          break;
        case 'anger':
          color = "red";
          break;
        default:
          break;
      }
      node.push({ key: id, name: "Emoción_" + id, type: "emotion", emotion: $scope.emocion, level: $scope.nivel, speed: $scope.velocidad, color: color, isGroup: false, group: $scope.group });
      $scope.node = node;
      //if (!!$scope.link || $scope.link !== '') {
        link.push({ from: $scope.link, to: id });
      //}
      id++;
      reload();
      $("#myModal").modal('hide');
    }

    $scope.setspeak = function () {
      node.push({ key: id, name: "Hablar_" + id, type: "speak", text: $scope.texto, color: "lightblue", isGroup: false, group: $scope.group });
      $scope.node = node;
      if (!!$scope.link || $scope.link !== '') {
        link.push({ from: $scope.link, to: id });
      }
      id++;
      reload();
      $("#myModalSpeak").modal('hide');
    }

    $scope.setlisten = function () {
      node.push({ key: id, name: "Escuchar_" + id, type: "listen", color: "lightblue", isGroup: false, group: $scope.group });
      $scope.node = node;
      if (!!$scope.link || $scope.link !== '') {
        link.push({ from: $scope.link, to: id });
      }
      id++;
      reload();
      $("#myModalListen").modal('hide');
    }
    
    $scope.setsleep = function () {
      node.push({ key: id, name: "Esperar_" + id, type: "wait", color: "lightblue", isGroup: false, group: $scope.group });
      $scope.node = node;
      if (!!$scope.link || $scope.link !== '') {
        link.push({ from: $scope.link, to: id });
      }
      id++;
      reload();
      $("#myModalWait").modal('hide');
    }

    $scope.setfor = function () {
      node.push({ key: id, name: "Ciclo_" + id, type: "for", iteraciones: $scope.it, color: "lightblue", isGroup: true, group: $scope.group });
      $scope.node = node;
      if (!!$scope.link || $scope.link !== '') {
        link.push({ from: $scope.link, to: id });
      }
      id++;
      reload();
      $("#myModalFor").modal('hide');
    }

    $scope.list();
  }]);