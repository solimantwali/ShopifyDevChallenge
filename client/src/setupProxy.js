//require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
//dotenv.config({ path: '../../.env' });

//console.log('http://localhost:' + process.env.PORT.toString());

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};

// const { createProxyMiddleware } = require('http-proxy-middleware');
// require('dotenv').config({ path: '../../.env' });
// const targetstring = 'http://localhost' + process.env.PORT.toString();

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: targetstring,
//       changeOrigin: true,
//     })
//   );
// };
