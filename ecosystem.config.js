module.exports = {
  apps: [ {
    autorestart: true,
    cwd: `${__dirname}`,
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env_development: {
      NODE_ENV: 'development',
      PORT: 8090
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8090
    },
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 8090
    },
    ignore_watch: [ 'node_modules' ],
    instances: 1,
    name: 'OAE-FRONTEND',
    script: './server/index.js'
  } ],
};
