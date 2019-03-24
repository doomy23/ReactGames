class WebsocketsEvents {
  constructor() {
    this.websocket = null;
  }

  bind(ws) {
    this.websocket = ws;

    // Add events
    ws.on('event', (value) => {
      console.log('value: ' + value);
    });
  }
}

export default WebsocketsEvents;
