eva.controller('interaccion', ['$scope', '$http', function ($scope, $http) {
  $scope.listado = [];
  $scope.led = [];
  $scope.mov = [];
  $scope.accion = 'Agregar';
  $scope.icon = true;
  $scope.updateid;
  var modalname = ['', 'Emoción', 'Hablar', 'Escuchar', 'Tiempo', 'Ciclo', 'Condición', 'Movimiento', 'Interacción', 'Script', 'Audio', 'Animación Led', 'Voz', 'Contador', 'Api Rest'];

  $scope.list = function () {
    $http.get('/api/common?db=interaccion').then(function successCallback(response) {
      $scope.listado = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.slist = function () {
    $http.get('/api/common?db=script').then(function successCallback(response) {
      $scope.slistado = response.data;
    }, function errorCallback(response) {
    });
    $http.get('/api/common?db=voice').then(function successCallback(response) {
      $scope.vlistado = response.data;
    }, function errorCallback(response) {
    });
    $http.get('api/common?db=led').then(function successCallback(response) {
      $scope.led = response.data;
    }, function errorCallback(response) {
    });
    $http.get('/api/common?db=mov').then(function successCallback(response) {
      $scope.mov = response.data;
    }, function errorCallback(response) {
    });
    $http.get('/api/audio').then(function successCallback(response) {
      $scope.soundlistado = response.data;
    }, function errorCallback(response) {
    });
    $http.get('/api/filters').then(function successCallback(response) {
      $scope.filterslist = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.iniciarInteracciong = function (id) {
    $http.get('interaccion/iniciarInteracciong?id=' + id)
      .then(function (res) {
      }, function (error) {
        console.log(error);
      });
  };

  $scope.create = function () {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.post('/api/common?db=interaccion', json).then(function successCallback(response) {
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
    var data = l.data;
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
    $http.put('/api/common/' + $scope.updateid + '?db=interaccion', json).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.updatesendx = function () {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.put('/api/common/' + $scope.updateid + '?db=interaccion', json).then(function successCallback(response) {
      $scope.updateid = '';
      $scope.accion = 'Agregar';
      $scope.icon = true;
      $scope.reset();
      $scope.list();
      $scope.node = [];
      $('#inicio').click();
      id = 0;
    }, function errorCallback(response) {
    });
  }

  $scope.delete = function (id) {
    $http.delete('/api/common/' + id + '?db=interaccion').then(function successCallback(response) {
      $scope.list();
    }, function errorCallback(response) {
    });
  }

  $scope.add = function () {
    $scope.updateid = '';
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.reset();
    $scope.list();
    id = 0;
    $scope.node = [];
    $scope.key = 0;
    $('#inicio').click();
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
    $scope.listenopt = '';
    $scope.ifopt = '4';
    if (!!$scope.link) {
      link.push({ from: parseInt($scope.link), to: identifier });
    }
    $scope.link = '' + identifier;
    id++;
  }

  $scope.showmodal = function (value, nuevo = true) {
    if (nuevo) {
      $scope.key = 0;
    }
    $scope.ModalName = modalname[value];
    switch (value) {
      case 9:
        $scope.ncommon = 'Aleatorio';
        break;
      case 10:
        $scope.ncommon = 'Esperar';
        break;
      case 13:
        $scope.cnname = '';
        $scope.counters = [];
        let temp = node.filter(f => f.type === 'counter');
        temp.forEach(element => {
          if (!$scope.counters.includes(element.count)) {
            $scope.counters.push(element.count);
          }
        });
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
        node.push({ key: Date.now(), name: "Escuchar_" + id, type: "listen", opt: $scope.listenopt, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 4:
        node.push({ key: Date.now(), name: "Esperar_" + id, type: "wait", color: "lightblue", time: $scope.time, isGroup: false, group: $scope.group });
        break;
      case 5:
        node.push({ key: Date.now(), name: "Ciclo_" + id, type: "for", iteraciones: $scope.it, color: "lightblue", isGroup: true, group: $scope.group });
        break;
      case 6:
        node.push({ key: Date.now(), name: "Condición_" + id, type: "if", text: $scope.texto, opt: parseInt($scope.ifopt), color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 7:
        node.push({ key: Date.now(), name: "Movimiento_" + id, type: "mov", mov: $scope.movement, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 8:
        $scope.setint();
        break;
      case 9:
        node.push({ key: Date.now(), name: "Script_" + id, type: "script", sc: $scope.thescript, random: $scope.ccommon, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 10:
        node.push({ key: Date.now(), name: "Audio_" + id, type: "sound", src: $scope.thesound, wait: $scope.ccommon, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 11:
        node.push({ key: Date.now(), name: "Leds_" + id, type: "led", anim: $scope.leds, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 12:
        node.push({ key: Date.now(), name: "Voz_" + id, type: "voice", voice: $scope.voice, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 13:
        node.push({ key: Date.now(), name: "Contador_" + id, type: "counter", count: ($scope.cnname === '' ? $scope.cname : $scope.cnname), ops: $scope.ops, value: $scope.vcounter, color: "lightblue", isGroup: false, group: $scope.group });
        break;
      case 14:
        node.push({ key: Date.now(), name: "Api_" + id, type: "api", version: $scope.version, host: $scope.host, path: $scope.path, port: ($scope.port == 0 || !!!$scope.port ? '' : $scope.port), color: "lightblue", isGroup: false, group: $scope.group });
        break;
      default:
        break;
    }
    if ($scope.key == 0) {
      $scope.common(node[node.length - 1].key);
    } else {
      for (let i = 0; i < node.length; i++) {
        if (node[i].key === $scope.key) {
          node[node.length - 1].key = node[i].key;
          node[node.length - 1].name = node[i].name;
          node.splice(i, 1);
          $scope.key = 0;
          break;
        }
      }
      if (node[node.length - 1].type == 'speak') {
        $http.delete('/api/interaccion/rec/' + node[node.length - 1].key).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
      }
      $scope.node = node;
    }
    reload();
    $("#myModal").modal('hide');
  }

  $scope.setemocion = function () {
    var color = { joy: "lightyellow", sad: "lightblue", surprised: "lightgreen", anger: "red", ini: "lightgray" };
    node.push({ key: Date.now(), name: "Emoción_" + id, type: "emotion", emotion: $scope.emocion, level: parseInt($scope.level), speed: $scope.velocidad, color: color[$scope.emocion], isGroup: false, group: $scope.group });
  }

  $scope.setint = function () {
    let temp = '';
    $scope.listado.forEach(element => {
      if (element._id === $scope.int) {
        temp = element.nombre;
      }
    });
    node.push({ key: Date.now(), name: temp, type: "int", int: $scope.int, color: "lightblue", isGroup: false, group: $scope.group });
  }

  $scope.updatenode = function (l) {
    $scope.key = l.key;
    $scope.name = l.name;
    $scope.type = l.type;
    $scope.color = l.color;
    $scope.isGroup = l.isGroup;
    $scope.group = (l.group || '') + '';
    switch (l.type) {
      case 'emotion':
        $scope.emocion = l.emotion;
        $scope.velocidad = l.speed;
        $scope.level = l.level + '';
        $scope.showmodal(1, false);
        break;
      case 'speak':
        $scope.texto = l.text;
        $scope.showmodal(2, false);
        break;
      case 'listen':
        $scope.listenopt = l.opt;
        $scope.showmodal(3, false);
        break;
      case 'wait':
        $scope.time = l.time;
        $scope.showmodal(4, false);
        break;
      case 'for':
        $scope.it = l.iteraciones;
        $scope.showmodal(5, false);
        break;
      case 'if':
        $scope.texto = l.text;
        $scope.ifopt = '' + l.opt;
        $scope.showmodal(6, false);
        break;
      case 'mov':
        $scope.movement = l.mov;
        $scope.showmodal(7, false);
        break;
      case 'int':
        $scope.int = l.int;
        $scope.showmodal(8, false);
        break;
      case 'script':
        $scope.thescript = l.sc;
        $scope.ccommon = l.random;
        $scope.showmodal(9, false);
        break;
      case 'sound':
        $scope.thesound = l.src;
        $scope.ccommon = l.wait;
        $scope.showmodal(10, false);
        break;
      case 'led':
        $scope.leds = l.anim;
        $scope.showmodal(11, false);
        break;
      case 'voice':
        $scope.voice = l.voice;
        $scope.showmodal(12, false);
        break;
      case 'counter':
        $scope.ops = l.ops;
        $scope.vcounter = l.value;
        $scope.showmodal(13, false);
        $scope.cname = l.count;
        break;
      case 'api':
        $scope.version = l.version;
        $scope.host = l.host;
        $scope.path = l.path;
        $scope.port = (l.port || 0);
        $scope.showmodal(14, false);
        break;
      default:
        break;
    }
  }

  $scope.autoif = function () {
    $scope.ifopt = (/[=<>!]+/.test($scope.texto) ? '5' : $scope.ifopt);
  }

  $scope.autoversion = function () {
    if ($scope.host.startsWith('https://')) {
      $scope.version = 'https';
    } else if ($scope.host.startsWith('http://')) {
      $scope.version = 'http';
    }
  }

  $scope.list();
  $scope.slist();
  $scope.ccommon = false;
  $scope.voice = 'es-LA_SofiaV3Voice';
  $scope.key = 0;
  $scope.ifopt = '4';
  $scope.ops = "sum";
  $scope.level = '' + 0;
  $scope.version = 'https';
  $scope.node = [];
  init();
}]);