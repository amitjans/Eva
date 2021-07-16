eva.controller('led', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.listBaseAnims = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.accion = locale().COMMON.ADD;
    $scope.updateid;
    Object.assign($scope, dataTableValues());
    $scope.params = { color: [], led: [], num: [], time: false };

    $scope.list = function () {
        $http.get('/api/common?db=led').then(function successCallback(response) {
            $scope.listado = response.data;
            $scope.dataTable();
        }, function errorCallback(response) {
        });
    }

    $scope.baseAnims = function () {
        $http.get('/api/leds').then(function successCallback(response) {
            $scope.listBaseAnims = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.create = function () {
        $scope.loadForm();
        var json = { nombre: $scope.nombre, base: $scope.base, opts: $scope.opts };
        $http.post('/api/common?db=led', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().LED.NOTIFY.POST.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().LED.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.clone = function (obj) {
        delete obj._id;
        obj.nombre = Date.now().toString(36);
        $http.post('/api/common?db=led', obj).then(function successCallback(response) {
            $scope.list();
            notify(locale().LED.NOTIFY.CLONE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().LED.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.update = function (l) {
        Object.assign($scope, { updateid: l._id, nombre: l.nombre, base: l.base });
        $scope.changeform(l.opts);
        $scope.icon = false;
        $scope.accion = locale().COMMON.EDIT;
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        $scope.loadForm();
        var json = { nombre: $scope.nombre, base: $scope.base, opts: $scope.opts };
        $http.put('/api/common/' + $scope.updateid + '?db=led', json).then(function successCallback(response) {
            $scope.clear();
            notify(locale().LED.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().LED.NOTIFY.ERROR,  'danger');
        });
    }

    $scope.delete = function (id) {
        if (confirm(locale().COMMON.DELETE)) {
            $http.delete('/api/common/' + id + '?db=led').then(function successCallback(response) {
                $scope.list();
                notify(locale().LED.NOTIFY.DELETE.SUCCESS);
            }, function errorCallback(response) {
                notify(locale().LED.NOTIFY.ERROR, 'danger');
            });
        }
    }

    $scope.execute = function (l) {
        $http.post('/nodes', { type: 'led', anim: l._id, base: l.base }).then(function successCallback(response) {
        }, function errorCallback(response) {
            notify(locale().LED.NOTIFY.ERROR,  'danger');
        });;
    }

    $scope.changeform = function (opts = {}) {
        $scope.params = { color: [], led: [], num: [], time: false };
        let params = $scope.listBaseAnims.find(x => x.name == $scope.base).params;
        console.log(params);
        for (let i = 1; i <= params.color; i++) {
            $scope.params.color.push({ id: i, model: opts['color' + i] || '' });
        }
        for (let i = 1; i <= params.led; i++) {
            $scope.params.led.push({ id: i, model: opts['led' + i]?.toString() || '' });
        }
        for (let i = 1; i <= (params.num || 0); i++) {
            $scope.params.num.push({ id: i, model: opts['num' + i] });
        }
        $scope.params.time = !!params.time;
        if ($scope.params.time) {
            $scope.time = opts.time || 0;
        }
    }

    $scope.loadForm = function () {
        $scope.opts = {};
        for (let i = 0; i < $scope.params.color.length; i++) {
            $scope.opts['color' + $scope.params.color[i].id] = $scope.params.color[i].model;
        }
        for (let i = 0; i < $scope.params.led.length; i++) {
            $scope.opts['led' + $scope.params.led[i].id] = parseInt($scope.params.led[i].model);
        }
        for (let i = 0; i < $scope.params.num.length; i++) {
            $scope.opts['num' + $scope.params.num[i].id] = $scope.params.num[i].model;
        }
        $scope.opts['time'] = $scope.time;
    }

    $scope.clear = function () {
        Object.assign($scope, { nombre: '', icon: true, accion: locale().COMMON.ADD });
        $('#myModal').modal('hide');
        $scope.list();
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre', 'base');
        Object.assign($scope, obj);
    }

    $scope.list();
    $scope.baseAnims();
}]);