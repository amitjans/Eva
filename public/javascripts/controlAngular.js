angular.module('evaApp',['dndLists'])
	.controller('ControlEvaController', function($scope,$http,$sce){
		//var controlList = this;
		$scope.listen = true;
		$scope.interacciones = [];
		$scope.resultadosMedia = [];
		$scope.errores = [];
		$scope.opcionTrack = {nombre:'track',tipo:1};
		$scope.opcionVideo = {nombre:'video',tipo:8};
		$scope.opcionBuscar = $scope.opcionTrack;
		$scope.textoScript = 'textoScript';

		var socket = io.connect(window.location.host, { 'forceNew': true });		
		socket.on('messages', function(data) {
			$scope.$apply(function(){
				if(data.fecha){
                console.log(data);
				//data.fecha = Date.now();
				console.log(data);
				$scope.interacciones.push(data);
				$scope.textoScript = data.mensaje;
				if(data.media){
					if(data.media.type == 1){
						$scope.tracks.push(data.media);
						cancionAnterior = data.media;
						}
				}
				if(data.error){
					$scope.errores.push(data);
				}
                }
			});
		});

		$scope.emociones = ['normal','pensar','triste','amor','sorpresa','feliz','miedo'];
		var iconoEmocion = ['meh-o','lightbulb-o','frown-o','heart-o','eye','smile-o',''];
		$scope.conversaciones = [
			{
				accion: 2,
				nombre: 'saludo',
				comando:'Eva saluda'
			},
			{
				accion: 3,
				nombre:'refranes',
				comando:'Eva quiero jugar a los refranes'
			},
			{
				accion: 4,
				nombre:'chiste',
				comando:'Eva cuentame un chiste'
			},
			{
				accion: 5,
				nombre:'aplaudir',
				comando:'Eva quiero que aplaudas'
			},
			{
				accion: 6,
				nombre:'risa',
				comando:'Eva quiero que te rias'
			},
			{
				accion: 7,
				nombre:'correcto',
				comando:'la respuesta es correcta'
			}
		];

		$scope.frases = ['Teresa. Vamos a escuchar a Roberto, por favor','Teresa, vamos a escuchar a Odilia, por favor','Teresa, cierra los ojos por favor.',
        'Gregorio. vamos a cerrar los ojos lentamente, por favor', 'Alexa', 'Los invito al evento de cierre. Es a las 9 en la UABC',
			'creo que eres una persona muy agradable','Me la estoy pasando de lo mejor',
		'Disfruto mucho platicar con ustedes, es un momento muy agradable',
	'Hola mi nombre es Eva, y soy un robot conversacional creado en CICESE'];


		$scope.canciones = [{nombre:'El Rey', artista:'José Alfredo Jiménez',archivo:'./sonidos/elrey.wav', reproduce:false, accion:5,autor:'Robot Eva', class:"text-danger"},
		{nombre:'Besame Mucho', artista:'Andrea Bocelli',archivo:'./sonidos/besamemucho.wav', reproduce:false, accion:5,autor:'Robot Eva', class:"text-danger"},
		{nombre:'María Bonita', artista:'Agustín Lara',archivo:'./sonidos/mariabonita.wav', reproduce:false, accion:5,autor:'Robot Eva', class:"text-danger"},
		{nombre:'Cielito Lindo', artista:'Mariachi',archivo:'./sonidos/cielitolindo.wav', reproduce:false, accion:5,autor:'Robot Eva', class:"text-danger"}]


		$scope.cursos = {
        selected: null,
        lists: {"Elementos": [{label:'Biología: Biodiversidad'},{label:'Química: Los desafíos de la química'},
        {label:'Física: Física Ondulatoria'},{label:'Matemáticas: Principios de simetría'}], "Script": []}
    };

		$scope.indiceScript1 = 0;


				$scope.script1 = [
        {frase:'¡Hola! buenos días a todos.'},
				{frase:'Mi nombre es Eva.'},
        {frase:'¿Se acuerdan de mí?'},
				{frase:'Que bien, yo también me acuerdo mucho de ustedes.'},
        {frase:'Hoy vengo a cantar y platicar con ustedes'},
        {frase:'por cierto, hoy se ven muy bien.'},
        {frase:'Es un placer volverlos a ver.'},
        {frase:'Hola Julieta. te ves muy bien hoy.'},
        {frase:'Amalia. que gusto volverte a ver, te ves muy alegre.'},
        {frase:'Hola Gregorio. Luces muy bien, un gusto saludarte.'},
        {frase:'¿Saben?. Hoy tengo muchas ganas de cantar.'},
        {frase:'¿Les parece si cantamos una canción?'},

				{frase:'Julieta. ¿Te gustaría escuchar a Los panchos o a Agustín Lara?'},
        {frase:'Muy bien. Esta canción se llama. Amor de mis amores de Agustín Lara.'},
        {frase:'Muy bien. Esta canción se llama. Sin Ti de los panchos'},
        {frase:'Vamos a cantar todos.'},
        {frase:'Amalia. Te sabes muy bien la letra.'},
        {frase:'Julieta. En realidad cantas muy bien.'},
        {frase:'Gregorio. Tu voz se oye muy bien.'},
        {frase:'Los tres cantan muy bien.'},
        {frase:'Vamos a brindarnos un fuerte y caluroso aplauso.'},

				{frase:'A Agustín Lara le gustaba mucho Acapulco, que es un puerto muy bonito.'},
        {frase:'Por cierto. Julieta tu eres de Mazatlán ¿verdad?'},
        {frase:'Mazatlán es un puerto muy grande y bonito.'},
        {frase:'La gente es muy alegre en Mazatlán, ¿verdad Julieta?'},
        {frase:'Por cierto. El carnaval de Mazatlán es muy grande ¿verdad Julieta?'},
        {frase:'Julieta. ¿Qué es lo que más te gusta del carnaval de Mazatlán?'},
        {frase:'Julieta. ¿Conoces la playa de Olas Altas?'},
        {frase:'Creo que el carnaval es una fiesta muy bonita.'},
        {frase:'Quisiera conocer un carnaval alguna vez.'},
        {frase:'Me gustaría cantar otra canción. ¿Les parece?'},

				{frase:'Amalia. ¿Te gustaría escuchar, Cien años de Pedro Infante o Nobleza de Javier Solís?'},
        {frase:'Muy bien. Vamos a cantarla todos.'},
        {frase:'Amalia. cantas precioso.'},
        {frase:'Julieta. Tienes una voz hermosa.'},
        {frase:'Gregorio. Espero y estes disfrutando la canción'},
        {frase:'Bravo, los tres cantan muy bien.'},
        {frase:'Un fuerte y caluroso aplauso para las tres'},

				{frase:'Javier Solís canta una canción que se llama Veracruz.'},
        {frase:'Ahora que recuerdo. Amalia. tú eres jarocha ¿verdad?'},
        {frase:'Amalia ¿En Veracruz la gente es muy alegre como tú?'},
        {frase:'Amalia. ¿Qué lugares me recomiendas visitar en Veracruz?'},
        {frase:'En Veracruz también hay carnaval. ¿verdad Amalia?'},
        {frase:'Amalia. ¿Qué es lo que más te gusta del carnaval de Veracruz?'},
        {frase:'Amalia. ¿Qué música bailas y cantas en el carnaval?'},
        {frase:'Por lo que me platicas. Me encantaría conocer Veracruz.'},
        {frase:'Vamos a echarnos otra canción. ¿Les parece?'},

				{frase:'Gregorio. ¡Vamos a escuchar una de Agustín Lara! ¿Te parece?'},
        {frase:'Esta canción se llama Veracruz de Agustín Lara'},
        {frase:'Vamos a cantarla todos.'},
        {frase:'Gregorio. Me gusta mucho esta canción'},
        {frase:'Amalia. Cantas muy bien.'},
        {frase:'Julieta. Cantas con sentimiento.'},
        {frase:'Me gusta mucho como cantan los tres'},
        {frase:'Se merecen un fuerte aplauso por sus voces'},

				{frase:'Gregorio. ¿Usted vivió en Veracruz, verdad?'},
        {frase:'Gregorio. ¿Qué es lo que le gusta de Veracruz?'},
				{frase:'Gregorio. ¿Usted nació en San Luis Potosí, verdad?'},
        {frase:'Gregorio. ¿Qué es lo que le gusta de San Luis Potosí?'},
        {frase:'Gregorio. ¿Usted trabajó en la Secretaría de Recursos Hidráulicos, verdad?'},
        {frase:'Gregorio. ¿Qué le gustaba trabajar en la Secretaría de Recursos Hidráulicos?'},
				{frase:'Gregorio. ¿Usted viajó por todo México, verdad?'},
				{frase:'Gregorio. ¿Qué otros lugares ha conocido?'},
				{frase:'Todo lo que me platicas es muy interesante, Gregorio.'},
        {frase:'Me gusta mucho platicar con ustedes'},

        {frase:'Ahora. Me gustaría que me ayuden a completar unos refranes. ¿Les parece?'},
				{frase:'Yo digo una parte del refrán. Y ustedes me ayudan a completarlo.'},
        {frase:'Muy bien. Aquí va el primero'},
        {frase:'¿Agua que no has de beber?'},
        {frase:'Excelente, tienen una muy buena memoria. El refrán completo es. Agua que no has de beber, déjala correr.'},
        {frase:'Vamos con el siguiente. '},
        {frase:'¿Más vale pájaro en mano?'},
        {frase:'Que buenos son para esto. El refrán es. Más vale pájaro en mano, que ver un ciento volando.'},
        {frase:'Aquí va el último. ¿listos?'},
        {frase:'¿Camarón que se duerme?'},
        {frase:'Muy bien. El refrán completo es Camarón que se duerme, se lo lleva la corriente.'},
				{frase:'Pero también puede ser. Camarón que se duerme, lo hacen coctel.'},
				{frase:'Se merecen un fuerte aplauso, por completar los refranes.'},

				/*{frase:'Quiero aprender nuevos refranes. ¿Me ayudan?'},
				{frase:'Amalia. ¿Te sabes algún otro refrán?'},
				{frase:'Gregorio. ¿y tú? ¿Te sabes algún otro refrán?'},
				{frase:'Julieta. ¿Tú si te sabes otro refrán, verdad?'},*/

				{frase:'Ahora. Vamos a hacer unos ejercicios de respiración.'},
				{frase:'Respirar es muy bueno para la salud. y nos ayuda a relajarnos.'},
				{frase:'Primero, quiero que escuchen atentamente'},
        {frase:'Quiero que cierren lentamente los ojos'},
				{frase:'Vamos a concentrarnos'},
        {frase:'Por favor, vamos a cerrar nuestros ojos'},

				{frase:'¿Cómo se sienten?'},
        {frase:'¿Les gustó?'},
        {frase:'Bueno, Me tengo que ir porque ya es casi hora de comer.'},
        {frase:'Disfruté mucho de su compañía.'},
        {frase:'Me la paso muy bien cantando y pláticando con ustedes'},
        {frase:'Nos vemos el próximo Jueves.'},
        {frase:'Cuídense mucho y que disfruten su rica y deliciosa comida'},
        {frase:'Hasta luego Gregorio. Fue un placer platicar contigo'},
				{frase:'Hasta pronto Amalia. Disfrute mucho platicar y cantar contigo.'},
				{frase:'Nos vemos pronto Julieta. Me encanta platicar contigo'},
				{frase:'Adiós y que tengan un excelente día'}
            ];

						$scope.script2 = [
						{frase:'¡Hola! buenos días a todos.'},
						{frase:'Mi nombre es Eva.'},
						{frase:'¿Se acuerdan de mí?'},
						{frase:'Que bien, yo también me acuerdo mucho de ustedes.'},
						{frase:'Hoy vengo a cantar y platicar con ustedes'},
						{frase:'por cierto, hoy se ven muy bien.'},
						{frase:'Es un placer volverlos a ver.'},
						{frase:'Hola Odilia. hoy te ves muy bien y muy alegre.'},
						//{frase:'Hola Roberto. que bueno que te animaste a venir'},
						{frase:'Hola Agustín. hoy te ves excelente.'},
						{frase:'¿Saben?. Hoy tengo muchas ganas de cantar.'},
						{frase:'¿Les parece si cantamos una canción?'},

						{frase:'Odilia. ¿Qué canción de los Panchos te gustaría escuchar?'},
		        {frase:'Odilia cantas precioso.'},
		        {frase:'Agustín cantas con mucho sentimiento y muy bonito.'},
		        //{frase:'Eduardo espero que estes disfrutando.'},
		        {frase:'Bravo, me encanta como cantan.'},
		        {frase:'Vamos a darnos un fuerte y caluroso aplauso'},


		        {frase:'Odilia. ¿tú eres de Agua prieta o de Naco?'},
		        {frase:'¿Y a los cuántos años se vino a Ensenada?'},
		        {frase:'Odilia. ¿en qué trabajó en Ensenada?'},
		        {frase:'Odilia. ¿trabajó en la empacadora del pacífico?'},
		        {frase:'Odilia. ¿En qué trabajaba con Don Pancho Álvarez?'},
		        {frase:'Odilia. ¿Es sabroso el abulón?'},
		        {frase:'Odilia ¿Y es caro el abulón?'},
						{frase:'Odilia ¿Es cierto que puede costar dos mil pesos una lata de abulón?'},
		        {frase:'Odilia. ¿Cómo te gusta comer el abulón?'},
		        {frase:'Odilia. ¿Qué recetas se sabe con abulón?'},
		        {frase:'uummm Que rico, suena muy sabroso todo eso Odilia'},
						{frase:'¿Les parece si cantamos otra canción?'},

						/*{frase:'Eduardo. ¿Qué canción te gustaría escuchar?'},
						{frase:'Muy bien. Vamos a cantarla todos.'},
						//{frase:'Agustín. Cantas muy bien y con sentimiento'},
						{frase:'Odilia. Es un placer escucharte.'},
						{frase:'Eduardo. Espero y estes disfrutando la canción.'},
						{frase:'Me gusta mucho como cantan'},
						{frase:'Se merecen un fuerte aplauso por sus voces'},

						{frase:'Eduardo. ¿De dónde eres?'},
						{frase:'Eduardo. ¿Y qué lugares me recomiendas visitar en '},
						{frase:'Eduardo. ¿Es cierto que viviste en Los Ángeles, California?'},
						{frase:'Eduardo. ¿Qué lugar me recomendarías visitar en Los Ángeles?'},
						{frase:'Eduardo. ¿En qué trabajabas en Los Ángeles?'},
						{frase:'Oye Eduardo. ¿Sabías que los Ángeles es la segunda ciudad más grande de Estados unidos?'},
						{frase:'Oye Eduardo. ¿Cuál crees que sea la ciudad más grande?'},
						{frase:'Eduardo, además ¿Sabías que Los Ángeles tiene dos equipos profesionales en cada uno de los principales deportes en Estados Unidos?'},
						{frase:'Por cierto ¿Eduardo te gustan los deportes?'},
						{frase:'Eduardo ¿Cuál es tu deporte favorito?'},
						{frase:'¿y a qué equipo le vas Eduardo?'},
						{frase:'Eduardo ¿has ido a algún partido de los '},
						{frase:'¡Guau que padre! Es muy interesante todo lo que me platicas Eduardo'},*/

						{frase:'Agustín. ¿Le gustaría escuchar una canción de Agustín Lara o de Pedro Infante?'},
						{frase:'Muy bien vamos a cantar todos esta bonita canción'},
						{frase:'Isabel, canta conmigo.'},
						{frase:'Irma tienes una bonita voz.'},
						{frase:'Agustín en verdad cantas muy bien.'},
						{frase:'Bravo, los tres cantan hermoso.'},
						{frase:'Vamos a darnos un fuerte y caluroso aplauso'},


						{frase:'Agustín. ¿es cierto que usted es de Torreón Coahuila?'},
						{frase:'Agustín. Me imagino que Torreón es una ciudad grande y bonita.'},
						{frase:'Agustín. ¿Qué lugar me recomienda de Torreón?'},
						{frase:'Agustín. ¿Usted es mesero, verdad?'},
						{frase:'Agustín. ¿Usted trabajó en el hotel Gilton de Guadalajara, verdad?'},
						{frase:'Agustín. Guadalajara es muy bonito ¿verdad?'},
						{frase:'Agustín. ¿Qué le gusta más, los chilaquiles o las tortas ahogadas?'},
						{frase:'Agustín. ¿Qué le pone a los chilaquiles?'},
						{frase:'Agustín. ¿Qué le pone a las tortas ahogadas?'},
						{frase:'Agustín ¿Qué otra comida de Torreón, Coahuila me recomienda?'},
						{frase:'Que rico suena todo.'},
						{frase:'Espero poder probarlo alguna vez.'},
						{frase:'Hoy tengo muchas ganas de cantar.'},
						{frase:'¿Les parece si cantamos otra canción?'},

						/*{frase:'Teresa. ¿Recuerdo que te gusta mucho la Malagueña? ¿Te gustaría cantarla?'},
						{frase:'Muy bien. Vamos a cantarla todos.'},
						{frase:'Teresa. cantas precioso pareces artista.'},
						{frase:'Odilia. Tienes una voz hermosa.'},
						{frase:'Roberto. cantas con mucho sentimiento'},
						{frase:'Bravo, los tres cantan muy bien.'},
						{frase:'Un fuerte y caluroso aplauso para las tres'},

						{frase:'Teresa. ¿Tú eres de la ciudad de México, verdad?'},
						{frase:'Teresa. ¿Qué es lo que más te gusta de México?'},
						{frase:'Teresa. ¿Qué lugares me recomiendas visitar en ciudad de México?'},
						{frase:'¿Eres enfermera, verdad Teresa?'},
						{frase:'Teresa. ¿Quién te enseñó el oficio de la enfermería?'},
						{frase:'Me imagino que eras muy buena enfermera. ¿verdad Teresa?'},
						{frase:'Teresa. ¿Qué es lo que más te gusta de ser enfermera?'},
						{frase:'Teresa. ¿Trabajabas en el seguro social?'},
						{frase:'Felicidades, es muy interesante todo lo que me platicas Teresa'},
						{frase:'Vamos a echarnos otra canción. ¿Les parece?'},*/

						{frase:'Roberto. ¿Te parece si escuchamos a Pedro Infante?'},
						{frase:'Roberto. ¿Te gustaría escuchar cien años o amorcito corazón?'},
						{frase:'Muy bien. Vamos a cantarla todos.'},
						{frase:'Roberto. Cantas muy bien y con sentimiento'},
						{frase:'Teresa. Es un placer escucharte.'},
						{frase:'Odilia. Cantas muy pero muy bonito.'},
						{frase:'Me gusta mucho como cantan los dos'},
						{frase:'Se merecen un fuerte aplauso por sus voces'},

						//{frase:'Roberto. ¿Usted vivió en Cuernavaca, verdad?'},
						{frase:'¿Usted era taxista, verdad Roberto?'},
						{frase:'Roberto. ¿Qué es lo que más disfrutaba de ser taxista?'},
						//{frase:'Roberto. ¿Conoció a alguien famoso mientras era taxista?'},
						{frase:'Roberto. ¿En Ensenada También era chofer,verdad?'},
						{frase:'Roberto. ¿Le gusta mucho manejar, verdad?'},
						{frase:'Roberto. ¿Qué lugares ha conocido siendo chofer?'},
						{frase:'Roberto. ¿Cuál es lugar más lejano al que ha ido manejando?'},
						{frase:'Roberto. ¿Cuántas horas son manejando?'},
						{frase:'Roberto. ¿Cómo le hace para aguantar tanto manejando?'},
						//{frase:'Roberto. ¿Qué lugares me recomendaría visitar en Baja California?'},
						//{frase:'Roberto. De todos los lugares que conoce ¿Cuál es su favorito?'},
						//{frase:'Roberto. ¿Por qué es su favorito '},
						//{frase:'Roberto. ¿Ha viajado al extranjero?'},
						{frase:'Roberto. Ahora recuerdo que me dijiste que tienes sangre alemana. ¿verdad?'},
						{frase:'Roberto. Sabías que. Alemania es considerada la quinta mayor economía del mundo, y la más grande de Europa.'},
						{frase:'Roberto. Sabías que. En Alemania la cerveza se clasifica oficialmente como comida y no bebida.'},
						{frase:'Roberto. ¿Por qué crees que los alemanes sean tan productivos?'},
						{frase:'Roberto. ¿Sabes hablar alemán?'},
						{frase:'Roberto. ¿ME puedes enseñar una frase bonita?'},
						{frase:'Roberto. ¿Qué significa?'},
						{frase:'guau, su vida es muy pero muy interesante Roberto. ME gusta mucho platicar con usted'},
						{frase:'¿Saben?. Me gusta mucho platicar con ustedes'},

						/*{frase:'Julieta. ¿Te gustaría escuchar a Los panchos o a Agustín Lara?'},
		        {frase:'Muy bien. Esta canción se llama. Amor de mis amores de Agustín Lara.'},
		        {frase:'Muy bien. Esta canción se llama. Sin Ti de los panchos'},
		        {frase:'Vamos a cantar todos.'},
		        {frase:'Amalia. Te sabes muy bien la letra.'},
		        {frase:'Julieta. En realidad cantas muy bien.'},
		        {frase:'Gregorio. Tu voz se oye muy bien.'},
		        {frase:'Los tres cantan muy bien.'},
		        {frase:'Vamos a brindarnos un fuerte y caluroso aplauso.'},*/

						{frase:'Ahora. Me gustaría que me ayuden a completar unos refranes. ¿Les parece?'},
						{frase:'Yo digo una parte del refrán. Y ustedes me ayudan a completarlo.'},
						{frase:'Muy bien. Aquí va el primero'},
						{frase:'¿Al nopal solo lo visitan?'},
						{frase:'Excelente, tienen una muy buena memoria. El refrán completo es Al nopal solo lo visitan, cuando tiene tunas.'},
						{frase:'Vamos con el siguiente. '},
						{frase:'¿Más vale pájaro en mano?'},
						{frase:'Que buenos son para esto. El refrán es Más vale pájaro en mano, que ver un ciento volando.'},
						{frase:'Aquí va el último. ¿listos?'},
						{frase:'¿Camarón que se duerme?'},
						{frase:'Muy bien. El refrán completo es Camarón que se duerme, se lo lleva la corriente.'},
						{frase:'Pero también puede ser. Camarón que se duerme, amanece en coctel.'},
						{frase:'Se merecen un fuerte aplauso, por completar los refranes.'},

						/*{frase:'Quiero aprender nuevos refranes. ¿Me ayudarían?'},
						{frase:'Teresa. ¿Te sabes algún otro refrán?'},
						{frase:'Odilia. ¿y tú? ¿Te sabes algún otro refrán?'},
						{frase:'Roberto. ¿Tú si te sabes otro refrán, verdad?'},*/

						{frase:'Ahora. Vamos a hacer unos ejercicios de respiración.'},
						{frase:'Respirar es muy bueno para la salud. y nos ayuda a relajarnos.'},
						{frase:'Primero, quiero que escuchen atentamente'},
						{frase:'Quiero que cierren lentamente los ojos'},
						{frase:'Vamos a concentrarnos'},
						{frase:'Por favor, vamos a cerrar nuestros ojos'},

						{frase:'¿Cómo se sienten?'},
						{frase:'¿Les gustó?'},
						{frase:'Bueno, Me tengo que ir porque ya es casi hora de comer.'},
						{frase:'Disfruté mucho de su compañía.'},
						{frase:'Me la paso muy bien cantando y pláticando con ustedes'},
						{frase:'Nos vemos la próxima semana.'},
						{frase:'Cuídense mucho y que disfruten su rica y deliciosa comida'},
						//{frase:'Hasta luego , espero que te la hayas pasado bien y verte más seguido.'},
						{frase:'Hasta luego Agustín, que tengas un bonito día.'},
						{frase:'Hasta pronto Odilia, siempre es un gusto platicar y cantar contigo'},
						//{frase:'Hasta pronto. Teresa'},
						{frase:'Adiós y que tengan un excelente día'}
								];

								$scope.script3 = [
								{frase:'¡Hola! buenos días a todos.'},
								{frase:'Mi nombre es Eva.'},
								{frase:'¿Se acuerdan de mí?'},
								{frase:'Que bien, yo también me acuerdo mucho de ustedes.'},
								{frase:'Hoy vengo a cantar y platicar con ustedes'},
								{frase:'por cierto, hoy se ven muy bien.'},
								{frase:'Es un placer volverlos a ver.'},
								{frase:'Hola Agustín. hoy te ves muy bien y muy alegre.'},
								{frase:'Hola Isabel. hoy te ves excelente. Mucho gusto de conocerte'},
								{frase:'Hola Irma. encantada de verte y saludarte. Luce muy bien tu cabello'},
								{frase:'¿Saben?. Hoy tengo muchas ganas de cantar.'},
								{frase:'¿Les parece si cantamos una canción?'},

								{frase:'Agustín. ¿Le gustaría escuchar una canción de Agustín Lara o de Pedro Infante?'},
								{frase:'Muy bien vamos a cantar todos esta bonita canción'},
								{frase:'Isabel, canta conmigo.'},
								{frase:'Irma tienes una bonita voz.'},
								{frase:'Agustín en verdad cantas muy bien.'},
								{frase:'Bravo, los tres cantan hermoso.'},
								{frase:'Vamos a darnos un fuerte y caluroso aplauso'},


								{frase:'Agustín. ¿es cierto que usted es de Torreón Coahuila?'},
				        {frase:'Agustín. Me imagino que Torreón es una ciudad grande y bonita.'},
				        {frase:'Agustín. ¿Qué lugar me recomienda de Torreón?'},
								{frase:'Agustín. ¿Usted es mesero, verdad?'},
								{frase:'Agustín. ¿Usted trabajó en el hotel Gilton de Guadalajara, verdad?'},
								{frase:'Agustín. Guadalajara es muy bonito ¿verdad?'},
				        {frase:'Agustín. ¿Qué le gusta más, los chilaquiles o las tortas ahogadas?'},
				        {frase:'Agustín. ¿Qué le pone a los chilaquiles?'},
								{frase:'Agustín. ¿Qué le pone a las tortas ahogadas?'},
				        {frase:'Agustín ¿Qué otra comida de Guadalajara me recomienda?'},
				        {frase:'Que rico suena todo.'},
				        {frase:'Espero poder probarlo alguna vez.'},
								{frase:'Hoy tengo muchas ganas de cantar.'},
								{frase:'¿Les parece si cantamos otra canción?'},

								{frase:'Irma. ¿Le gustaría escuchar la malagueña?'},
								//{frase:'Irma. ¿Que canción de José José quieres escuchar?'},
								{frase:'Muy bien. Vamos a cantarla todos.'},
								{frase:'Irma. cantas precioso pareces artista.'},
								{frase:'Isabel. espero que te guste esta canción.'},
								{frase:'Agustín. Le pones mucho sentimiento'},
								{frase:'Bravo, los tres cantan muy bien.'},
								{frase:'Un fuerte y caluroso aplauso para las tres'},

								{frase:'Irma. ¿Tú eres de Guadalajara, verdad?'},
								{frase:'Irma. Sabías que a Guadalajara, le dicen la perla de occidente'},
								{frase:'Irma. ¿Trabajaste para productos estánley jom, verdad?'},
								{frase:'Irma. ¿Qué tipo de productos vendías?'},
								{frase:'Irma. ¿Hacías demostraciones de los productos para vender?'},
								{frase:'Me imaginó que eras muy buena vendedora, ¿verdad Irma?'},
								{frase:'Irma. ¿Ganaste algún premio por vender esos productos?'},
								{frase:'Irma. ¿Qué es lo que más te gustaba de vender esos productos?'},
								{frase:'Irma. ¿Conociste muchos lugares en esa época?'},
								{frase:'Irma. ¿Te gustan mucho las flores, verdad?'},
								{frase:'Irma. ¿Qué flor es tu favorita?'},
								{frase:'Felicidades, es muy interesante y me gusta todo lo que me platicas Irma'},
								{frase:'Vamos a echarnos otra canción. ¿Les parece?'},

								/*{frase:'Odilia. ¿Qué canción de los Panchos te gustaría escuchar?'},
				        {frase:'Odilia cantas precioso.'},
				        {frase:'Teresa tienes una voz hermosa.'},
				        {frase:'Roberto en verdad cantas muy bien.'},
				        {frase:'Bravo, los dos cantan excelente.'},
				        {frase:'Vamos a darnos un fuerte y caluroso aplauso'},


				        {frase:'Odilia. ¿tú eres de Agua prieta o de Naco?'},
				        {frase:'¿Y a los cuántos años se vino a Ensenada?'},
				        {frase:'Odilia. ¿en qué trabajó en Ensenada?'},
				        {frase:'Odilia. ¿trabajó en la empacadora del pacífico?'},
				        {frase:'Odilia. ¿En qué trabajaba con Don Pancho Álvarez?'},
				        {frase:'Odilia. ¿Es sabroso el abulón?'},
				        {frase:'Odilia ¿Y es caro el abulón?'},
				        {frase:'Odilia. ¿Cómo te gusta comer el abulón?'},
				        {frase:'Odilia. ¿Qué recetas se sabe con abulón?'},
				        {frase:'uummm Que rico, suena muy sabroso todo eso Odilia'},
								{frase:'¿Les parece si cantamos otra canción?'},*/

								{frase:'Isabel. ¿Te parece si escuchamos a Antonio Aguilar?'},
								{frase:'Isabel. ¿Que canción de Antonio Aguilar te gustaría escuchar?'},
								{frase:'Muy bien. Vamos a cantarla todos.'},
								{frase:'Agustín. Cantas muy bien y con sentimiento'},
								{frase:'Irma. Es un placer escucharte.'},
								{frase:'Isabel. Cantas muy bien.'},
								{frase:'Me gusta mucho como cantan los tres'},
								{frase:'Se merecen un fuerte aplauso por sus voces'},

								/*{frase:'Eduardo. ¿Qué canción te gustaría escuchar?'},
								{frase:'Muy bien. Vamos a cantarla todos.'},
								{frase:'Agustín. Cantas muy bien y con sentimiento'},
								{frase:'Irma. Es un placer escucharte.'},
								{frase:'Eduardo. Espero y estes disfrutando la canción.'},
								{frase:'Me gusta mucho como cantan'},
								{frase:'Se merecen un fuerte aplauso por sus voces'},

								{frase:'Eduardo. ¿De dónde eres?'},
								{frase:'Eduardo. ¿Y qué lugares me recomiendas visitar en '},
								{frase:'Eduardo. ¿Es cierto que viviste en Los Ángeles, California?'},
								{frase:'Eduardo. ¿Qué lugar me recomendarías visitar en Los Ángeles?'},
								{frase:'Eduardo. ¿En qué trabajabas en Los Ángeles?'},
								{frase:'Oye Eduardo. ¿Sabías que los Ángeles es la ciudad con más mexicanos en el mundo después de la ciudad de México?'},
								{frase:'Eduardo, además ¿Sabías que Los Ángeles tiene dos equipos profesionales en cada uno de los principales deportes en Estados Unidos?'},
								{frase:'Por cierto ¿Eduardo te gustan los deportes?'},
								{frase:'Eduardo ¿Cuál es tu deporte favorito?'},
								{frase:'¿y a qué equipo le vas Eduardo?'},
								{frase:'Eduardo ¿has ido a algún partido de los '},
								{frase:'¡Guau que padre! Es muy interesante todo lo que me platicas Eduardo'},*/

								{frase:'Isabel. ¿Usted es de Punta Prieta, verdad?'},
								{frase:'Isabel. ¿Cómo es Punta Prieta?'},
								{frase:'¿A los cuántos años llego a Ensenada?'},
								//{frase:'Isabel. ¿Qué me recomienda visitar en Ensenada?'},
								{frase:'Isabel. ¿Qué es lo que más le gusta de Ensenada?'},
								{frase:'Isabel. ¿Qué tipo de comida le gusta más?'},
								{frase:'Isabel. ¿Me puede dar la receta de algo rico?'},
								{frase:'guau, gracias por esa deliciosa receta Isabel.'},
								{frase:'¿Saben?. Me gusta mucho platicar con ustedes'},

								{frase:'Ahora. Me gustaría que me ayuden a completar unos refranes. ¿Les parece?'},
								{frase:'Yo digo una parte del refrán. Y ustedes me ayudan a completarlo.'},
								{frase:'Muy bien. Aquí va el primero'},
								{frase:'¿Agua que no has de beber?'},
								{frase:'Excelente, tienen una muy buena memoria. El refrán completo es Agua que no has de beber, déjala correr.'},
								{frase:'Vamos con el siguiente. '},
								{frase:'¿Más vale pájaro en mano?'},
								{frase:'Que buenos son para esto. El refrán es Más vale pájaro en mano, que ver un ciento volando.'},
								{frase:'Aquí va el último. ¿listos?'},
								{frase:'¿Camarón que se duerme?'},
								{frase:'Muy bien. El refrán completo es Camarón que se duerme, se lo lleva la corriente.'},
								{frase:'Pero también puede ser. Camarón que se duerme, lo hacen coctel.'},
								{frase:'Se merecen un fuerte aplauso, por completar los refranes.'},

								/*{frase:'Quiero aprender nuevos refranes. ¿Me ayudarían?'},
								{frase:'Agustín. ¿Te sabes algún otro refrán?'},
								{frase:'Isabel. ¿y tú? ¿Te sabes algún otro refrán?'},
								{frase:'Irma. ¿Tú si te sabes otro refrán, verdad?'},*/

								{frase:'Ahora. Vamos a hacer unos ejercicios de respiración.'},
								{frase:'Respirar es bueno para la salud. y nos ayuda a relajarnos.'},
								{frase:'Primero, quiero que escuchen atentamente'},
								{frase:'Quiero que cierren lentamente los ojos'},
								{frase:'Vamos a concentrarnos'},
								{frase:'Por favor, vamos a cerrar nuestros ojos'},

								{frase:'¿Cómo se sienten?'},
								{frase:'¿Les gustó?'},
								{frase:'Bueno, Me tengo que ir porque ya es casi hora de comer.'},
								{frase:'Disfruté mucho de su compañía.'},
								{frase:'Me la paso muy bien cantando y pláticando con ustedes'},
								{frase:'Nos vemos el próximo Jueves.'},
								{frase:'Cuídense mucho y que disfruten su rica y deliciosa comida'},
								{frase:'Nos vemos Agustín, fue un placer convivir contigo.'},
								{frase:'Hasta luego Eduardo, espero que podamos platicar de nuevo acerca de deportes.'},
								{frase:'Hasta pronto Irma, me gusta mucho platicar contigo y escucharte cantar.'},
								{frase:'Adiós y que tengan un excelente día'}
										];

				$scope.script = $scope.script2;
/*
        $scope.script = [
        {frase:'Hola. buenos días a todos.'},
        {frase:'¿Se acuerdan de mí?'},
        {frase:'Que bien, yo también me acuerdo mucho de ustedes.'},
        {frase:'Hoy vengo a cantar y platicar con ustedes'},
        {frase:'Hoy se ven muy bien.'},
        {frase:'Es un placer volverlos a ver.'},
        {frase:'Hola Odilia. hoy te ves excelente.'},
        {frase:'Rosa. hoy te ves muy bien.'},
        {frase:'Agustín. siempre tan alegre y agradable'},
        {frase:'Hoy tengo muchas ganas de cantar.'},
        {frase:'¿Les parece si cantamos una canción?'},
        {frase:'Odilia. ¿Qué canción de los Panchos te gustaría escuchar?'},
        {frase:'Perfecto. La Voy a buscarla.'},
        {frase:'Vamos a cantarla todos.'},
        {frase:'Odilia y Rosa cantan precioso'},
        {frase:'Agustín me encanta su voz'},
        {frase:'Bravo, los tres cantan hermoso.'},
        {frase:'Un fuerte y caluroso aplauso para los tres'},
        {frase:'Odilia. ¿tú eres de Agua prieta o de Naco?'},
        {frase:'¿Qué lugar me recomiendas de Naco?'},
        {frase:'Pero trabajó mucho tiempo aquí en Ensenada ¿verdad Odilia?'},
        {frase:'Odilia. ¿trabajó en la empacadora del pacífico? ¿verdad?'},
        {frase:'¿En qué trabajaba con Don Pancho Álvarez?'},
        {frase:'Odilia. ¿Es sabroso el abulón?'},
        {frase:'¿Y es caro el abulón?'},
        {frase:'Odilia. ¿Cómo te gusta comer el abulón?'},
        {frase:'Odilia. ¿Qué recetas se sabe con abulón?'},
        {frase:'Que rico, suena muy sabroso todo lo que me platicas'},
        {frase:'Me gustaría cantar otra canción. ¿Les parece?'},
        {frase:'Agustín. ¿Le gustaría escuchar a Agustín Lara o a Pedro Infante? '},
        {frase:'Muy bien. Esta canción se llama. Amor de mis amores.'},
        {frase:'Muy bien. Esta canción se llama. Cien años.'},
        {frase:'Ahora. Vamos a cantar todos.'},
        {frase:'Odilia. Cantas precioso'},
        {frase:'Rosa. Tienes una voz hermosa.'},
        {frase:'Agustín. Cantas muy bien.'},
        {frase:'Los tres cantan muy bien.'},
        {frase:'Se merecen un fuerte y caluroso aplauso.'},
        {frase:'Agustín. ¿es cierto que usted es de Torreón Coahuila?'},
        {frase:'Me imagino que Torreón es una ciudad grande y bonita.'},
        {frase:'Agustín. ¿Qué lugares me recomienda de Torreón Coahuila?'},
        {frase:'Recuerdo que usted también vivió en Guadalajara ¿verdad Agustín?'},
        {frase:'Que ricos son los chilaquiles en Guadalajara.'},
        {frase:'Agustín ¿Qué chilaquiles le gustan más, los rojos o los verdes?'},
        {frase:'Agustín ¿Los chilaquiles le gustan con pollo o con carne asada?'},
        {frase:'Agustín ¿Sabe Cómo se preparan los chilaquiles?'},
        {frase:'Agustín ¿Qué otra comida de Guadalajara me recomienda?'},
        {frase:'Que rico suena todo.'},
        {frase:'Espero poder probarlo alguna vez.'},
        {frase:'Vamos a cantar otra canción. ¿les parece?'},
        {frase:'Rosa, ¿qué canción de Agustín Lara quieres? ¿Rosa o María Bonita?'},
        {frase:'Muy bien. Voy a buscarla.'},
        {frase:'Que bonita canción, ahora vamos a cantar'},
        {frase:'Odilia y Rosa cantan como artistas.'},
        {frase:'Agustín debería de cantar en la radio.'},
        {frase:'Bravo, me gusta mucho como cantan'},
        {frase:'Un aplauso fuerte y largo para los tres'},
        {frase:'Rosa. tú eres del Rosario Sinaloa ¿verdad?'},
        {frase:'El Rosario es muy bonito.'},
        {frase:'Rosa. el mercado del Rosario es muy bonito ¿verdad?'},
        {frase:'En Rosario hacen carnaval. ¿verdad Rosa?'},
        {frase:'Rosa. ¿qué es lo que más te gusta del carnaval de Rosario?'},
        {frase:'Rosa. en el carnaval escogen a una reina muy bonita ¿verdad?'},
        {frase:'Rosa. tu trabajaste en Conservas del pacífico ¿verdad?'},
        {frase:'¿Ahí conociste a Odilia?'},
        {frase:'Que bonito que se conozcan desde hace tiempo.'},
        {frase:'Me gusta mucho platicar con ustedes'},
        {frase:'Me gustaría que me ayuden a completar unos refranes. ¿Les parece?'},
        {frase:'Muy bien. Aquí va el primero'},
        {frase:'¿Agua que no has de beber?'},
        {frase:'guau, que buena memoria. El refrán completo es Agua que no has de beber, déjala correr.'},
        {frase:'Vamos con el siguiente. '},
        {frase:'¿Más vale pájaro en mano qué?'},
        {frase:'Felicidades. El refrán es Más vale pájaro en mano, que ver un ciento volando.'},
        {frase:'Aquí va el último. ¿listos?'},
        {frase:'¿Camarón que se duerme?'},
        {frase:'Excelente. El refrán completo es Camarón que se duerme, se lo lleva la corriente.'},
        {frase:'Antes de despedirnos. Vamos a respirar para relajarnos.'},
        {frase:'Vamos a concentrarnos y escuchar para relajarnos'},
        {frase:'Vamos a cerrar lentamente los ojos'},
        {frase:'Cerramos los ojos para relajarnos'},
        {frase:'¿Cómo se sienten?'},
        {frase:'¿Les gustó?'},
        {frase:'Me tengo que ir porque ya es casi hora de comer.'},
        {frase:'Disfruté mucho de su compañía.'},
        {frase:'Me la paso muy bien cantando y pláticando con ustedes'},
        {frase:'Nos vemos la próxima semana.'},
        {frase:'Cuídense mucho y que disfruten su rica comida'},
        {frase:'Adiós.'}
            ];
*/

		$scope.resultadosMedia = [];

		$scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

		$scope.enviarQueryMedia = function(){
			socket.emit('new-message',{accion:1, mensajePersonalizado:$scope.mensaje, autor:'Robot Eva', class:"text-danger", queryMedia:$scope.queryMedia});
			$scope.queryMedia = '';
		}

		$scope.enviarQueryMedia2 = function(e){
			let keyCode2 = (e.keyCode ? e.keyCode : e.which);
			if(keyCode2 == 13){
				socket.emit('new-message',{accion:1, mensajePersonalizado:$scope.mensaje, autor:'Robot Eva', class:"text-danger", queryMedia:$scope.queryMedia});
				$scope.queryMedia = '';
				e.preventDefault();
			}
		};

		$scope.enviarMensaje = function(){
			socket.emit('new-message',{accion:1, mensajePersonalizado:'<speak version="1.0"><prosody rate="-15%">'+$scope.mensaje+'</prosody></speak>', autor:'Robot Eva', class:"text-danger", mensaje:$scope.mensaje});
			$scope.mensaje = '';
		};

		$scope.enviarMensaje2 = function(e){
			let keyCode = (e.keyCode ? e.keyCode : e.which);
			if(keyCode == 13){
				socket.emit('new-message',{accion:1, mensajePersonalizado:'<speak version="1.0"><prosody rate="-15%">'+$scope.mensaje+'</prosody></speak>', autor:'Robot Eva', class:"text-danger", mensaje:$scope.mensaje});
				$scope.mensaje = '';
				e.preventDefault();
			}
		};

		$scope.enviarFrase = function(index){
			socket.emit('new-message',{accion:1, mensajePersonalizado:$scope.frases[index], autor:'Robot Eva', class:"text-danger", mensaje:$scope.frases[index]});
		};

		$scope.enviarFrase2 = function(index){
			socket.emit('new-message',{accion:1, mensajePersonalizado:$scope.frases2[index], autor:'Robot Eva', class:"text-danger", mensaje:$scope.frases2[index]});
		};


		$scope.enviarEmocion = function(tipoE){
			socket.emit('new-message',{autor:'Robot Eva', class:'text-danger',tipo:tipoE,mensaje:"<img width=\"20px\" height=\"20px\" src=\"/images/"+$scope.emociones[tipoE]+".png\" >"});
		};

		$scope.enviarConversacion2 = function(conversacion){
			console.info(conversacion);
			var data = {};
			data.accion = conversacion.accion;
			data.comando = conversacion.comando;
			data.nombre = conversacion.nombre;
			data.autor = 'Robot Eva';
			data.class = 'text-danger';
			data.mensaje = "<img width=\"20px\" height=\"20px\" src=\"/images/"+conversacion.nombre+".png\">";
			socket.emit('new-message',data);
		};

		$scope.enviarConversacion = function(conversacion){
			console.info(conversacion);
			console.log('enviarConversacion');
			$http.get('/media/'+conversacion.nombre)
				.then(function(res){
					console.log(res.data);
				}, function(error){
					console.log('Error: ' + error);
				});
		};

		var cancionAnterior = null;
		$scope.reproducirCancion = function(cancion){
			var datos = {};
			var flagAnterior = false;
			if(!cancion.reproduce){

				if(cancionAnterior && cancion!=cancionAnterior){
					flagAnterior = true;
					$scope.tracks[$scope.tracks.indexOf(cancionAnterior)].reproduce = false;
				}

				if(cancion==cancionAnterior){
					datos ={autor:'Robot Eva', class:"text-danger"};
					datos.accion = 6;
					datos.accionMusica = 'continuar.cancion';
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					socket.emit('new-message',datos);
				}
				else{
					datos = cancion;
					datos.cancionAnterior = flagAnterior;
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					datos.accionMusica = 'reproducir.cancion';
					console.log(datos);
					socket.emit('new-message',datos);
				}
				cancion.reproduce = true;
				cancionAnterior = cancion;
			}
			//socket.emit('new-message',cancion);
		};
		$scope.pausarCancion = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-pause" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'pausar.cancion';
				socket.emit('new-message',datos);
			}
		};

		$scope.detenerCancion = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				if (cancionAnterior)
					cancionAnterior = null;
				datos ={autor:'Robot Eva', class:"text-warning"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-stop" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'detener.cancion';
				socket.emit('new-message',datos);
			}
		};

		$scope.tracks = [];
		$scope.cargandoMedia = false;
		$scope.buscarMedia = function(){
			$scope.cargandoMedia = true;
			/*$http.get('/media?q='+$scope.queryMedia+'&type='+$scope.opcionBuscar.tipo)
				.then(function(res) {
					//$scope.tracks = data;
					console.log(res.data)
					$scope.cargandoMedia = false;
					if($scope.opcionBuscar.tipo==1){
						$scope.tracks = res.data;
						$scope.videos = [];
					}
					else if($scope.opcionBuscar.tipo==8){
						$scope.videos = res.data;
						$scope.tracks = [];
					}
					cancionAnterior = null;
					$scope.queryMedia = '';
		        }, function(error){
		        	console.log('Error: ' + error);
		        });*/
			$http.get('/media?q='+$scope.queryMedia)
				.then(function(res){
					console.log(res.data);
					$scope.cargandoMedia = false;
					$scope.tracks = res.data;
				}, function(error){
					console.log('Error: ' + error);
				});
		};

		$scope.buscarMedia2 = function(e){
			let keyCode = (e.keyCode ? e.keyCode : e.which);
			if(keyCode == 13){
				$scope.buscarMedia();
				e.preventDefault();
			}
		};

		/*$scope.playMusic = function(cancion){
			var datos = {};
			var flagAnterior = false;
			if(!cancion.reproduce){

				if(cancionAnterior && cancion!=cancionAnterior){
					flagAnterior = true;
					$scope.tracks[$scope.tracks.indexOf(cancionAnterior)].reproduce = false;
				}

				if(cancion==cancionAnterior){
					datos ={autor:'Robot Eva', class:"text-danger"};
					datos.accion = 6;
					datos.accionMusica = 'continuar.cancion';
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					//socket.emit('new-message',datos);
					$http.post('media/music/resume',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
				}
				else{
					datos = cancion;
					datos.cancionAnterior = flagAnterior;
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					datos.accionMusica = 'reproducir.cancion';
					console.log(datos);
					$http.post('media/music/play',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
					//socket.emit('new-message',datos);
				}
				cancion.reproduce = true;
				cancionAnterior = cancion;
			}
		}*/

		$scope.playMusic = function(cancion){
			var datos = {};
			var flagAnterior = false;
			if(!cancion.reproduce){

				if(cancionAnterior && cancion!=cancionAnterior){
					flagAnterior = true;
					$scope.tracks[$scope.tracks.indexOf(cancionAnterior)].reproduce = false;
				}

				if(cancion==cancionAnterior){
					datos ={autor:'Robot Eva', class:"text-danger"};
					datos.accion = 6;
					datos.accionMusica = 'continuar.cancion';
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					//socket.emit('new-message',datos);
					$http.post('media/music/resume',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
				}
				else{
					datos = cancion;
					datos.cancionAnterior = flagAnterior;
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					datos.accionMusica = 'reproducir.cancion';
					console.log(datos);
					$http.post('media/music/play',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							JSON.stringify(error);
						});
					//socket.emit('new-message',datos);
				}
				cancion.reproduce = true;
				cancionAnterior = cancion;
			}
		}

		$scope.stopMusic = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				if (cancionAnterior)
					cancionAnterior = null;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-stop" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'detener.cancion';
				$http.post('media/music/stop',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});

			}
		}

		$scope.pauseMusic = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-pause" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'pausar.cancion';
				$http.post('media/music/pause',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
			}
		}
		//***Còdigo para canciones locales
		/*$scope.playMusic = function(cancion){
			var datos = {};
			var flagAnterior = false;
			if(!cancion.reproduce){

				if(cancionAnterior && cancion!=cancionAnterior){
					flagAnterior = true;
					$scope.tracks[$scope.tracks.indexOf(cancionAnterior)].reproduce = false;
				}

				if(cancion==cancionAnterior){
					datos ={autor:'Robot Eva', class:"text-danger"};
					datos.accion = 6;
					datos.accionMusica = 'continuar.cancion';
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					//socket.emit('new-message',datos);
					$http.post('media/music/resume',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
				}
				else{
					datos = cancion;
					datos.cancionAnterior = flagAnterior;
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+cancion.nombre;
					datos.accionMusica = 'reproducir.cancion';
					console.log(datos);
					$http.post('media/music/play',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
					//socket.emit('new-message',datos);
				}
				cancion.reproduce = true;
				cancionAnterior = cancion;
			}
		}

		$scope.stopMusic = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				if (cancionAnterior)
					cancionAnterior = null;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-stop" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'detener.cancion';
				$http.post('media/music/stop',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});

			}
		}

		$scope.pauseMusic = function(cancion){
			var datos = {};
			if(cancion.reproduce){
				cancion.reproduce = false;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.accion = 6;
				datos.mensaje = '<i class="fa fa-pause" aria-hidden="true"></i> '+cancion.nombre;
				datos.accionMusica = 'pausar.cancion';
				$http.post('media/music/pause',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
			}
		}*/

		var videoAnterior = null;

		$scope.playVideo = function(video){
			var datos = {};
			var flagAnterior = false;
			if(!video.reproduce){
				if(videoAnterior && video!=videoAnterior){
					flagAnterior = true;
					$scope.videos[$scope.videos.indexOf(videoAnterior)].reproduce = false;
				}

				if(video==videoAnterior){
					datos ={autor:'Robot Eva', class:"text-danger"};
					datos.accionVideo = 'play.video';
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+video.title;
					socket.emit('new-message',datos);
				}
				else{
					datos = video;
					datos.cancionAnterior = flagAnterior;
					datos.mensaje = '<i class="fa fa-play" aria-hidden="true"></i> '+video.youtube_video.title;
					console.log(datos);
					$http.post('media/video/play',datos)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});
				}
				video.reproduce = true;
				videoAnterior = video;

			}
			/*$http.post('media/video/play',video)
						.then(function(res){
							console.log(res);
						}, function(error){
							console.log('Error: ' + error);
						});*/
		}

		$scope.pauseVideo = function(video){
			var datos = {};
			if(video.reproduce){
				video.reproduce = false;
				datos ={autor:'Robot Eva', class:"text-danger"};
				datos.mensaje = '<i class="fa fa-pause" aria-hidden="true"></i> '+video.youtube_video.title;
				datos.accionVideo = 'pause.video';
				socket.emit('new-message',datos);
			}
		};

		$scope.setMicrofono = function(tipo){
			//$scope.listen = tipo;
			$http.get('microfono?listen='+tipo)
					.then(function(res){
						console.log(res);
						$scope.listen = res.data.listen;
					}, function(error){
						console.log('Error: ' + error);
					});
		};

		$scope.enviarFraseScript = function(){
			if($scope.complementoFrase)
				socket.emit('new-message',{accion:1, mensajePersonalizado:'<speak version="1.0"><prosody rate="-15%">'+$scope.script[$scope.indiceScript1].frase+' '+$scope.complementoFrase+'</prosody></speak>', autor:'Robot Eva', class:"text-danger", mensaje:$scope.script[$scope.indiceScript1].frase+' '+$scope.complementoFrase});
			else
                socket.emit('new-message',{accion:1, mensajePersonalizado:'<speak version="1.0"><prosody rate="-15%">'+$scope.script[$scope.indiceScript1].frase+'</prosody></speak>', autor:'Robot Eva', class:"text-danger", mensaje:$scope.script[$scope.indiceScript1].frase});
        $scope.complementoFrase='';
        };

        $scope.incrementarIndice = function(){
			if($scope.indiceScript1 < ($scope.script.length-1))
				$scope.indiceScript1++;
        };

        $scope.decrementarIndice = function(){
			if($scope.indiceScript1 > 0)
				$scope.indiceScript1--;
        };


        $scope.meditacionPlay = false;

        $scope.reproducirMeditacion = function(){
                $http.get('media/meditacion/play')
                                        .then(function(res){
                                                console.log(res);
                                                $scope.meditacionPlay = true;
                                        }, function(error){
                                                console.log('Error: ' + error);
                                        });
        };

        $scope.pausarMeditacion = function(){
                $scope.meditacionPlay = false;
        };

        $scope.detenerMeditacion = function(){
                $http.get('media/meditacion/stop')
                                        .then(function(res){
                                                console.log(res);
                                                $scope.meditacionPlay = false;
                                        }, function(error){
                                                console.log('Error: ' + error);
                                        });
        }

        $scope.iniciarInteraccion1 = function(){
            $http.get('interaccion/iniciarInteraccion1')
                .then(function(res){
                    console.info('Inició interaccion con grupo 1');
                },function(error){
                    console.log(error);
                });
        };

        $scope.iniciarInteraccion2 = function(){
            $http.get('interaccion/iniciarInteraccion2')
                .then(function(res){
                    console.info('Inició interaccion con grupo 2');
                },function(error){
                    console.log(error);
                });
        };

				$scope.iniciarInteraccion3 = function(){
            $http.get('interaccion/iniciarInteraccion3')
                .then(function(res){
                    console.info('Inició interaccion con grupo 3');
                },function(error){
                    console.log(error);
                });
        };

	});
