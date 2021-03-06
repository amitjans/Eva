#!/bin/bash
echo Eva
sudo amixer cset numid=1 80%
export GOOGLE_APPLICATION_CREDENTIALS="credencial.json"
npm run dev
