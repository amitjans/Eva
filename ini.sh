#!/bin/bash
echo Eva
sudo amixer cset numid=1 70%
export GOOGLE_APPLICATION_CREDENTIALS="credencial.json"
node --stack_size=160000 bin/www
