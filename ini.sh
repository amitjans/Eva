#!/bin/bash
echo Eva
sudo amixer cset numid=1 100%
export GOOGLE_APPLICATION_CREDENTIALS="credencial.json"
nodemon --stack_size=160000 bin/www
