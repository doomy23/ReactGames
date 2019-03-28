const { find } = require('lodash');

const {
  UPDATE_USER_NAME_CALL,
  LOAD_ONLINE_USERS_CALL
} = require('../utils/apiCalls');
const controllers = require('../controllers');

module.exports = (ws, socket) => {
  if(socket.request.user) {
    console.log('Connected:', socket.request.user.name);

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.request.user.name);
    });

    // Assigning UserController events
    const UserController = new controllers.user();
    socket.on(UPDATE_USER_NAME_CALL, (name) => UserController.updateName(socket.request, ws, socket, name));

    // Assigning OnlineController events
    const OnlineController = new controllers.online();
    socket.on(LOAD_ONLINE_USERS_CALL, () => OnlineController.loadUsers(socket.request, ws, socket));

  } else {
    // Not supposed to happen unless a websocket is re-opened
    // with a wrong uuid that references an unexisting user
    console.log("Something went wrong here... (middlewares/websocketsApi)");
    //socket.disconnect(true);
  }
};
