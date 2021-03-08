# Eva

## Hardware
- Raspberry Pi 3B+ o 4B+
- Matrix Voice
- Servomotores Dynamixel AX-12A

## Instalación
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
```bash
nvm use v14.16.0
```
- Registrar la [Matrix Voice](https://matrix-io.github.io/matrix-documentation/matrix-voice/resources/microphone/) como micrófono

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

### Dependencias de la aplicación
```bash
npm install
```
<!--
### Librerías
 - Requerida para compilar la dependencia "speaker".
```bash
sudo apt-get install libasound2-dev
```
-->


### Animaciones
 - Paquetes requeridos para compilar las animaciones del arreglo de luces led.
```bash
sudo apt-get install matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev
```
 - Para compilar las animaciones del arreglo de leds de la Matrix Voice
```bash
g++ -o app app.cpp -std=c++11 -lmatrix_creator_hal
```

## Configuración

Archivo necesario para el uso de los servicios de texto a voz de Watson:

- .env

Este archivo contendrá los siguientes parámetros:

```bash
TEXT_TO_SPEECH_APIKEY=api-key
TEXT_TO_SPEECH_URL=https://stream.watsonplatform.net/text-to-speech/api
```

Archivo necesario para el uso de los servicios de Google:

- [Archivo JSON que contiene la clave de la cuenta de servicio de Google](https://cloud.google.com/docs/authentication/getting-started)
- Opcionalmente el archivo '.env' para la configuración de los servicios de Watson podrá contener el siguiente parámetro si se desea utlizar un proyecto de Dialogflow de Google por defecto:
```bash
DIALOGFLOW_PROJECT_ID=google-dialogflow-proyect-name
```
Archivo opcional para el inicio de la aplicación 

- ini.sh

 ```bash
 #!/bin/bash
echo Eva
sudo amixer cset numid=1 100% #volumen de la bocina
export GOOGLE_APPLICATION_CREDENTIALS="credencial.json" #importar las credenciales de google
npm run dev #Iniciar la aplicación
 ```
