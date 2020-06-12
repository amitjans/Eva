var eva = angular.module('evaApp', []);
eva.controller('qaa', ['$scope', '$http', function ($scope, $http) {
  $scope.listado = [];
  $scope.pregunta;
  var i = 0;
  $scope.stext = '';

  $scope.invertemotion = function () {
    $http.get('/interaccion/qaa?id=emotion').then(function successCallback(response) {
      $scope.emotional = response.data.emotional;
    }, function errorCallback(response) {
    });
  }

  $scope.speak = function () {
    $http.get('/interaccion/auto?id=speak&speak=' + $scope.stext).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.platica = function (value = '') {
    $http.get('/interaccion/auto?id=p' + value).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.case = function (r) {
    $http.get('/interaccion/auto?id=c&c=' + i + '&r=' + r).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

  $scope.answer = function (value) {
    $http.get('/interaccion/auto?id=a&c=' + i + '&opt=' + value).then(function successCallback(response) {
      i++;
    }, function errorCallback(response) {
    });
  }

  $scope.req = function (value, opt) {
    $http.get('/interaccion/auto?id=' + value + '&opt=' + (opt || '')).then(function successCallback(response) {
    }, function errorCallback(response) {
    });
  }

}]);