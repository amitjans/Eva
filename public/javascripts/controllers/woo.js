eva.controller('woo', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.soundlistado = [];
    $scope.temp = [];
    $scope.led = [];
    $scope.accion = 'Agregar';
    $scope.icon = true;
    $scope.order = '';
    $scope.tipo = 'speak';

    $scope.z = 0;
    $scope.wooid = '';
    $scope.commands = [];
    $scope.tempwwo = {};
    $scope.tempid = -1;

    $scope.list = function () {
        $http.get('/api/common?db=woo').then(function successCallback(response) {
            $scope.listado = response.data;
        }, function errorCallback(response) {
        });
        $http.get('/api/audio').then(function successCallback(response) {
            $scope.soundlistado = response.data;
        }, function errorCallback(response) {
        });
        $http.get('api/common?db=led').then(function successCallback(response) {
            $scope.led = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.loadcomands = function () {
        for (let i = 0; i < $scope.listado.length; i++) {
            if ($scope.listado[i]._id == $scope.wooid) {
                $scope.tempwwo = $scope.listado[i];
                $scope.commands = $scope.tempwwo.command;
            }
        }
        // $scope.z = 0;
        // while (!!$('#' + ($scope.tempwwo.order[$scope.z]) + ' i')) {
        //     $('#' + ($scope.tempwwo.order[$scope.z]) + ' i').css('color', 'black');    
        // }
    }

    $scope.execute = function name(obj) {
        $http.post('/nodes', obj).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
        $('#' + ($scope.tempwwo.order[$scope.z]) + ' i').css('color', 'black');
        $scope.z = $scope.z + 1;
        $('#' + ($scope.tempwwo.order[$scope.z]) + ' i').css('color', 'yellow');
    }

    $scope.emotions = function name(emotion, level) {
        $http.post('/nodes', { type: 'emotion', emotion: emotion, level: level, speed: 2.0 }).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
    }

    //crud woo
    $scope.create = function () {
        $http.post('/api/common?db=woo', { name: $scope.name, command: [], order: $scope.order.split(',') }).then(function successCallback(response) {
            $scope.list();
            $scope.tempwwo = response.data.obj;
            $scope.wooid = $scope.tempwwo._id;
            $scope.name = '';
            $scope.order = '';
            $('#wooaddid').modal('hide');
            $scope.commands = [];
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        $scope.icon = false;
        $scope.accion = 'Editar';
        $scope.name = $scope.tempwwo.name;
        $scope.order = $scope.tempwwo.order.join(',');
    }

    $scope.updatesend = function (flag) {
        var json = { name: $scope.name || $scope.tempwwo.name, command: $scope.commands };
        if (flag) {
            Object.assign(json, { order: $scope.order.split(',') });
        }
        $http.put('/api/common/' + $scope.tempwwo._id + '?db=woo', json).then(function successCallback(response) {
            $scope.name = '';
            $scope.order = '';
            $scope.icon = true;
            $('#wooaddid').modal('hide');
            $scope.list();
            $scope.accion = 'Agregar';
        }, function errorCallback(response) {
        });
    }
    $scope.delete = function () {
        $http.delete('/api/common/' + $scope.tempwwo._id + '?db=woo').then(function successCallback(response) {
            $scope.list();
        }, function errorCallback(response) {
        });
    }
    //endcrudwoo

    //crudcommandswoo
    $scope.ccommand = function () {
        if ($scope.tempid == -1) {
            if ($scope.tipo == 'speak') {
                $scope.commands.push({ type: 'speak', nombre: 'Hablar', text: $scope.text, desc: $scope.text, order: $scope.corder });
                $scope.text = '';
                $scope.corder = 0;
            } else if ($scope.tipo == 'sound') {
                $scope.commands.push({ type: 'sound', nombre: 'Audio', src: $scope.thesound, desc: $scope.thesound, order: $scope.corder });
            }
            else if ($scope.tipo == 'led') {
                $scope.commands.push({ type: 'led', nombre: 'Leds', anim: $scope.leds, desc: $scope.leds, order: $scope.corder });
            }
        } else {
            if ($scope.tipo == 'speak') {
                $scope.commands[$scope.tempid] = { type: 'speak', nombre: 'Hablar', text: $scope.text, desc: $scope.text, order: $scope.corder };
                $scope.text = '';
                $scope.corder = 0;
            } else if ($scope.tipo == 'sound') {
                $scope.commands[$scope.tempid] = { type: 'sound', nombre: 'Audio', src: $scope.thesound, desc: $scope.thesound, order: $scope.corder };
            }
            else if ($scope.tipo == 'led') {
                $scope.commands[$scope.tempid] = { type: 'led', nombre: 'Leds', anim: $scope.leds, desc: $scope.leds, order: $scope.corder };
            }
        }
        $('#wooaddcs').modal('hide');
    }

    $scope.ucommand = function (id) {
        $scope.tempid = id;
        $scope.tipo = $scope.commands[id].type;
        $scope.text = $scope.commands[id].text || '';
        $scope.thesound = $scope.commands[id].src || '';
        $scope.corder = $scope.commands[id].order;
        $scope.leds = $scope.commands[id].anim || '';
        $('#wooaddcs').modal('show');
    }

    $scope.cdelete = function (i) {
        $scope.commands.splice(i, 1);
    }
    //endcrudcommandswoo

    $scope.speak = function (value) {
        $http.get('/speak?speak=' + value).then(function successCallback(response) {
        }, function errorCallback(response) {
        });
    }

    $scope.list();
}]);