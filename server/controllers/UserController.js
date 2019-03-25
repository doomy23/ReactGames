const process = require('process');
const sleep = require('system-sleep');
const { get } = require('lodash');
const Moment = require('moment');

const db = require('../database');
const config = require('../utils/config');
const { makeSuccessResponse } = require('../utils/response');
const { USER_UUID_CREATE_ERROR } = require('../utils/errors');

class UserController{
  constructor() {
    this.routes = [
      {url:'/api/user/uuid', call: this.getUuid}
    ];
  }

  getUuid(req, res) {
    const paramUserName = get(req.body, 'userName', 'Incognito');

    // Check the user
    if(req.user) {
      const identity = req.user.dataValues;

      if(req.user.name != paramUserName) {
        req.user.name = paramUserName;
        req.user.save().then(() => {
          identity.name = paramUserName;
          res.json(makeSuccessResponse(identity));
        });
      } else {
        res.json(makeSuccessResponse(identity));
      }
    } else {
      // Creating the user
      db.User.create({
        name: paramUserName,
        image: null,
        expiresAt: Moment(new Date()).add(config.session.expires_in, 'm').toDate()
      }).then((user) => {
        const identity = user.dataValues;
        req.session.uuid = identity.uuid;
        req.user = user;

        if (process.env.NODE_ENV !== 'production') {
          sleep(1500);
        }

        res.json(makeSuccessResponse(identity));

      }).catch((error) => {
        res.status(500).json(USER_UUID_CREATE_ERROR);
      });
    }
  }
}

module.exports = UserController;
