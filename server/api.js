/**
 * API handling requests and websockets
 */
const userMiddleware = require('./middlewares/user');
const ajaxApiMiddleware = require('./middlewares/ajaxApi');
const websocketsApiMiddleware = require('./middlewares/websocketsApi');

module.exports = (app, ws) => {
  // Websockets Api user middleware
  ws.use((socket, next) => {
    const uuid = socket.handshake.query.uuid;
    userMiddleware(uuid, socket.request, null, ws, next);
  });

  // Websockets Api middleware
  ws.on('connection', (socket) => websocketsApiMiddleware(ws, socket));

  // Ajax Api user middleware
  app.use((req, res, next) => {
    if(req.session.uuid) {
      const uuid = req.session.uuid;
      userMiddleware(uuid, req, res, ws, next);

    } else {
      next();
    }
  });

  // Ajax Api middleware
  app.all('/api*', (req, res, next) => {
    ajaxApiMiddleware(req, res, ws, next);
  });
};
