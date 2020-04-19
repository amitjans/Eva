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

  $scope.slist = function () {
    $http.get('/api/script').then(function successCallback(response) {
      $scope.slistado = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.soundlist = function () {
    $http.get('/api/audio').then(function successCallback(response) {
      $scope.soundlistado = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.create = function () {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.post('/api/interaccion', json).then(function successCallback(response) {
      $scope.reset();
      $scope.list();
      id = 0;
    }, function errorCallback(response) {
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
      if (id < parseInt(element.name.split('_')[1])) {
        id = parseInt(element.name.split('_')[1]);
      }
    });
    id++;
    reload();
  }

  $scope.updatesend = function () {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.put('/api/interaccion/' + $scope.updateid, json).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.updatesendx = function () {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.put('/api/interaccion/' + $scope.updateid, json).then(function successCallback(response) {
      $scope.updateid = '';
      $scope.accion = 'Agregar';
      $scope.icon = true;
      $scope.reset();
      $scope.list();
      id = 0;
    }, function errorCallback(response) {
    });
  }

  $scope.delete = function (id) {
    $http.delete('/api/interaccion/' + id).then(function successCallback(response) {
      $scope.list();
    }, function errorCallback(response) {
    });;
  }

  $scope.add = function () {
      $scope.updateid = '';
      $scope.accion = 'Agregar';
      $scope.icon = true;
      $scope.reset();
      $scope.list();
      id = 0;
  }

  $scope.unified = function (id) {
    $http.get('/interaccion/unified?id=' + id).then(function successCallback(response) {
      $scope.list();
    }, function errorCallback(response) {
    });
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

  $scope.common = function (identifier) {
    $scope.node = node;
    $scope.texto = '';
    if (!!$scope.link) {
      link.push({ from: parseInt($scope.link), to: identifier });
    }
    $scope.link = '' + identifier;
    id++;
    reload();
    $("#myModal").modal('hide');
  }

  $scope.showmodal = function (value) {
    switch (value) {
      case 1:
        $scope.ModalName = 'Emoción';
        break;
      case 2:
        $scope.ModalName = 'Hablar';
        break;
      case 3:
        $scope.ModalName = 'Escuchar';
        break;
      case 4:
        $scope.ModalName = 'Tiempo';
        break;
      case 5:
        $scope.ModalName = 'Ciclo';
        break;
      case 6:
        $scope.ModalName = 'Condición';
        break;
      case 7:
        $scope.ModalName = 'Movimiento';
        break;
      case 8:
        $scope.ModalName = 'Interacción';
        break;
      case 9:
        $scope.ModalName = 'Script';
        break;
      default:
        break;
    }
    $scope.modal = value;
    $("#myModal").modal('show');
  }

  $scope.setnode = function () {
    switch ($scope.modal) {
      case 1:
        $scope.setemocion();
        break;
      case 2:
        node.push({ key: Date.now(), name: "Hablar_" + id, type: "speak", text: $scope.texto, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 3:
        node.push({ key: Date.now(), name: "Escuchar_" + id, type: "listen", color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 4:
        node.push({ key: Date.now(), name: "Esperar_" + id, type: "wait", color: "lightblue", time: $scope.time, isGroup: false, group: $scope.group });
        break;
      case 5:
        node.push({ key: Date.now(), name: "Ciclo_" + id, type: "for", iteraciones: $scope.it, color: "lightblue", isGroup: true, group: $scope.group });
        break;
      case 6:
        node.push({ key: Date.now(), name: "Condición_" + id, type: "if", text: $scope.texto, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 7:
        node.push({ key: Date.now(), name: "Movimiento_" + id, type: "mov", mov: $scope.movement, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 8:
        $scope.setint();
        break;
      case 9:
        node.push({ key: Date.now(), name: "Script_" + id, type: "script", sc: $scope.thescript, random: $scope.rs, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 10:
        node.push({ key: Date.now(), name: "Audio_" + id, type: "sound", src: $scope.thesound, wait: $scope.waitsound, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      default:
        break;
    }
    $scope.common(node[node.length - 1].key);
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
    node.push({ key: Date.now(), name: "Emoción_" + id, type: "emotion", emotion: $scope.emocion, level: ($scope.nivel ? 2 : 0), speed: $scope.velocidad, color: color, isGroup: false, group: $scope.group });
  }

  $scope.setint = function () {
    let temp = '';
    switch ($scope.int) {
      case '0':
        temp = 'Obtener Nombre';
        break;
      case '1':
        temp = 'Ultimatum';
        break;
      case '2':
        temp = 'Coches Autonomos';
        break;
      case '3':
        temp = 'Preguntas y Respuestas';
        break;
      case '4':
        temp = 'Platica';
        break;
      default:
        $scope.listado.forEach(element => {
          if (element._id === $scope.int) {
            temp = element.nombre;
          }
        });
        break;
    }
    node.push({ key: Date.now(), name: temp, type: "int", int: $scope.int, color: "lightblue", isGroup: false, group: $scope.group });
  }

  $scope.list();
  $scope.slist();
  $scope.soundlist();
  $scope.rs = false;
  $scope.nivel = false;
  $scope.waitsound = false;
}]);