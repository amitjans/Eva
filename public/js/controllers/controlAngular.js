eva.controller("ControlEvaController", function ($scope, $http, $sce) {
  $scope.listen = true;
  $scope.interacciones = [];
  $scope.errores = [];
  $scope.textoScript = "textoScript";

  socket.on("messages", function (data) {
    $scope.$apply(function () {
      if (data.fecha) {
        $scope.interacciones.push(data);
        $scope.textoScript = data.mensaje;
        if (data.media) {
          if (data.media.type == 1) {
            $scope.tracks.push(data.media);
            cancionAnterior = data.media;
          }
        }
        if (data.error) {
          $scope.errores.push(data);
        }
      }
    });
  });

  $scope.renderHtml = function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };

  $scope.iniciarInteracciong = function (id) {
    $http.get("api/interaccion/" + id).then(function (res) { },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.listinteracciones = function () {
    $http.get("/api/common?db=interaccion").then(function (res) {
      $scope.interactions = res.data;
    },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.export = function () {
    let text = document.querySelector('#containerLogs').textContent
      .replaceAll(/(^[ \n]+|[ \n]+$)/ig, '').replaceAll(/[ ]+/ig, ' ')
      .replaceAll(/[\n]+/ig, '\n').replaceAll(/:[ \n]+/ig, ': ')
      .replaceAll(/(\n | \n)/gi, '\n');
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Log.txt");
  };

  $scope.listapps = function () {
    $http.get("https://eva-repository.onrender.com/api/apps").then(function (res) {
      $scope.apps = res.data.map(i => {
        return { id: i.id, description: i.description, name: i.name.substring(0, i.name.length - 4) };
      });
    }, function (error) {
      console.log(error);
    }
    );
  };

  $scope.infoApp = function (obj) {
    $scope.appDesc = obj;
    $('#infoApp').modal('show');
  };

  $scope.installApp = function (obj) {
    $('#infoApp').modal('hide');
    $http.get("https://eva-repository.onrender.com/api/apps/" + obj.id).then(function (res) {
      $http.post("api/interaccion/install", { data: res.data.content, name: obj.name }).then(function (res) {
        window.location.reload();
      }, function (error) {
        console.log(error);
      }
      );
    }, function (error) {
      console.log(error);
    }
    );
  };

  $scope.listinteracciones();
  $scope.listapps();
});
