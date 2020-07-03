var eva = angular.module('evaApp', ['ngRoute','dndLists']);
eva.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/controlAngular', {
            templateUrl: '/plantillas/controlAngular.html'
        }).
        
        when('/interaccion', {
            templateUrl: '/plantillas/interaccion.html'
        }).
        when('/audio', {
            templateUrl: '/plantillas/audio.html'
        }).
        when('/script', {
            templateUrl: '/plantillas/script.html'
        }).
        when('/scriptdata', {
            templateUrl: '/plantillas/scriptdata.html'
        }).
        when('/qaa', {
            templateUrl: '/plantillas/qaa.html'
        }).
        when('/auto', {
            templateUrl: '/plantillas/auto.html'
        })/*.
        otherwise('/controlAngular');*/
    }
]);