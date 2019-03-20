const db = require('../database');

class UserController{
  constructor() {
    this.routes = [
      {url:'/api/user/uuid', call: this.getId}
    ];
  }

  getId(req, res) {
    // Check the session
    if(req.session.uuid) {
      // Get the user
      const uuid = req.session.uuid;

      db.User.findByPk(uuid).then((user) => {
        const identity = user.dataValues;
        res.json(identity);
      }).catch((error) => {
        req.session.uuid = null;
        // Try again
        this.getId(req, res);
      });
    } else {
      // Creating the user
      db.User.create({
        name: 'Incognito',
        image: null,
        connectedAt: new Date()
      }).then((user) => {
        const identity = user.dataValues;
        req.session.uuid = identity.uuid;
        res.json(identity);
      }).catch((error) => {
        res.status(500).json({ error: 'Could not create user uuid' });
      });
    }
  }
}

module.exports = UserController;
