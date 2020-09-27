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
        when('/voice', {
            templateUrl: '/plantillas/voice.html',
            activetab: "voice"
        }).
        when('/led', {
            templateUrl: '/plantillas/led.html',
            activetab: "led"
        }).
        when('/mov', {
            templateUrl: '/plantillas/mov.html',
            activetab: "mov"
        }).
        otherwise('/controlAngular');
    }
]).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
});