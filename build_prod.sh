#!/usr/bin/env bash

SERVER=dist-server
CLIENT=dist-client

rm -rf ./$SERVER ./$CLIENT;
cd ./server || exit;
npm run build;
cp package.json ../$SERVER && cd ../$SERVER && npm install;
cd ../client && npm run build;
cd ../ && node ./$SERVER;
