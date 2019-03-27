const { find } = require('lodash');

const controllers = require('../controllers');

module.exports = (ws, socket) => {
  if(socket.request.user) {
    console.log('Connected:', socket.request.user.name);

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.request.user.name);
    });

    const UserController = new controllers.user();
    socket.on('user/update/name', (name) => UserController.updateName(socket.request, null, ws, socket, name));

  } else {
    // Not supposed to happen unless a websocket is re-opened
    // with a wrong uuid that references an unexisting user
    socket.disconnect(true);
  }
};
