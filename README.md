# Eva
Eva social robot main app.

## Hardware
- Raspberry Pi 3B+ o 4B+
- Matrix Voice
- Servomotores Dynamixel AX-12A

## Requirements
- NodeJs 14.16.0
```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```
```bash
source ~/.profile
```
```bash
nvm install v14.16.0
```
<!-- nvm install lts/* --reinstall-packages-from=node -->
```bash
nvm use v14.16.0
```
- [Matrix Voice](https://matrix-io.github.io/matrix-documentation/matrix-voice/resources/microphone/) registred as a microphone

```bash
curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
sudo apt-get update
sudo apt-get upgrade
```

```bash
sudo reboot
```

```bash
sudo apt install matrixio-kernel-modules
```

```bash
sudo reboot
```

### App dependencies
```bash
npm install
```
#### Production dependencies
```bash
npm install pm2 -g
```
<!--
### Librerías
 - Requerida para compilar la dependencia "speaker".
```bash
sudo apt-get install libasound2-dev
```
-->

## Configuración

File required to use Watson and Google services:

- .env

This file will contain the following parameters:

```bash
TEXT_TO_SPEECH_APIKEY=tts-api-key
TEXT_TO_SPEECH_URL=https://stream.watsonplatform.net/text-to-speech/api
SPEECH_TO_TEXT_APIKEY=stt-api-key
SPEECH_TO_TEXT_URL=https://stream.watsonplatform.net/speech-to-text/api
TRANSLATOR_APIKEY=translator-api-key
TRANSLATOR_URL=https://api.us-south.language-translator.watson.cloud.ibm.com/
GOOGLE_APPLICATION_CREDENTIALS=credencial.json
```

File required to use Google services:

- [JSON file with Google credentials](https://cloud.google.com/docs/authentication/getting-started)

- Optionally, the '.env' file for the configuration of the services may contain the following parameter if you want to use a Google Dialogflow project by default:
```bash
DIALOGFLOW_PROJECT_ID=google-dialogflow-proyect-name
```
Optional file for application start 

- ini.sh

 ```bash
 #!/bin/bash
echo Eva
sudo amixer cset numid=1 100% #volumen de la bocina
npm start #Iniciar la aplicación
 ```
