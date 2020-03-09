# controlEva_Google_ultimatum

## Hardware
- Raspberry Pi 3B+ o 4B+
- Matrix Voice
- Servomotores Dynamixel AX-12A

## Instalación
- NodeJs 8.17.0
- [Matrix Voice](https://matrix-io.github.io/matrix-documentation/matrix-voice/resources/microphone/)

### Librerías
```bash
sudo apt-get install libasound2-dev
```

### Configuración

Archivo necesario para el uso de los servicios de texto a voz de Watson y de voz a texto de Google:

- config-services.js
```js
exports.credentials = {};
exports.config = {
	'attentionWord': 'Eva',
	'name':'Eva',
	'voice':'es-LA_SofiaV3Voice'
};
exports.credentials.tts = {
  apikey : 'api-key',
  url : 'https://stream.watsonplatform.net/text-to-speech/api',
};
```
 
 - [Archivo JSON que contiene la clave de la cuenta de servicio de Google](https://cloud.google.com/docs/authentication/getting-started)

Archivo auxiliar para el inicio de la aplicación 

- ini.sh

 ```bash
 #!/bin/bash
echo Eva
sudo amixer cset numid=1 100% #volumen de la vocina
export GOOGLE_APPLICATION_CREDENTIALS="credencial.json" #importar las credenciales de google
node --stack_size=160000 bin/www #Iniciar la aplicación
 ```
