const Moment = require('moment');

const config = require('../utils/config');
const db = require('../database');
const { SESSION_EXPIRED_ERROR } = require('../utils/errors');

module.exports = (uuid, req, res, next) => {
  db.User.findByPk(uuid).then((user) => {
    if(user) {
      // Check user expiresAt
      const userTTLmins = Moment.duration(Moment(user.expiresAt).diff(Moment(new Date()))).asMinutes();

      if(userTTLmins > 0 && config.session.expires_in - userTTLmins >= config.session.expires_update_each) {
        // OK - Update the expiresAt date if time since last update >= config...
        req.user = user;
        user.expiresAt = Moment(new Date()).add(config.session.expires_in, 'm').toDate();

        // If we can extend cookie expiration
        if(req.session)
          req.session.nowInMinutes = Math.floor(Date.now() / 60e3);

        user.save().then(() => {
          return next();
        }).catch((error) => {
          // Not supposed to happen...
          return next();
        });

      } else if(userTTLmins > 0) {
        // Ok - No need to update yet
        req.user = user;
        return next();

      } else {
        // Expired!
        if(req.session)
          req.session.uuid = null;

        req.user = undefined;

        if(res)
          res.status(500).json(SESSION_EXPIRED_ERROR);
        else
          return next();
      }
    } else {
      // The user doesnt exists yet:
      // This is possible if in the session the uuid reference
      // a user that is no longer in the database.
      return next();
    }

  }).catch((error) => {
    if(req.session)
      req.session.uuid = null;

    req.user = undefined;
    return next();
  });
};
