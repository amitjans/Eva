# controlEva_Google_ultimatum

## Hardware
- Raspberry Pi 3B+ o 4B+
- Matrix Voice
- Servomotores Dynamixel AX-12A

## Instalación
- NodeJs 8.17.0
- [Matrix Voice](https://matrix-io.github.io/matrix-documentation/matrix-voice/resources/microphone/)
### Librerías
 - Requerida para compilar la dependencia "speaker".
```bash
sudo apt-get install libasound2-dev
```
 - Requerida para compilar las aplicaciones del arreglo de luces led.
```bash
sudo apt-get install matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev
```

### Dependencias de la aplicación
```bash
npm install
```

### Animaciones
Para compilar las animaciones del arreglo de leds de la Matrix Voice
```bash
g++ -o app app.cpp -std=c++11 -lmatrix_creator_hal
```

### Configuración

Archivos necesarios para el uso de los servicios de texto a voz de Watson y de voz a texto de Google:

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
