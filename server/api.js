/**
 * API middleware
 */
const { find } = require('lodash');
const controllers = require('./controllers');

module.exports = (app, options) => {
  app.all('/api*', (req, res, next) => {
    const urlParams = req.url.split('/');
    let foundApiRoute = false;

    if(urlParams.length > 3) {
      const controller = urlParams[2];

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

  return app;
};
