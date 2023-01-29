var eva = angular.module("evaApp", [
  "ngRoute",
  "dndLists",
  "pascalprecht.translate",
  "ngSanitize"
]);

var lang = { es: es, en: en, pt: pt, fr: fr, it: it, ja: ja };
function locale() {
  return lang[localStorage.getItem("lang") || "es"];
}

eva.config(function ($translateProvider) {
  let array = Object.keys(lang);
  for (let i = 0; i < array.length; i++) {
    $translateProvider.translations(array[i], lang[array[i]]);
  }
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.preferredLanguage(localStorage.getItem("lang") || "es");
});

eva.controller("menu", function ($scope, $rootScope, $translate, $http, $location) {

  $rootScope.loggedIn = false;

  $scope.changeLanguage = function (key) {
    localStorage.setItem("lang", key);
    $translate.use(key);
  };

  $scope.login = function () {
    window.location.href = "https://eva-social-robot.github.io/app.html#!/login?redirect=" + window.location
  };

  $scope.init = function () {
    if (window.location.href.includes('?')) {
      let values = window.location.href
        .split('?')[1]
        .split('&')
        .map(i => {
          let temp = i.split('=');
          return { key: temp[0], value: temp[1] }
        });
      sessionStorage.setItem('currentUser', JSON.stringify({ token: values[0].value }));
    }
    if (!!sessionStorage.getItem("currentUser")) {
      let token = JSON.parse(sessionStorage.getItem("currentUser")).token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      $rootScope.loggedIn = true;
      $rootScope.user = JSON.parse(atob(token.split('.')[1])).name || JSON.parse(atob(token.split('.')[1])).sub;
    }
  }
  $scope.init();
});

eva
  .config([
    "$locationProvider",
    "$routeProvider",
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("!");
      $routeProvider
        .when("/controlAngular", {
          templateUrl: "/plantillas/controlAngular.html",
          activetab: "controlAngular"
        })
        .when("/interaccion", {
          templateUrl: "/plantillas/interaccion.html",
          activetab: "interaccion"
        })
        .when("/audio", {
          templateUrl: "/plantillas/audio.html",
          activetab: "audio"
        })
        .when("/script", {
          templateUrl: "/plantillas/script.html",
          activetab: "script"
        })
        .when("/scriptdata", {
          templateUrl: "/plantillas/scriptdata.html",
          activetab: "script"
        })
        .when("/scriptdata/:id", {
          templateUrl: "/plantillas/scriptdata.html",
          activetab: "script"
        })
        .when("/voice", {
          templateUrl: "/plantillas/voice.html",
          activetab: "lang"
        })
        .when("/listen", {
          templateUrl: "/plantillas/listen.html",
          activetab: "lang"
        })
        .when("/led", {
          templateUrl: "/plantillas/led.html",
          activetab: "led"
        })
        .when("/mov", {
          templateUrl: "/plantillas/mov.html",
          activetab: "mov"
        })
        .when("/woo", {
          templateUrl: "/plantillas/woo.html",
          activetab: "woo"
        })
        .when("/cloud", {
          templateUrl: "/plantillas/cloud.html",
          activetab: "config"
        })
        .when("/config", {
          templateUrl: "/plantillas/config.html",
          activetab: "config"
        })
        .when("/images", {
          templateUrl: "/plantillas/images.html",
          activetab: "images"
        })
        .otherwise("/controlAngular");
    },
  ])
  .run(function ($rootScope, $route) {
    $rootScope.$route = $route;
  });
