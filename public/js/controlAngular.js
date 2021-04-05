eva.controller('ControlEvaController', function ($scope, $http, $sce) {
	//var controlList = this;
	$scope.listen = true;
	$scope.interacciones = [];
	$scope.resultadosMedia = [];
	$scope.errores = [];
	$scope.textoScript = 'textoScript';

	var socket = io.connect(window.location.host, { 'forceNew': true });
	socket.on('messages', function (data) {
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

	var iconoEmocion = ['meh-o', 'lightbulb-o', 'frown-o', 'heart-o', 'eye', 'smile-o', ''];

	$scope.indiceScript1 = 0;
	$scope.script = $scope.script2;

	$scope.resultadosMedia = [];

	$scope.renderHtml = function (htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};

	$scope.enviarQueryMedia = function () {
		socket.emit('new-message', { accion: 1, mensajePersonalizado: $scope.mensaje, autor: 'Robot Eva', class: "text-danger", queryMedia: $scope.queryMedia });
		$scope.queryMedia = '';
	}

	$scope.enviarQueryMedia2 = function (e) {
		let keyCode2 = (e.keyCode ? e.keyCode : e.which);
		if (keyCode2 == 13) {
			socket.emit('new-message', { accion: 1, mensajePersonalizado: $scope.mensaje, autor: 'Robot Eva', class: "text-danger", queryMedia: $scope.queryMedia });
			$scope.queryMedia = '';
			e.preventDefault();
		}
	};

	$scope.enviarMensaje = function () {
		$http.post('nodes', { type: 'speak', text: $scope.mensaje })
		.then(function (res) {
			notify('Frase procesada correctamente');
		}, function (error) {
			notify('A ocurrido un error al procesar la petición', 'danger');
		});
		$scope.mensaje = '';
	};

	$scope.enviarMensaje2 = function (e) {
		let keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 13) {
			socket.emit('new-message', { accion: 1, mensajePersonalizado: '<speak version="1.0"><prosody rate="-15%">' + $scope.mensaje + '</prosody></speak>', autor: 'Robot Eva', class: "text-danger", mensaje: $scope.mensaje });
			$scope.mensaje = '';
			e.preventDefault();
		}
	};

	$scope.enviarFrase = function (index) {
		socket.emit('new-message', { accion: 1, mensajePersonalizado: $scope.frases[index], autor: 'Robot Eva', class: "text-danger", mensaje: $scope.frases[index] });
	};

	$scope.enviarFrase2 = function (index) {
		socket.emit('new-message', { accion: 1, mensajePersonalizado: $scope.frases2[index], autor: 'Robot Eva', class: "text-danger", mensaje: $scope.frases2[index] });
	};


	$scope.enviarEmocion = function (emotion, level) {
		$http.post('/nodes', { type: 'emotion', emotion: emotion, level: level })
			.then(function (res) {
			}, function (error) {
				console.log(error);
			});
	};

	$scope.iniciarInteracciong = function (id) {
		$http.get('interaccion/' + id)
			.then(function (res) {
			}, function (error) {
				console.log(error);
			});
	};

	$scope.listinteracciones = function () {
		$http.get('/api/common?db=interaccion')
			.then(function (res) {
				$scope.interactions = res.data;
			}, function (error) {
				console.log(error);
			});
	};

	$scope.listinteracciones();

});
