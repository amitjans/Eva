eva.controller('led', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.listBaseAnims = [];
    $scope.temp = [];
    $scope.icon = true;
    $scope.updateid;
    Object.assign($scope, dataTableValues());
    $scope.params = { color: [], led: [], time: false };

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
            notify('Animación led creada correctamente');
        }, function errorCallback(response) {
        });
    }

    $scope.clone = function (obj) {
        delete obj._id;
        obj.nombre = Date.now().toString(36);
        $http.post('/api/common?db=led', obj).then(function successCallback(response) {
            $scope.list();
            notify('Animación led duplicada correctamente');
        }, function errorCallback(response) {
        });
    }

    $scope.update = function (l) {
        Object.assign($scope, { updateid: l._id, nombre: l.nombre, base: l.base });
        $scope.changeform(l.opts);
        $scope.icon = false;
        $scope.accion = 'Editar';
        $('#myModal').modal('show');
    }

    $scope.updatesend = function () {
        $scope.loadForm();
        var json = { nombre: $scope.nombre, base: $scope.base, opts: $scope.opts };
        $http.put('/api/common/' + $scope.updateid + '?db=led', json).then(function successCallback(response) {
            $scope.clear();
            notify('Animación led actualizada correctamente');
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/common/' + id + '?db=led').then(function successCallback(response) {
            $scope.list();
            notify('Animación led eliminada correctamente');
        }, function errorCallback(response) {
        });;
    }

    $scope.execute = function (l) {
        $http.post('/nodes', { type: 'led', anim: l._id, base: l.base }).then(function successCallback(response) {
        }, function errorCallback(response) {
        });;
    }

    $scope.changeform = function (opts = {}) {
        $scope.params = { color: [], led: [], time: false };
        let params = $scope.listBaseAnims.filter(x => x.name == $scope.base)[0].params;
        console.log(params);
        for (let i = 1; i <= params.color; i++) {
            $scope.params.color.push({ id: i, model: opts['color' + i] || '' });
        }
        for (let i = 1; i <= params.led; i++) {
            $scope.params.led.push({ id: i, model: opts['led' + i]?.toString() || '' });
        }
        $scope.params.time = !!params.time;
        if ($scope.params.time) {
            $scope.time = opts.time || 0;
        }
    }

    $scope.loadForm = function () {
        console.log($scope.params.color);
        $scope.opts = {};
        for (let i = 0; i < $scope.params.color.length; i++) {
            console.log($scope.params.color[i].id + ' - ' + $scope.params.color[i].model);
            $scope.opts['color' + $scope.params.color[i].id] = $scope.params.color[i].model;
        }
        for (let i = 0; i < $scope.params.led.length; i++) {
            console.log($scope.params.led[i].id + ' - ' + $scope.params.led[i].model);
            $scope.opts['led' + $scope.params.led[i].id] = parseInt($scope.params.led[i].model);
        }
        $scope.opts['time'] = $scope.time;
    }

    $scope.clear = function () {
        $scope.nombre = '';
        $scope.icon = true;
        $('#myModal').modal('hide');
        $scope.list();
        $scope.accion = 'Agregar';
    }

    $scope.dataTable = function (way = 0) {
        let obj = dataTable($scope.listado, $scope, way, 'nombre', 'base');
        Object.assign($scope, obj);
    }

    $scope.list();
    $scope.baseAnims();
}]);