const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:1498';

const PROXY_CONFIG = [
  {
    context: [ "/favicon" ],
    target: target,
    secure: false,
    logLevel: "debug"
  },
  {
    context: [
      "/binHub"
   ],
    target: target,
    secure: false,
    ws: true,
  }
]

module.exports = PROXY_CONFIG;
