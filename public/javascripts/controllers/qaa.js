var eva = angular.module('evaApp', []);
eva.controller('qaa', ['$scope', '$http', function ($scope, $http) {
  $scope.listado = [];
  $scope.pregunta;
  var i = -1;
  var correctas = 0;
  var total = 0;

  $scope.list = function () {
    $http.get('/interaccion/qaa?id=ini').then(function successCallback(response) {
      $scope.listado = response.data.preguntas;
      $scope.emotional = response.data.emotional;
    }, function errorCallback(response) {
    });
  }

  $scope.invertemotion = function () {
    $http.get('/interaccion/qaa?id=emotion').then(function successCallback(response) {
      $scope.emotional = response.data.emotional;
    }, function errorCallback(response) {
    });
  }

  $scope.speak = function () {
    $http.get('/interaccion/qaa?id=speak&speak=' + $scope.stext).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.question = function () {
    if (i == 2) {
      i = -1;
      correctas = 0;
    }
    i++;
    $scope.pregunta = $scope.listado.shift();
    $scope.temp = '' + ($scope.pregunta.audio.substring($scope.pregunta.audio.lastIndexOf('/') + 1, $scope.pregunta.audio.length - 4));
    $http.get('/interaccion/qaa?id=p&q=' + $scope.temp).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.answer = function (value) {
    if (value > 0) {
      correctas++;
      total++;
    }
    $http.get('/interaccion/qaa?id=r&q=' + $scope.temp + '&e=' + value + '&ok=' + correctas + '&i=' + i).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.resumen = function () {
    $http.get('/interaccion/qaa?id=resumen&ok=' + correctas + '&t=' + total).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.req = function (value) {
    $http.get('/interaccion/qaa?id=' + value).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.list();

}]);