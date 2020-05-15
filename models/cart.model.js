const sql = require("./db.js");

// Constructor
const Cart = function (cart) {
  this.user_id = cart.user_id;
  this.product_id = cart.product_id;
  this.cart_item = cart.cart_item;
  this.quantity = cart.quantity;
};

// Insert
Cart.create = (newCart, result) => {
  sql.query("INSERT INTO carts SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("cart added: ", { cart_id: res.insertId, ...newCart });
    result(null, { cart_id: res.insertId, ...newCart });
  });
};

Cart.findById = (cartId, result) => {
  sql.query(`SELECT * FROM carts WHERE cart_id = ${cartId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found cart: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Cart.getAll = (result) => {
  sql.query(`SELECT * FROM carts`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("carts: ", res);
    result(null, res);
  });
};

Cart.updateById = (cartId, cart, result) => {
  sql.query(
    `UPDATE carts SET user_id=?, product_id=?,cart_item=?, quantity=? WHERE cart_id =? `,
    [cart.user_id, cart.product_id, cart.cart_item, cart.quantity, cartId],
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated cart: ");
      result(null, { cart_id: cartId, ...cart });
    }
  );
};

Cart.remove = (cartId, result) => {
  sql.query(`DELETE FROM carts WHERE user_id = ${cartId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted cart: ");
    result(null, res);
  });
};

Cart.removeAll = (result) => {
  sql.query(`DELETE FROM carts`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(" All Carts Deleted: ");
    result(null, res);
  });
};

module.exports = Cart;
