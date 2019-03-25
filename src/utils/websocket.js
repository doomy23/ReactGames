import io from 'socket.io-client';

let socket = null;

export default (uuid) => {
  if(!socket)
    socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`, {
      path: '/api/ws',
      query: {
        uuid
      }
    });

  return socket;
};
