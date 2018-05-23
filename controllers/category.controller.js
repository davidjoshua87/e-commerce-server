const Category = require('../models/Category');

module.exports = {
  categoryCreate: (req, res) => {
    let newCategory = new Category({
      name: req.body.name || "Name"
    })
    newCategory
      .save()
      .then((response) => {
        return res.status(201).json({
          success: true,
          message: "New category created!",
          response
        })
      })

  },

  categoryReadAll: (req, res) => {
    Category
      .find()
      .exec()
      .then((categories) => {
        return res.status(200).json({
          categories
        })
      })
      .catch((err) => {
        return res.status(500).json({
          message: err
        })
      })
  },

  categoryUpdate: (req, res) => {
    Category
      .findById(req.params.categoryId)
      .then((category) => {
        let updateValue = {
          name: req.body.name || category.name
        }
        Category
          .update({
            _id: category._id
          }, {
            $set: updateValue
          })
          .then((response) => {
            return res.status(200).json({
              message: "Category data updated!",
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

  categoryDelete: (req, res) => {
    Category
      .remove({
        _id: req.params.categoryId
      })
      .then((response) => {
        return res.status(200).json({
          message: "Category successfully deleted",
          response
        })
      })
      .catch((err) => {
        return res.status(500).send(err);
      })
  }
}
