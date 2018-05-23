'use strict'

const Item = require('../models/Item');

module.exports = {
  itemCreate: (req, res) => {
    Item.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      imageUrl: req.file.cloudStoragePublicUrl,
    }, (err, newpost) => {
      if(err) {
        return res.status(400).json({
          message: `create post erorr ${err}`,
          data: {}
        })
      } else {
        res.status(200).json({
          message: `post success`,
          data: newpost
        })
      }
    })
  },
  itemReadAll: (req, res) => {
    Item
      .find()
      .exec()
      .then((items) => {
        return res.status(200).json({
          items
        })
      })
      .catch((err) => {
        return res.status(500).json({
          message: err
        })
      })
  },

  itemUpdate: (req, res) => {
    Item
      .findById(req.params.itemId)
      .then((item) => {
        let updateValue = {
          name: req.body.name || item.name,
          imageUrl: req.body.imageUrl || item.imageUrl,
          price: req.body.price || item.price,
          stock: req.body.stock || item.stock
        }
        Item
          .update({
            _id: item._id
          }, {
            $set: updateValue
          })
          .then((response) => {
            return res.status(200).json({
              message: "Item data updated!",
              response
            })
          })
          .catch((err) => {
            reject()
          })
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'Error!!',
          err
        });
      })
  },

  itemDelete: (req, res) => {
    Item
      .remove({
        _id: req.params.itemId
      })
      .then((response) => {
        return res.status(200).json({
          message: "Item successfully deleted",
          response
        })
      })
      .catch((err) => {
        return res.status(500).send(err);
      })
  }
}
