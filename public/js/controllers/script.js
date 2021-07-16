eva.controller("script", ["$scope", "$http", function ($scope, $http) {
  $scope.listado = [];
  $scope.sublist = [];
  $scope.temp = [];
  $scope.accion = locale().COMMON.ADD;
  $scope.icon = true;
  $scope.updateid;
  Object.assign($scope, dataTableValues());

  $scope.list = function () {
    $http.get("/api/common?db=script").then(function successCallback(response) {
      $scope.listado = response.data;
      $scope.dataTable();
    }, function errorCallback(response) { }
    );
  };

  $scope.create = function () {
    var json = { nombre: $scope.nombre };
    $http.post("/api/common?db=script", json).then(function successCallback(response) {
      $scope.clear();
      notify(locale().SCRIPT.NOTIFY.POST.SUCCESS);
    }, function errorCallback(response) {
      notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
    }
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
      $scope.clear();
      notify(locale().SCRIPT.NOTIFY.UPDATE.SUCCESS);
    }, function errorCallback(response) {
      notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
    }
    );
  };

  $scope.delete = function (id) {
    if (confirm(locale().COMMON.DELETE)) {
      $http.delete("/api/common/" + id + "?db=script").then(function successCallback(response) {
        $scope.list();
        notify(locale().SCRIPT.NOTIFY.DELETE.SUCCESS);
      }, function errorCallback(response) {
        notify(locale().SCRIPT.NOTIFY.ERROR, 'danger');
      });
    }
  };

  $scope.clear = function () {
    Object.assign($scope, { nombre: "", icon: true, accion: locale().COMMON.ADD });
    $("#myModal").modal("hide");
    $scope.list();
  };

  $scope.dataTable = function (way = 0) {
    Object.assign($scope, dataTable($scope.listado, $scope, way, 'nombre'));
  }

  $scope.list();
},
]);
