const Cart = require("../models/cart.model.js");

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const cart = new Cart({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    cart_item: req.body.cart_item,
    quantity: req.body.quantity,
  });
  // console.log(cart);

  Cart.create(cart, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your carts",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Cart.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cart.findById(req.params.cartId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order with id ${req.params.cartId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving cart with id " + req.params.cartId,
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

  Cart.updateById(req.params.cartId, new Cart(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found cart with id ${req.params.cartId}.`,
        });
        return;
      } else {
        res.status(500).send({
          message: "Error updating cart with id " + req.params.cartId,
        });
        return;
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Cart.remove(req.params.cartId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cart with id ${req.params.cartId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete cart with id " + req.params.cartId,
        });
      }
    } else res.send({ message: `cart was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Cart.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting carts.",
      });
    else res.send({ message: ` All carts were deleted successfully!` });
  });
};
