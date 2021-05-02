eva.controller("ControlEvaController", function ($scope, $http, $sce) {
  //var controlList = this;
  $scope.listen = true;
  $scope.interacciones = [];
  $scope.errores = [];
  $scope.textoScript = "textoScript";

  var socket = io.connect(window.location.host, { forceNew: true });
  socket.on("messages", function (data) {
    $scope.$apply(function () {
      if (data.fecha) {
        console.log(data);
        //data.fecha = Date.now();
        console.log(data);
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

  var iconoEmocion = [
    "meh-o",
    "lightbulb-o",
    "frown-o",
    "heart-o",
    "eye",
    "smile-o",
    "",
  ];

  $scope.renderHtml = function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };

  $scope.enviarMensaje = function () {
    $http.post("nodes", { type: "speak", text: $scope.mensaje }).then(
      function (res) {
        notify("Frase procesada correctamente");
      },
      function (error) {
        notify("A ocurrido un error al procesar la petición", "danger");
      }
    );
    $scope.mensaje = "";
  };

  $scope.iniciarInteracciong = function (id) {
    $http.get("interaccion/" + id).then(
      function (res) {},
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.listinteracciones = function () {
    $http.get("/api/common?db=interaccion").then(
      function (res) {
        $scope.interactions = res.data;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.export = function () {
    let filename = "Log.txt";
	let text = document.querySelector('#containerLogs')
	.textContent
	.replaceAll(/(^[ \n]+|[ \n]+$)/ig, '')
	.replaceAll(/[ ]+/ig, ' ')
	.replaceAll(/[\n]+/ig, '\n')
	.replaceAll(/:[ \n]+/ig, ': ')
	.replaceAll(/(\n | \n)/gi, '\n');
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  $scope.listinteracciones();
});
