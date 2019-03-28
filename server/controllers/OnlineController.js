// For testing purpose in dev
const process = require('process');
const sleep = require('system-sleep');

const { find } = require('lodash');
const { Op } = require('sequelize');
const Moment = require('moment');

const db = require('../database');
const config = require('../utils/config');
const { makeSuccessResponse } = require('../utils/response');

const {
  LOAD_ONLINE_USERS_CALL
} = require('../utils/apiCalls');
const {
  LOAD_ONLINE_USERS_ERROR
} = require('../utils/errors');

class OnlineController {
  loadUsers(req, ws, socket) {
    const users = [];
    console.log(req.user.uuid, socket.id);
    // Get all User models who are not the user
    // and that the expiresAt date is OK
    db.User.findAll({
      where: {
        uuid: {
          [Op.ne]: req.user.uuid
        },
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    }).then((usersModels) => {
      // Get all the connected sockets and associate
      // it with the correct User model for response
      Object.keys(ws.sockets.connected).forEach(id => {
        if(id !== socket.id) {
          const wsSocket = ws.sockets.connected[id];
          const wsUuid = wsSocket.handshake.query.uuid;
          const wsUser = find(usersModels, {dataValues: {uuid: wsUuid}});

          if(wsUuid && wsUser) {
            const userData = {
              id,
              uuid: wsUuid,
              name: wsUser.name,
              image: wsUser.image,
              expiresAt: wsUser.expiresAt
            };

            users.push(userData);
          }
        }
      });

      if (process.env.NODE_ENV !== 'production') {
        sleep(1500);
      }

      socket.emit(LOAD_ONLINE_USERS_CALL, makeSuccessResponse({ users }));

    }).catch((error) => {
      socket.emit(LOAD_ONLINE_USERS_CALL, LOAD_ONLINE_USERS_ERROR);
    });
  }
}

module.exports = OnlineController;
