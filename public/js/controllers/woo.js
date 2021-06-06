eva.controller('woo', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.soundlistado = [];
    $scope.vlistado = [];
    $scope.temp = [];
    $scope.led = [];
    $scope.accion = locale().COMMON.ADD;
    $scope.icon = true;
    $scope.order = '';
    $scope.tipo = 'speak';
    $scope.config = {};
    
    $scope.z = 0;
    $scope.wooid = '';
    $scope.commands = [];
    $scope.tempwoo = {};
    $scope.tempid = -1;

    $scope.list = function () {
        getData('/api/common?db=woo', 'listado');
        getData('/api/audio', 'soundlistado');
        getData('api/common?db=led', 'led');
        $http.get('/api/common?db=voice').then(function successCallback(response) {
            $scope.vlistado = response.data;
            $http.get('/config').then(function successCallback(response) {
                $scope.config = response.data;
                $scope.voice = $scope.config.voice;
            }, function errorCallback(response) {
            });
        }, function errorCallback(response) {
        });
    }

    function getData(url, property){
        $http.get(url).then(function successCallback(response) {
            $scope[property] = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.loadcomands = function () {
        for (let i = 0; i < $scope.listado.length; i++) {
            if ($scope.listado[i]._id == $scope.wooid) {
                $scope.tempwoo = $scope.listado[i];
                $scope.commands = $scope.tempwoo.command.sort(((a, b) => a.order - b.order));
            }
        }
    }

    $scope.execute = function (obj) {
        $http.post('/nodes', obj).then(function successCallback(response) {
        }, function errorCallback(response) {
            notify(locale().WOO.NOTIFY.ERROR, 'danger');
        });
        $('#' + ($scope.tempwoo.order[$scope.z]) + ' span').css('color', 'black');
        $scope.z = $scope.z + 1;
        $('#' + ($scope.tempwoo.order[$scope.z]) + ' span').css('color', 'green');
    }

    $scope.node = function (obj) {
        $http.post('/nodes', obj).then(function successCallback(response) {
        }, function errorCallback(response) {
            notify(locale().WOO.NOTIFY.ERROR, 'danger');
        });
    }

    $scope.mov = function (dir) {
        $scope.node({ type: 'mov', mov: dir });
    }

    $scope.emotion = function (emotion, level) {
        $scope.node({ type: 'emotion', emotion: emotion, level: level, speed: 2.0 });
    }

    $scope.setvoice = function (value) {
        $scope.node(Object.assign($scope.config, { voice: $scope.voice, type: 'voice', robotname: $scope.config.name }));
    }

    //crud woo
    $scope.create = function () {
        $http.post('/api/common?db=woo', { name: $scope.name, command: [], order: $scope.order.split(',') }).then(function successCallback(response) {
            $scope.list();
            Object.assign($scope, { tempwoo: response.data.obj, wooid: $scope.tempwoo._id, name: '', order: '' });
            $('#wooaddid').modal('hide');
            $scope.commands = [];
        }, function errorCallback(response) {
            notify(locale().WOO.NOTIFY.ERROR, 'danger');
        });
    }

    $scope.update = function (l) {
        Object.assign($scope, { icon: false, accion: locale().COMMON.EDIT, name: $scope.tempwoo.name, order: $scope.tempwoo.order.join(',') });
    }

    $scope.updatesend = function (flag) {
        var json = { name: $scope.name || $scope.tempwoo.name, command: $scope.commands };
        if (flag) {
            Object.assign(json, { order: $scope.order.split(',') });
        }
        $http.put('/api/common/' + $scope.tempwoo._id + '?db=woo', json).then(function successCallback(response) {
            Object.assign($scope, { name: '', order: '', icon: true, accion: locale().COMMON.ADD });
            $('#wooaddid').modal('hide');
            $scope.list();
            notify(locale().WOO.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().WOO.NOTIFY.ERROR, 'danger');
        });
    }
    $scope.delete = function () {
        $http.delete('/api/common/' + $scope.tempwoo._id + '?db=woo').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
            notify(locale().WOO.NOTIFY.ERROR, 'danger');
        });
    }
    //endcrudwoo

    //crudcommandswoo
    $scope.ccommand = function () {
        if ($scope.tempid == -1) {
            if ($scope.tipo == 'speak') {
                $scope.commands.push({ type: 'speak', text: $scope.text, desc: $scope.text, order: $scope.corder });
                $scope.text = '';
                $scope.corder = 0;
            } else if ($scope.tipo == 'sound') {
                $scope.commands.push({ type: 'sound', src: $scope.thesound, desc: $scope.thesound, order: $scope.corder });
            }
            else if ($scope.tipo == 'led') {
                let temp = $scope.led.find(x => x._id == $scope.leds);
                $scope.commands.push({ type: 'led', base: temp.base, anim: $scope.leds, desc: temp.nombre, order: $scope.corder });
            }
        } else {
            if ($scope.tipo == 'speak') {
                $scope.commands[$scope.tempid] = { type: 'speak', text: $scope.text, desc: $scope.text, order: $scope.corder };
                $scope.text = '';
                $scope.corder = 0;
            } else if ($scope.tipo == 'sound') {
                $scope.commands[$scope.tempid] = { type: 'sound', src: $scope.thesound, desc: $scope.thesound, order: $scope.corder };
            }
            else if ($scope.tipo == 'led') {
                let temp = $scope.led.find(x => x._id == $scope.leds);
                $scope.commands[$scope.tempid] = { type: 'led', base: temp.base, anim: $scope.leds, desc: temp.nombre, order: $scope.corder };
            }
        }
        $scope.commands.sort(((a, b) => a.order - b.order));
        $scope.tempid = -1;
        $('#wooaddcs').modal('hide');
    }

    $scope.ucommand = function (id) {
        let { type, text, src, order, anim } = $scope.commands[id];
        Objets.assign($scope, { tempid: id, tipo: type, text: (text || ''), thesound: (src || ''), corder: (order || ''), leds: (anim || '') });
        $('#wooaddcs').modal('show');
    }

    $scope.cdelete = function (i) {
        $scope.commands.splice(i, 1);
    }
    //endcrudcommandswoo

    $scope.fa_icon = value => ({ speak: 'fa-comments-o', led: 'fa-lightbulb-o', sound: 'fa-volume-up' }[value] || '');
    

    $scope.list();
}]);