'use strict'

const User = require('../models/User');

module.exports = {
  userCreate: (req, res) => {
    let newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user'
    });
    newUser
      .save()
      .then((response) => {
        res.status(201).json({
          message: "New User Created!",
          response
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error Creating User!!',
          err
        });
      })
  },

  userReadAll: (req, res) => {
    User
      .find()
      .exec()
      .then((users) => {
        res.status(200).json({
          message: 'User list :',
          users
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error!!',
          err
        });
      })
  },

  userRead: (req, res) => {
    User
      .findById(req.params.userId)
      .then((user) => {
        if(user) {
          res.status(200).json({
            message: `Welcome ${user.first_name}`,
            user
          })
        } else {
          throw 'User not found!'
        }
      })
      .catch((err) => {
        res.status(404).json({
          message: 'User not Found',
          err
        });
      })
  },

  userUpdate: (req, res) => {
    User
      .findById(req.params.userId)
      .then((user) => {
        let updateValue = {
          first_name: req.body.first_name || user.first_name,
          last_name: req.body.last_name || user.last_name,
          password: req.body.password || user.password
        }
        User
          .update({
            _id: user._id
          }, {
            $set: updateValue
          })
          .then((response) => {
            return res.status(200).json({
              message: "User Data Updated!",
              response
            })
          })
          .catch((err) => {
            reject()
          })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error!!',
          err
        });
      })
  },

  userDelete: (req, res) => {
    User
      .remove({
        _id: req.params.userId
      })
      .then((response) => {
        res.status(200).json({
          message: "User successfully deleted",
          response
        })
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  }
}
