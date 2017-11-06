#!/bin/sh
cd /home/user/project
git pull
sudo kill $(lsof -t -i:80)
nohup npm start
