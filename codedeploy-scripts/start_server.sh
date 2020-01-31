#!/bin/bash
cd /home/ec2-user/
service nginx start
sudo npm run start-server:ENV_NAME
