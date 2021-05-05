eva.controller("script", ["$scope", "$http", function ($scope, $http) {
    $scope.listado = [];
    $scope.accion = locale().COMMON.ADD;
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
      $http.get("/api/common?db=script").then(function successCallback(response) {
          $scope.listado = response.data;
        },
        function errorCallback(response) {}
      );
    };

    $scope.create = function () {
      var json = { nombre: $scope.nombre };
      $http.post("/api/common?db=script", json).then(function successCallback(response) {
          $scope.nombre = "";
          $("#myModal").modal("hide");
          $scope.list();
        },
        function errorCallback(response) {}
      );
    };

    $scope.update = function (l) {
      $scope.nombre = l.nombre;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = locale().COMMON.EDIT;
      $("#myModal").modal("show");
    };

    $scope.updatesend = function () {
      var json = { nombre: $scope.nombre };
      $http.put("/api/common/" + $scope.updateid + "?db=script", json).then(function successCallback(response) {
          $scope.nombre = "";
          $scope.icon = true;
          $("#myModal").modal("hide");
          $scope.list();
          $scope.accion = locale().COMMON.ADD;
        },
        function errorCallback(response) {}
      );
    };

    $scope.delete = function (id) {
      $http.delete("/api/common/" + id + "?db=script").then(function successCallback(response) {
          $scope.list();
        },
        function errorCallback(response) {}
      );
    };

    $scope.clear = function () {
      Object.assign($scope, { nombre: "", icon: true, accion: locale().COMMON.ADD });
      $("#myModal").modal("hide");
      $scope.list();
    };

    $scope.list();
  },
]);
