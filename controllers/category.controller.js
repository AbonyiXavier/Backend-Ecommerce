const Category = require("../models/category.model.js");

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const category = new Category({
    category_name: req.body.category_name,
  });
  console.log(category);

  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your orders",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving category with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`,
          });
          return;
        } else {
          res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId,
          });
          return;
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete category with id " + req.params.categoryId,
        });
      }
    } else res.send({ message: `category was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Category.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting categories.",
      });
    else res.send({ message: ` All categories were deleted successfully!` });
  });
};
