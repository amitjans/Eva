#!/bin/bash
echo Eva
cd ~/Development/controlEva_Google_ultimatum
sudo amixer cset numid=1 90%
export GOOGLE_APPLICATION_CREDENTIALS="ProyectoFinal-bf437f47a732.json"
node --stack_size=160000 bin/www
