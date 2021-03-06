require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  login: (req, res) => {
    User
      .findOne({
        email: req.body.email
      })
      .then((user) => {
        if(user) {
          if(bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).json({
              token: jwt.sign({
                id: user._id,
                role: user.role
              }, 'secret')
            })
          } else {
            reject();
          }
        } else {
          reject();
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'Incorrect email or password!'
        })
      })
  },

  verifyAdmin: (req, res) => {
    try {
      let decoded = jwt.verify(req.headers.apptoken, 'secret')
      if(decoded.role == 'admin') {
        return res.status(200).send('admin')
      } else {
        return res.status(200).send('user')
      }
    } catch(error) {
      return res.status(200).send(null)
    }
  }
}
