# controlEva_Google_ultimatum
 
Archivos necesarios para el uso de esta aplicación:

config-services.js

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
 
 Archivo JSON que contiene la clave de la cuenta de servicio de Google:
 https://cloud.google.com/docs/authentication/getting-started
