angular.module('evaApp', ['dndLists'])
	.controller('ControlEvaController', function ($scope, $http, $sce) {
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
			{
				accion: 2,
				nombre: 'saludo',
				comando: 'Eva saluda'
			},
			{
				accion: 3,
				nombre: 'refranes',
				comando: 'Eva quiero jugar a los refranes'
			},
			{
				accion: 4,
				nombre: 'chiste',
				comando: 'Eva cuentame un chiste'
			},
			{
				accion: 5,
				nombre: 'aplaudir',
				comando: 'Eva quiero que aplaudas'
			},
			{
				accion: 6,
				nombre: 'risa',
				comando: 'Eva quiero que te rias'
			},
			{
				accion: 7,
				nombre: 'correcto',
				comando: 'la respuesta es correcta'
			}
		];

		$scope.frases = ['Teresa. Vamos a escuchar a Roberto, por favor', 'Teresa, vamos a escuchar a Odilia, por favor', 'Teresa, cierra los ojos por favor.',
			'Gregorio. vamos a cerrar los ojos lentamente, por favor', 'Alexa', 'Los invito al evento de cierre. Es a las 9 en la UABC',
			'creo que eres una persona muy agradable', 'Me la estoy pasando de lo mejor',
			'Disfruto mucho platicar con ustedes, es un momento muy agradable',
			'Hola mi nombre es Eva, y soy un robot conversacional creado en CICESE'];


		$scope.canciones = [{ nombre: 'El Rey', artista: 'José Alfredo Jiménez', archivo: './sonidos/elrey.wav', reproduce: false, accion: 5, autor: 'Robot Eva', class: "text-danger" },
		{ nombre: 'Besame Mucho', artista: 'Andrea Bocelli', archivo: './sonidos/besamemucho.wav', reproduce: false, accion: 5, autor: 'Robot Eva', class: "text-danger" },
		{ nombre: 'María Bonita', artista: 'Agustín Lara', archivo: './sonidos/mariabonita.wav', reproduce: false, accion: 5, autor: 'Robot Eva', class: "text-danger" },
		{ nombre: 'Cielito Lindo', artista: 'Mariachi', archivo: './sonidos/cielitolindo.wav', reproduce: false, accion: 5, autor: 'Robot Eva', class: "text-danger" }]


		$scope.cursos = {
			selected: null,
			lists: {
				"Elementos": [{ label: 'Biología: Biodiversidad' }, { label: 'Química: Los desafíos de la química' },
				{ label: 'Física: Física Ondulatoria' }, { label: 'Matemáticas: Principios de simetría' }], "Script": []
			}
		};

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

		$scope.iniciarInteraccion1 = function () {
			$http.get('interaccion/iniciarInteraccion1')
				.then(function (res) {
					console.info('Inició interaccion con grupo 1');
				}, function (error) {
					console.log(error);
				});
			};

			$scope.iniciarInteraccion2 = function () {
				$http.get('interaccion/iniciarInteraccion2')
					.then(function (res) {
						console.info('Inició interaccion con grupo 2');
					}, function (error) {
						console.log(error);
					});
			};

			$scope.iniciarInteraccion3 = function () {
				$http.get('interaccion/iniciarInteraccion3')
					.then(function (res) {
						console.info('Inició interaccion con grupo 3');
					}, function (error) {
						console.log(error);
					});
			};

			$scope.iniciarInteraccion4 = function () {
				$http.get('interaccion/iniciarInteraccion4')
					.then(function (res) {
						console.info('Inició interaccion con grupo 4');
					}, function (error) {
						console.log(error);
					});
			};

			$scope.iniciarInteraccion5 = function () {
				$http.get('interaccion/iniciarInteraccion5')
					.then(function (res) {
						console.info('Inició interaccion con grupo 5');
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
				$http.get('/api/interaccion')
					.then(function (res) {
						$scope.interactions = res.data;
					}, function (error) {
						console.log(error);
					});
			};

			$scope.listinteracciones();

		});
