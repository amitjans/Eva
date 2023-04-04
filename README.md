# Eva
Eva social robot main app.

## Hardware
- Raspberry Pi 3B+ o 4B+
- Matrix Voice
- Servomotores Dynamixel AX-12A

## Requirements
- NodeJs 14.16.0

## Installation
### New way
```bash
docker compose up -d
```

### Old way
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
sudo apt-get install matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev
```

```bash
sudo reboot
```

### App dependencies
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
TELEGRAM_API_ID=1234567 		
TELEGRAM_API_HASH=123456789abcdef123456789abcdf123
TELEGRAM_SESSION=abc648hyf04ns8knmaos8dhq93inlsokdaopsidnzx89infd/akjshd*jkhsqwppnmx195asdzzods/=lklaskmcxo
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
## Production configuration
The following steps allow the automatic startup of the Eva software every time you turn it on.
The first step is to install ***pm2***, a daemon process manager that keeps the Eva software online.
```bash
npm install pm2 -g
```
Then we manually run the software.
```bash
pm2 start ./app.js --name eva
```
For the automticaly launch of the software on every startup is needed to run this command and follow the instruction
```bash
pm2 startup
```
that usually is to run a command like this one:
```bash
sudo env PATH=$PATH:/home/pi/.config/nvm/versions/node/v14.16.0/bin /home/pi/.config/nvm/versions/node/v14.16.0/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```
Once done the previus steps we need to save the configurations.
```bash
pm2 save
```

### Optional steps
You can use the next steps if you want to avoid writing the port value on the url of the system, otherwise, this are optional.
First we need to use a reverse proxy, for that install nginx with this command:
```bash
sudo apt install nginx
```
Then we need to configure the reverse proxy settings, for this is needed to edit the /etc/nginx/sites-available/default file or comment the content or remove this one and create a new file 

```bash
sudo nano /etc/nginx/sites-available/default
```

The configurations inside this file should look like this:

```bash
server {
    listen 80;
    listen [::]:80;
    server_name server_IP_address;
    location / {
      proxy_set_header        Host $host;
      proxy_set_header        X-Real-IP $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header        X-Forwarded-Proto $scheme;
      proxy_pass          http://localhost:3000;
      proxy_read_timeout  90;
      # WebSocket support
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
}
```
If you choose to edit the default file, simply check if everything is ok using:
```bash
sudo nginx -t
```
If you choose to create a new one, before testing it you need to create a link or a copy of this file on /etc/nginx/sites-enabled/, for this example, we create a new file and named ***eva***
```bash
sudo ln -s /etc/nginx/sites-available/eva /etc/nginx/sites-enabled/eva
```
As a final step, run the following command to restart the server to load the new configurations, also you can use ***status*** besides ***restart*** after running the second one to check if it's running.
```bash
sudo service nginx restart
```
