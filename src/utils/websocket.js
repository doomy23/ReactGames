import io from 'socket.io-client';

import { PromiseWithTimeout } from './promise';

class Websocket {
  static instance = null;

  static getInstance () {
    if (!Websocket.instance) {
      Websocket.instance = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);
    }
    return Websocket.instance;
  }

  static setup(uuid) {
    Websocket.instance = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`, {
      path: '/api/ws',
      query: { uuid }
    });

    const promise = PromiseWithTimeout(60000,
      (resolve, reject) => {
        Websocket.instance.on('connect', () => {
          console.log('YO', Websocket.instance);
          resolve(Websocket.instance);
        });
    });

    if(!Websocket.instance.connected)
      Websocket.instance.connect();

    return promise;
  }
}

export default Websocket;
