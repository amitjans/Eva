/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 
 //APIkeyGoogle=AIzaSyA5zgnNhHnu-ZltlP036JNZf2rXY8NdJV8
 
/*const Speech = require('@google-cloud/speech');
const projectID = 'roboteva-162823';

const speechClient = Speech({
  projectId: projectId
}); */

var refranes = [
	{
		refran : '¿Agua que no has de bebér?',
		respuesta : 'dejala correr',
		significado : '¡Muy bien! Felicidades. El refrán es: Agua que no has de beber, déjala correr. Y es una Lección que aconseja no involucrarse con aquello que no se puede afrontar. '
	},
	{
		refran : '¿Al nopal sólo se le acercan cuándo?',
		respuesta : 'tiene tunas',
		significado : '¡Bien hecho!. Al nopal sólo se le acercan cuando tiene tunas. A modo de burla se refiere a los que acuden a otros sólo cuando tienen la necesidad.'
	}
];
		

 
var apiai = require('apiai');
var app = apiai("ee25d15e8fbe4d8f91ba0bd35ee8e59f");
var optionsAPI = {
    sessionId: '<unique session id>'
};

var request;

var TJBot = require('tjbot');
var config = require('./config');

var dateFormat = require('dateformat');

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker'];

// turn on debug logging to the console
var tjConfig = {
    verboseLogging: true,
    attentionWord: 'eva'
};

var escucharMicrofono = true;

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

/****
 * Configuracion servomotor
 * */
 
var waveinterval = 1500;
var lightinterval = 500;

var mincycle = 1700;
var maxcycle = 2200;
var dutycycle = mincycle;

// Init board, setup software PWM on pin 26.
var Gpio = require('pigpio').Gpio;
var motor = new Gpio(7, {
    mode: Gpio.OUTPUT
});


//console.log("You can ask me to introduce myself or tell you a joke.");
//console.log("Try saying, \"" + tj.configuration.attentionWord + ", please introduce yourself\" or \"" + tj.configuration.attentionWord + ", who are you?\"");
//console.log("You can also say, \"" + tj.configuration.attentionWord + ", tell me a joke!\"");

// listen for utterances with our attentionWord and send the result to
// the Conversation service
/*tj.listen(function(msg) {

    // check for an attention word
    //msg.startsWith(tj.configuration.attentionWord)
    if (msg.includes(tj.configuration.attentionWord) || msg.includes('robot') || msg.includes('emma') || true) {
        // remove the attention word from the message
        var turn = msg.toLowerCase().replace(tj.configuration.attentionWord.toLowerCase(), "");

        // send to the conversation service
        tj.converse(WORKSPACEID, turn, function(response) {
            // speak the result
            tj.speak(response.description);
        });
    }

});*/

tj.listen(function(msg) {
    // check for an attention word
    //msg.startsWith(tj.configuration.attentionWord)
    if (msg.includes(tj.configuration.attentionWord) || msg.includes('robot') || true) {
        // remove the attention word from the message
        var turn = msg.toLowerCase().replace(tj.configuration.attentionWord.toLowerCase(), "");

        // send to the conversation service
		//tj.speak(turn);
		if(escucharMicrofono)
			tj.playSound('./sonidos/beep-02.wav');
        request = app.textRequest(turn,optionsAPI);
        
        request.on('response', function(response) {
			if(response.result.action && (escucharMicrofono || response.result.action==='encender.microfono'))
				ejecutarAccion(response.result);
			else{
				console.log(response.result.fulfillment.speech);
				if(escucharMicrofono)
					tj.speak(response.result.fulfillment.speech,4);
				//tj.speak('Había una vez un pollito que era tan, pero tan inteligente, que en vez de decir pí, decía 3.1416');
			}
		});

		request.on('error', function(error) {
			console.log(error);
		});

		request.end();
    }

});



/*request = app.textRequest('Dime la hora', optionsAPI);

request.on('response', function(response) {
	if(response.result.action)
		ejecutarAccion(response.result.action);
});

request.on('error', function(error) {
	console.log(error);
});

request.end();*/

