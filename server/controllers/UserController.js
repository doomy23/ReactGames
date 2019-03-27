const process = require('process');
const sleep = require('system-sleep');
const { get } = require('lodash');
const Moment = require('moment');

const db = require('../database');
const config = require('../utils/config');
const { makeSuccessResponse } = require('../utils/response');
const {
  LOAD_USER_ERROR,
  UPDATE_USER_NAME_ERROR,
} = require('../utils/errors');

class UserController{
  constructor() {
    this.routes = [
      {url: '/api/user/load', call: this.load}
    ];
  }

  load(req, res, ws) {
    const paramUserName = get(req.body, 'userName', 'Incognito');

    // Check the user
    if(req.user) {
      if(req.user.name != paramUserName) {
        req.user.name = paramUserName;

        req.user.save().then(() => {
          res.json(makeSuccessResponse(req.user.dataValues));

        }).catch((error) => {
          res.status(500).json(UPDATE_USER_NAME_ERROR);
        });
      } else {
        res.json(makeSuccessResponse(req.user.dataValues));
      }
    } else {
      // Creating the user
      db.User.create({
        name: paramUserName,
        image: null,
        expiresAt: Moment(new Date()).add(config.session.expires_in, 'm').toDate()
      }).then((user) => {
        req.session.uuid = user.uuid;
        req.user = user;

        if (process.env.NODE_ENV !== 'production') {
          sleep(1500);
        }

        res.json(makeSuccessResponse(user.dataValues));

      }).catch((error) => {
        res.status(500).json(USER_UUID_CREATE_ERROR);
      });
    }
  }

  updateName(req, res, ws, socket, name) {
    if(req.user) {
      req.user.name = name;

      req.user.save().then(() => {
        socket.emit('user/update/name', makeSuccessResponse({
          name: name
        }));
        
        // Send to all except the user
        socket.broadcast.emit('users/update/name', makeSuccessResponse({
          id: socket.id,
          name: name
        }));

      }).catch((error) => {
        if(res)
          res.status(500).json(UPDATE_USER_NAME_ERROR);
        else
          socket.emit('user/update/name', UPDATE_USER_NAME_ERROR);
      });

    } else {
      if(res)
        res.status(500).json(UPDATE_USER_NAME_ERROR);
      else
        socket.emit('user/update/name', UPDATE_USER_NAME_ERROR);
    }
  }
}

module.exports = UserController;
