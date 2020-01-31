const env = process.env.NODE_ENV || 'development';
const stage = require('./environment.stg');
const dev = require('./environment.dev');

console.log("Environment is", process.env.NODE_ENV);
module.exports = env === 'development' ? dev : stage;
