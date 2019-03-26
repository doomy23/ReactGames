const process = require('process');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const setupApi = require('./api.js');
const config = require('./utils/config');
const db = require('./database');

// NODE_ENV set from config
// TODO: Can overwrite with argv
process.env.NODE_ENV = process.env.NODE_ENV || config.mode;

const webpackConfigPath = `./webpack.${
  process.env.NODE_ENV == 'development' ? 'dev' : 'prod'
  }.config.js`;
const webpackConfig = require(webpackConfigPath);

const app = express();
const server = http.Server(app);
const ws = socketIO(server, {
  path: '/api/ws',
  cookie: true
});

const compiler = webpack(webpackConfig);

app.set('trust proxy', 1);

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

if(process.env.NODE_ENV === 'development')
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));

app.use(cookieSession({
  name: 'session',
  keys: [config.cookies.secret],
  maxAge: config.cookies.maxAge || 24 * 60 * 60 * 1000,
  signed: true,
  overwrite: true,
  secure: config.cookies.secure
}));

setupApi(app, ws);

db.sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log('ReactGames listening on port 3000!\n');
  });
});
