#!/bin/sh
screen -X -S proto-front quit
cd /home/ubuntu/proto/front
git reset --hard HEAD 
git pull origin deployment
npm run prod > null
ping -c 1 localhost > null
screen -dmS proto-front npm start > null
echo "Server daemon started"
