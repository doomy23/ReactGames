const process = require('process');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const session = require('express-session');
const cookieSession = require('cookie-session');

const config = require('./webpack.config.js');
const setup = require('./api.js');
const db = require('./database');

const app = express();
const compiler = webpack(config);

// Unique to each instance of the server (ran once on start)
const secret = `s:${process.pid}`;

app.set('trust proxy', 1);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(cookieSession({
  name: 'session',
  keys: [secret],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  signed: true,
  overwrite: true
}))

setup(app, {});

db.sequelize.sync().then(() => {
  // Serve the files on port 3000.
  app.listen(3000, function () {
    console.log('ReactGames listening on port 3000!\n');
  });
});
