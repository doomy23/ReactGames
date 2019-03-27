const { find } = require('lodash');

const controllers = require('../controllers');

module.exports = (req, res, ws, next) => {
  const urlParams = req.url.split('/');
  let foundApiRoute = false;

  if(urlParams.length > 3) {
    const controller = urlParams[2];

    if(controller == 'ws') {
      // No Ajax next on Websockets Api
      foundApiRoute = true;

    } else {
      if(controller in controllers) {
        const instance = new controllers[controller]();
        const route = find(instance.routes, {url: req.url});

        if(route) {
          foundApiRoute = true;
          route.call.bind(instance)(req, res, ws);
        }
      }
    }
  }

  if(!foundApiRoute)
    next();
};
