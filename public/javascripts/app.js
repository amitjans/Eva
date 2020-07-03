var eva = angular.module('evaApp', ['ngRoute','dndLists']);
eva.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/controlAngular', {
            templateUrl: '/plantillas/controlAngular.html',
            activetab: "controlAngular"
        }).
        when('/interaccion', {
            templateUrl: '/plantillas/interaccion.html',
            activetab: "interaccion"
        }).
        when('/audio', {
            templateUrl: '/plantillas/audio.html',
            activetab: "audio"
        }).
        when('/script', {
            templateUrl: '/plantillas/script.html',
            activetab: "script"
        }).
        when('/scriptdata', {
            templateUrl: '/plantillas/scriptdata.html',
            activetab: "script"
        }).
        when('/qaa', {
            templateUrl: '/plantillas/qaa.html',
            activetab: "manual"
        }).
        when('/auto', {
            templateUrl: '/plantillas/auto.html',
            activetab: "manual"
        }).
        otherwise('/controlAngular');
    }
]).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
});