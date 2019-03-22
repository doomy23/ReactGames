const process = require('process');
const sleep = require('system-sleep');
const { get } = require('lodash');

const db = require('../database');

class UserController{
  constructor() {
    this.routes = [
      {url:'/api/user/uuid', call: this.getUuid}
    ];
  }

  getUuid(req, res) {
    const paramUserName = get(req.body, 'userName', 'Incognito');

    // Check the session
    if(req.session.uuid) {
      // Get the user
      const uuid = req.session.uuid;

      db.User.findByPk(uuid).then((user) => {
        const identity = user.dataValues;

        if(user.name != paramUserName) {
          user.name = paramUserName;
          user.save().then(() => {
            identity.name = paramUserName;
            res.json(identity);
          });
        } else {
          res.json(identity);
        }
      }).catch((error) => {
        req.session.uuid = null;
        // Try again
        this.getUuid(req, res);
      });
    } else {
      // Creating the user
      db.User.create({
        name: paramUserName,
        image: null,
        connectedAt: new Date()
      }).then((user) => {
        const identity = user.dataValues;
        req.session.uuid = identity.uuid;

        console.log();
        if (process.env.NODE_ENV !== 'production') {
          sleep(1500);
        }

        res.json(identity);
      }).catch((error) => {
        res.status(500).json({ error: 'Could not create user uuid' });
      });
    }
  }
}

module.exports = UserController;
