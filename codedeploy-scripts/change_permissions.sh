#!/bin/bash
chmod -R 755 /usr/share/nginx/html
chown -R nginx:nginx /usr/share/nginx/
cd /home/ec2-user/
sudo node -e "console.log('Running Node.js ' + process.version)"
sudo ln -s "$(which nodejs)" /usr/bin/node
sudo ln -s /root/.nvm/versions/node/v10.15.3/bin/npm /usr/bin/npm
sudo npm install
