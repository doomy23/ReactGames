/**
 * API handling requests and websockets
 */
const { find } = require('lodash');
const Moment = require('moment');

const config = require('./utils/config');
const db = require('./database');
const controllers = require('./controllers');
const { SESSION_EXPIRED_ERROR } = require('./utils/errors');

module.exports = (app, ws) => {
  // Check if user is in and check its expiration
  app.all('*', (req, res, next) => {
    if(req.session.uuid) {
      const uuid = req.session.uuid;

      db.User.findByPk(uuid).then((user) => {
        // Check user expiresAt
        if(user.expiresAt.diff(Moment(new Date())) > 0) {
          // OK - Update the expiresAt date
          req.user = user;
          user.expiresAt = Moment(new Date()).add(config.user_session_expires_in, 'm').toDate();

          user.save().then(() => {
            next();
          }).catch((error) => {
            // Not supposed to happen...
            next();
          });

        } else {
          // Expired!
          req.session.uuid = null;
          req.user = undefined;
          res.status(500).json(SESSION_EXPIRED_ERROR);
        }

      }).catch((error) => {
        req.session.uuid = null;
        req.user = undefined;
        next();
      });

    } else {
      next();
    }
  });

  // Basic Api in ajax
  app.all('/api*', (req, res, next) => {
    const urlParams = req.url.split('/');
    let foundApiRoute = false;

    if(urlParams.length > 3) {
      const controller = urlParams[2];

      // No next on websockets
      if(controller == 'ws')
        foundApiRoute = true;

      if(controller in controllers) {
        const instance = new controllers[controller]();
        const route = find(instance.routes, {url: req.url});

        if(route) {
          foundApiRoute = true;
          route.call.bind(instance)(req, res);
        }
      }
    }

    if(!foundApiRoute)
      next();
  });

  // Websockets API
  ws.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('event', (value) => {
      console.log('value: ' + value);
      ws.emit('event', 'LOL');
    });
  });

  return app;
};
