eva.controller('interaccion', ['$scope', '$http', function ($scope, $http) {
  $scope.listado = [];
  $scope.led = [];
  $scope.mov = [];
  $scope.stt = [];
  $scope.accion = locale().COMMON.ADD;
  $scope.icon = true;
  $scope.updateid;
  var modalname = locale().INTERACTION;
  var color = { joy: "lightyellow", sad: "lightblue", surprised: "lightgreen", anger: "red", ini: "lightgray" };

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
      $scope.langcodelist = [];
      for (let i = 0; i < $scope.vlistado.length; i++) {
        let element = $scope.vlistado[i].codigo.substring(0, 2);
        if (!$scope.langcodelist.includes(element))
          $scope.langcodelist.push(element);
      }
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
    $http.get('/api/common?db=googlestt').then(function successCallback(response) {
      $scope.stt = response.data;
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
    $http.get('interaccion/' + id)
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
    Object.assign($scope, { nombre: l.nombre, updateid: l._id, icon: false, accion: locale().COMMON.EDIT} );
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
      $scope.accion = locale().COMMON.ADD;
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
    Object.assign($scope, { updateid: '', icon: true, accion: locale().COMMON.ADD} );
    $scope.reset();
    $scope.list();
    id = 0;
    $scope.node = [];
    $scope.key = 0;
    $('#inicio').click();
  }

  $scope.unified = function (id) {
    $http.get('/interaccion/unified/' + id).then(function successCallback(response) {
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
    $scope.ModalName = nuevo ? modalname[value.toUpperCase()] : $scope.name;
    switch (value) {
      case 'voice':
        $scope.ncommon = modalname.TRANSLATE;
        break;
      case 'script':
        $scope.ncommon = modalname.RANDOM;
        break;
      case 'sound':
        $scope.leds = !!$scope.leds ? $scope.leds : '';
        $scope.ncommon = modalname.WAIT;
        break;
      case 'counter':
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
    let tempobj = { key: Date.now(), name: modalname[$scope.modal.toUpperCase()] + '_' + id, type: $scope.modal, group: $scope.group }
    switch ($scope.modal) {
      case 'emotion':
        node.push(Object.assign(tempobj, { emotion: $scope.emocion, level: parseInt($scope.level), speed: $scope.velocidad, color: color[$scope.emocion] }));
        break;
      case "speak":
        node.push(Object.assign(tempobj, { text: $scope.texto }));
        break;
      case "listen":
        node.push(Object.assign(tempobj, { opt: $scope.listenopt, langcode: $scope.langcode, service: $scope.service }));
        break;
      case "wait":
        node.push(Object.assign(tempobj, { time: $scope.time }));
        break;
      case "for":
        node.push(Object.assign(tempobj, { iteraciones: $scope.it, isGroup: true }));
        break;
      case "if":
        node.push(Object.assign(tempobj, { text: $scope.texto, opt: parseInt($scope.ifopt) }));
        break;
      case "mov":
        node.push(Object.assign(tempobj, { mov: $scope.movement }));
        break;
      case 'int':
        node.push(Object.assign(tempobj, setint()));
        break;
      case "script":
        node.push(Object.assign(tempobj, { sc: $scope.thescript, random: $scope.ccommon }));
        break;
      case "sound":
        node.push(Object.assign(tempobj, { src: $scope.thesound, wait: $scope.ccommon, anim: $scope.leds }));
        break;
      case "led":
        let base = $scope.led.filter(x => x._id == $scope.leds)[0].base;
        node.push(Object.assign(tempobj, { name: "Leds_" + id, anim: $scope.leds, base: base }));
        break;
      case "voice":
        if ($scope.ccommon) {
          tempobj.translate = true;
          tempobj.sourcelang = $scope.sourcelang;
        }
        node.push(Object.assign(tempobj, { voice: $scope.voice, robotname: $scope.vlistado.filter(x => x.codigo == $scope.voice)[0].nombre }));
        break;
      case "counter":
        node.push(Object.assign(tempobj, { count: ($scope.cnname === '' ? $scope.cname : $scope.cnname), ops: $scope.ops, value: $scope.vcounter }));
        break;
      case "api":
        node.push(Object.assign(tempobj, { version: $scope.version, host: $scope.host, path: $scope.path, port: ($scope.port == 0 || !!!$scope.port ? '' : $scope.port) }));
        break;
      case "dialogflow":
        node.push(Object.assign(tempobj, { text: $scope.dialogparam, project: $scope.project }));
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
          node[node.length - 1].name = node[i].type == 'int' ? node[node.length - 1].name : node[i].name;
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

  function setint () {
    for (let i = 0; i < $scope.listado.length; i++) {
      if ($scope.listado[i]._id === $scope.int) {
        return { name: $scope.listado[i].nombre, int: $scope.int };
      }
    }
  }

  $scope.updatenode = function (l) {
    Object.assign($scope, { key: l.key, name: l.name, type: l.type, color: l.color, isGroup: l.isGroup, group: ((l.group || '') + ''), accion: locale().COMMON.EDIT });
    switch (l.type) {
      case 'emotion':
        Object.assign($scope, { emocion: l.emotion, velocidad: l.speed, level: l.level + ''});
        break;
      case 'speak':
        Object.assign($scope, { texto: l.text });
        break;
      case 'listen':
        Object.assign($scope, { listenopt: l.opt, langcode: l.langcode, service: l.service });
        break;
      case 'wait':
        $scope.time = l.time;
        break;
      case 'for':
        $scope.it = l.iteraciones;
        break;
      case 'if':
        Object.assign($scope, { texto: l.text, ifopt: '' + l.opt});
        break;
      case 'mov':
        $scope.movement = l.mov;
        break;
      case 'int':
        $scope.int = l.int;
        break;
      case 'script':
        Object.assign($scope, { thescript: l.sc, ccommon: l.random });
        break;
      case 'sound':
        Object.assign($scope, { thesound: l.src, ccommon: l.wait, leds: l.anim });
        break;
      case 'led':
        $scope.leds = l.anim;
        break;
      case 'voice':
        Object.assign($scope, { voice: l.voice, ccommon: l.translate, sourcelang: l.sourcelang, robotname: $scope.vlistado.filter(x => x.codigo == $scope.voice)[0].nombre });
        break;
      case 'counter':
        Object.assign($scope, { ops: l.ops, vcounter: l.value, cname: l.count });
        break;
      case 'api':
        Object.assign($scope, { version: l.version, host: l.host, path: l.path, port: (l.port || 0) });
        break;
      case 'dialogflow':
        Object.assign($scope, { dialogparam: l.text, project: l.project });
        break;
      default:
        break;
    }
    $scope.showmodal(l.type, false);
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

  $scope.download = function (l) {
    let filename = l.nombre + ".txt";
    let tempobj = JSON.parse(JSON.stringify(l));
    delete tempobj._id
    var blob = new Blob([JSON.stringify(tempobj)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  }

  $scope.import = function () {
    let tempdata = JSON.parse($('textarea').val());
    $scope.update(tempdata);
    $scope.updateid = 0;
    $scope.accion = locale().COMMON.ADD;
    $scope.icon = true;
    $('#modalimport').modal('hide');
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