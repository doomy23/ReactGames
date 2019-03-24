const process = require('process');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const webpackConfig = require('./webpack.config.js');
const setupApi = require('./api.js');
const config = require('./utils/config');
const db = require('./database');

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

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use(cookieSession({
  name: 'session',
  keys: [config.cookies.secret],
  // Cookie Options
  maxAge: config.cookies.maxAge || 24 * 60 * 60 * 1000,
  signed: true,
  overwrite: true
}))

setupApi(app, ws);

db.sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log('ReactGames listening on port 3000!\n');
  });
});
