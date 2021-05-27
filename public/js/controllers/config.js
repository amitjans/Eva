eva.controller('config', ['$scope', '$http', function ($scope, $http) {
    $scope.listado = [];
    $scope.sublist = [];
    $scope.led = [];
    $scope.sttlist = [];
    $scope.movlist = [];
    $scope.temp = [];
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/common?db=voice').then(function successCallback(response) {
            $scope.listado = response.data;
            $http.get('/api/config').then(function successCallback(response) {
                $scope.nombre = response.data.name;
                $scope.voice = response.data.voice;
                $scope.voiceled = response.data.voiceled._id;
                $scope.listen = response.data.listen._id;
                $scope.listenled = response.data.listenled._id;
                $scope.emotionmov1 = response.data.emotion.joy.mov._id;
                $scope.emotionled1 = response.data.emotion.joy.led._id;
                $scope.emotionmov2 = response.data.emotion.sad.mov._id;
                $scope.emotionled2 = response.data.emotion.sad.led._id;
                $scope.emotionmov3 = response.data.emotion.anger.mov._id;
                $scope.emotionled3 = response.data.emotion.anger.led._id;
                $scope.emotionmov4 = response.data.emotion.surprise.mov._id;
                $scope.emotionled4 = response.data.emotion.surprise.led._id;
            }, function errorCallback(response) {
            });
        }, function errorCallback(response) {
        });
        $http.get('api/common?db=led').then(function successCallback(response) { 
            $scope.led = response.data;
        }, function errorCallback(response) {
        });
        $http.get('/api/common?db=googlestt').then(function successCallback(response) {
            $scope.sttlist = response.data;
        }, function errorCallback(response) {
        });
        $http.get('/api/common?db=mov').then(function successCallback(response) {
            $scope.movlist = response.data;
        }, function errorCallback(response) {
        });
    }

    $scope.update = function () {
        var json = { name: $scope.nombre, voice: $scope.voice, 
            voiceled: $scope.led.find(x => x._id == $scope.voiceled), 
            listen: $scope.sttlist.find(x => x._id == $scope.listen),
            listenled: $scope.led.find(x => x._id == $scope.listenled),
            emotion: {
                joy: {
                    mov: $scope.movlist.find(x => x._id == $scope.emotionmov1),
                    led: $scope.led.find(x => x._id == $scope.emotionled1)
                },
                sad: {
                    mov: $scope.movlist.find(x => x._id == $scope.emotionmov2),
                    led: $scope.led.find(x => x._id == $scope.emotionled2)
                },
                anger: {
                    mov: $scope.movlist.find(x => x._id == $scope.emotionmov3),
                    led: $scope.led.find(x => x._id == $scope.emotionled3)
                },
                surprise: {
                    mov: $scope.movlist.find(x => x._id == $scope.emotionmov4),
                    led: $scope.led.find(x => x._id == $scope.emotionled4)
                }
            }
        };
        $http.put('/api/config', json).then(function successCallback(response) {
            $scope.list();
            notify(locale().CONFIG.NOTIFY.UPDATE.SUCCESS);
        }, function errorCallback(response) {
            notify(locale().CONFIG.NOTIFY.UPDATE.ERROR, 'danger');
        });
    }

    $scope.list();
}]);