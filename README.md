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

Archivos necesarios para el uso de esta aplicación:

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
