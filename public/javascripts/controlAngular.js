eva.controller('ControlEvaController', function ($scope, $http, $sce) {
	//var controlList = this;
	$scope.listen = true;
	$scope.interacciones = [];
	$scope.resultadosMedia = [];
	$scope.errores = [];
	$scope.opcionTrack = { nombre: 'track', tipo: 1 };
	$scope.opcionVideo = { nombre: 'video', tipo: 8 };
	$scope.opcionBuscar = $scope.opcionTrack;
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

	//$scope.emociones = ['normal', 'pensar', 'triste', 'amor', 'sorpresa', 'feliz', 'miedo'];
	$scope.emociones = ['normal', 'triste', 'triste1', 'triste2', 'ira', 'ira1', 'ira2', 'feliz', 'feliz1', 'feliz2', 'salir'];
	var iconoEmocion = ['meh-o', 'lightbulb-o', 'frown-o', 'heart-o', 'eye', 'smile-o', ''];
	$scope.conversaciones = [
		{ accion: 2, nombre: 'saludo', comando: 'Eva saluda' },
		{ accion: 3, nombre: 'refranes', comando: 'Eva quiero jugar a los refranes' },
		{ accion: 4, nombre: 'chiste', comando: 'Eva cuentame un chiste' },
		{ accion: 5, nombre: 'aplaudir', comando: 'Eva quiero que aplaudas' },
		{ accion: 6, nombre: 'risa', comando: 'Eva quiero que te rias' },
		{ accion: 7, nombre: 'correcto', comando: 'la respuesta es correcta' }
	];

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
		socket.emit('new-message', { accion: 1, mensajePersonalizado: '<speak version="1.0"><prosody rate="-15%">' + $scope.mensaje + '</prosody></speak>', autor: 'Robot Eva', class: "text-danger", mensaje: $scope.mensaje });
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


	$scope.enviarEmocion = function (tipoE) {
		$http.get('interaccion/iniciaremocion?e=' + tipoE)
			.then(function (res) {
				console.info('Inicio la emoción');
			}, function (error) {
				console.log(error);
			});
	};

	$scope.iniciarInteracciong = function (id) {
		$http.get('interaccion/iniciarInteracciong?id=' + id)
			.then(function (res) {
				console.info('Inició interaccion con grupo g');
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