var ejecutarAccion = function(resultado){
	switch(resultado.action){
		case 'dar.hora': var hora = new Date(); 
		tj.speak(resultado.fulfillment.speech+" "+dateFormat(hora,'h:MM TT'),4);
		break;
		case 'dar.fecha': var fecha = new Date(); 
		tj.speak(resultado.fulfillment.speech+" "+dateFormat(hora,"dddd, d 'de' mmmm 'del' yyyy"),4);
		//resolve(tj.playSound('./sonidos/beep-07.wav'));
		break;
		case 'contar.chiste': 
		tj.speak(resultado.fulfillment.speech,1);
		break;
		case 'generar.numero': 
		generarRespuesta();
		break;
		case 'checar.suposicion': 
		checarRespuesta(resultado);
		break;
		case 'generar.refran': 
		generarRefran();
		break;
		case 'checar.respuesta.refran': 
		checarRespuestaRefran(resultado);
		break;
		case 'pausar.microfono': 
		escucharMicrofono = false;
		tj.speak(resultado.fulfillment.speech,4);
		break;
		case 'encender.microfono': 
		escucharMicrofono = true;
		tj.speak(resultado.fulfillment.speech,4);
		break;
		case 'dar.dulce':
		entregarDulce(); 
		tj.speak(resultado.fulfillment.speech);
		break;
		case 'bajar.brazo':
		bajarBrazo(); 
		tj.speak(resultado.fulfillment.speech);
		break;
		case 'input.unknown': 
		tj.speak(resultado.fulfillment.speech,4);
		break;
		
	}
}

var respuestaNumero;
var pistaJuego = '';
var suposicionAnterior = -1;

var generarNumeroRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generarRespuesta = function () {
    console.log('generararRespuesta');
    respuestaNumero = generarNumeroRandom(0, 100);
    console.log('respuestaNumero: '+respuestaNumero);
    tj.speak('¡Juguemos a adivinar el número!. Estoy pensando en un número entre 0 y 100. ¿Cuál es tu primer número?',4);
}

var checarRespuesta = function(resultado){
	var suposicion = parseInt(resultado.parameters.suposicion);
	
	if(pistaJuego){
		if(pistaJuego === 'mayor' && suposicion <= suposicionAnterior){
			tj.speak('Buen intento, pero aún es mayor que '+suposicionAnterior,4);
			return;
		}
		else if(pistaJuego === 'menor' && suposicion >= suposicionAnterior){
			tj.speak('Buen intento, pero aún es menor que '+suposicionAnterior,4);
			return;
		}
	}
	
	if(respuestaNumero > suposicion){
		pistaJuego = 'mayor';
		suposicionAnterior = suposicion;
		tj.speak('Es mayor que '+suposicion+'. ¿Cuál es tu siguiente número?',4);	
	}
	else if(respuestaNumero < suposicion){
		pistaJuego = 'menor';
		suposicionAnterior = suposicion;
		tj.speak('Es menor que '+suposicion+'. ¿Otro número?',4);
	}
	else{
		pistaJuego = '';
		suposicionAnterior = -1;
		respuestaNumero = 0;
		tj.speak('¡Felicidades! El número que pense fue '+suposicion+'.',2);
	}
}

var indiceRefran = 0;
var puntuacion = 0;
var jugandoRefranes = false;

var generarRefran = function(){
	indiceRefran = generarNumeroRandom(0,1);
	tj.speak('Perfecto, comencemos. Yo diré una parte del refrán y tú lo completarás. '+refranes[indiceRefran].refran,4);
	jugandoRefranes = true;
}

var checarRespuestaRefran= function(resultado){
	var felicitacion = '';
	var tipo = 0;
	if(jugandoRefranes){
		var indiceRespuesta = parseInt(resultado.parameters.indiceRefran);
		if(indiceRefran == indiceRespuesta){
			indiceRefran = (indiceRefran+1 == refranes.length)?0:indiceRefran+1;
			puntuacion++;
			if(puntuacion == refranes.length){
				felicitacion = ' ¡Felicidades completaste todos los refranes!';
				tipo=3;
				puntuacion = 0;
				jugandoRefranes = false;
			}
			else{
				tipo=4;
				felicitacion = ' Vamos con el siguiente '+refranes[indiceRefran].refran;
			}
			tj.speak(refranes[indiceRespuesta].significado+felicitacion,tipo);
		}
	}
	
}

/***Funciones motor
 * */
 
 function launchWave() {
    setInterval(function() {
        dutycycle = dutycycle == mincycle ? maxcycle : mincycle;
        motor.servoWrite(dutycycle);
        console.log(dutycycle);
    }, waveinterval);
    
}

var entregarDulce = function(){

    dutycycle = maxcycle ;
    motor.servoWrite(dutycycle);
    console.log(dutycycle);
}

var bajarBrazo = function(){
	dutycycle = mincycle ;
	motor.servoWrite(dutycycle);
	console.log(dutycycle);
}

/**
 * Set a timer that waves the robot arm every X seconds
 * Set to max cylce each time but return to mincycle x seconds after
 */

function launchWaveReturn() {
    setInterval(function() {
        motor.servoWrite(maxcycle);
        console.log("set to", maxcycle);
        setTimeout(function() {
            console.log("reset to", mincycle)
            motor.servoWrite(mincycle);
        }, waveinterval);
    }, waveinterval);
}
