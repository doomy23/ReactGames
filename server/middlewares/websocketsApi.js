module.exports = (ws, socket) => {
  if(socket.request.user) {
    console.log('Connected:', socket.request.user.name);

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.request.user.name);
    });

    socket.on('event', (value) => {
      console.log('value: ' + value);
      ws.emit('event', 'LOL');
    });
  } else {
    // Not supposed to happen unless a websocket is re-opened
    // with a wrong uuid that references an unexisting user
    socket.disconnect(true);
  }
};
