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
    getData('/api/common?db=interaccion', 'listado');
  }

  $scope.slist = function () {
    getData('/api/common?db=script', 'slistado');
    getData('api/common?db=led', 'led');
    getData('/api/common?db=mov', 'mov');
    getData('/api/common?db=googlestt', 'stt');
    getData('/api/audio', 'soundlistado');
    getData('/api/filters', 'filterslist');
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
  }

  function getData(url, property){
    $http.get(url).then(function successCallback(response) {
      $scope[property] = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.iniciarInteracciong = function (id) {
    $http.get('api/interaccion/' + id).then(function (res) {
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
    node = l.data.node;
    link = l.data.link;
    $scope.node = node;
    $scope.node.sort((a, b) => parseInt(a.name.split('_')[1]) - parseInt(b.name.split('_')[1]));
    id = parseInt($scope.node[node.length - 1].name.split('_')[1]) + 1;
    reload();
  }

  $scope.updatesend = function (end = false) {
    var json = { nombre: $scope.nombre, data: { node: node, link: link } };
    $http.put('/api/common/' + $scope.updateid + '?db=interaccion', json).then(function successCallback(response) {
      if (end) {
        Object.assign($scope, { updateid: '', accion: locale().COMMON.ADD, icon: true, node: [] });
        $scope.reset();
        $scope.list();
        $('#inicio').click();
        id = 0;
      }
    }, function errorCallback(response) {
    });
  }

  $scope.delete = function (id) {
    if (confirm(locale().COMMON.DELETE)) {
      $http.delete('/api/common/' + id + '?db=interaccion').then(function successCallback(response) {
        $scope.list();
      }, function errorCallback(response) {
      });
    }
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
    $http.get('/api/interaccion/unified/' + id).then(function successCallback(response) {
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
    Object.assign($scope, {node: node, texto: '', listenopt: '', ifopt: '4'});
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
    }
    $scope.modal = value;
    $("#myModal").modal('show');
  }

  $scope.setnode = function () {
    let tempobj = { key: Date.now(), name: modalname[$scope.modal.toUpperCase()] + '_' + id, type: $scope.modal, group: $scope.group }
    switch ($scope.modal) {
      case 'emotion':
        node.push({ ...tempobj, emotion: $scope.emotion, level: parseInt($scope.level), speed: $scope.speed, color: color[$scope.emotion] });
        break;
      case "speak":
        node.push({ ...tempobj, text: $scope.texto });
        break;
      case "listen":
        node.push({ ...tempobj, opt: $scope.listenopt, langcode: $scope.langcode, service: $scope.service });
        break;
      case "wait":
        node.push({ ...tempobj, time: $scope.time });
        break;
      case "for":
        node.push({ ...tempobj, iteraciones: $scope.it, isGroup: true });
        break;
      case "if":
        node.push({ ...tempobj, text: $scope.texto, opt: parseInt($scope.ifopt) });
        break;
      case "mov":
        node.push({ ...tempobj, mov: $scope.movement });
        break;
      case 'int':
        node.push({ ...tempobj, name: $scope.listado.find( x => x._id === $scope.int).nombre, int: $scope.int });
        break;
      case "script":
        node.push({ ...tempobj, sc: $scope.thescript, random: $scope.ccommon });
        break;
      case "sound":
        node.push({ ...tempobj, src: $scope.thesound, wait: $scope.ccommon, anim: $scope.leds });
        break;
      case "led":
        let base = $scope.led.find(x => x._id == $scope.leds).base;
        node.push({ ...tempobj, name: "Leds_" + id, anim: $scope.leds, base: base });
        break;
      case "voice":
        if ($scope.ccommon) {
          Object.assign(tempobj, { translate: true, sourcelang: $scope.sourcelang });
        }
        node.push({ ...tempobj, voice: $scope.voice, robotname: $scope.vlistado.find(x => x.codigo == $scope.voice).nombre });
        break;
      case "counter":
        node.push({ ...tempobj, count: ($scope.cnname === '' ? $scope.cname : $scope.cnname), ops: $scope.ops, value: $scope.vcounter });
        break;
      case "api":
        node.push({ ...tempobj, version: $scope.version, host: $scope.host, path: $scope.path, port: ($scope.port == 0 || !!!$scope.port ? '' : $scope.port) });
        break;
      case "dialogflow":
        node.push({ ...tempobj, text: $scope.dialogparam, project: $scope.project });
        break;
      default:
        node.push(tempobj);
        break;
    }
    if ($scope.key == 0) {
      $scope.common(node[node.length - 1].key);
    } else {
      let i = node.findIndex(x => x.key === $scope.key);
      node[node.length - 1].key = node[i].key;
      node[node.length - 1].name = node[i].type == 'int' ? node[node.length - 1].name : node[i].name;
      node.splice(i, 1);
      $scope.key = 0;
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

  $scope.updatenode = function (l) {
    let diff = { text: (l.type === 'dialogflow' ? 'dialogparam' : 'texto'), opt: (l.type === 'listen' ? 'listenopt' : 'ifopt'), iteraciones: 'it',
    mov: 'movement', sc: 'thescript', random: 'ccommon', src: 'thesound', wait: 'ccommon', anim: 'leds', translate: 'ccommon', value: 'vcounter',
    count: 'cname'};
    
    for (const item in l) {
      $scope[(diff[item] || item)] = (/(level|opt)/.test(item) ? l[item].toString() : l[item]);
    }
    Object.assign($scope, { group: ((l.group || '') + ''), accion: locale().COMMON.EDIT });
    switch(l.type){
      case 'voice':
        Object.assign($scope, { robotname: $scope.vlistado.find(x => x.codigo == $scope.voice).nombre });
        break;
      case 'api':
        Object.assign($scope, { port: (l.port || 0) });
        break;
    }
    $scope.showmodal(l.type, false);
  }

  $scope.autoif = () => $scope.ifopt = (/[=<>!]+/.test($scope.texto) ? '5' : $scope.ifopt);

  $scope.autoversion = () => {
    $scope.version = $scope.host.startsWith('https') ? 'https' : 'http';
  }

  $scope.download = function (l) {
    let filename = l.nombre + ".json";
    $http.get('/api/interaccion/export/' + l._id).then(function successCallback(response) {
      let tempobj = { nombre: l.nombre, data: response.data };
      var blob = new Blob([JSON.stringify(tempobj, null, "\t")], { type: "text/plain;charset=utf-8" });
      saveAs(blob, filename);
    }, function errorCallback(response) {
    });
  }

  $scope.import = function () {
    $scope.update(JSON.parse($('textarea').val()));
    $scope.updateid = 0;
    $scope.accion = locale().COMMON.ADD;
    $scope.icon = true;
    $('#modalimport').modal('hide');
  }

  $scope.list();
  $scope.slist();
  Object.assign($scope, { ccommon: false, voice: 'es-LA_SofiaV3Voice', key: 0, ifopt: '4', ops: "sum", level: '0', version: 'https', node: []});
  init();
}]);