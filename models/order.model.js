const sql = require("./db.js");

// Constructor
const Order = function (order) {
  this.user_id = order.user_id;
  this.product_id = order.product_id;
  this.product_name = order.product_name;
  this.delivery_place = order.delivery_place;
  this.address = order.address;
  this.delivery_time = order.delivery_time;
  this.quantity = order.quantity;
  this.total_amount = order.total_amount;
};

// Insert
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("order added: ", { order_id: res.insertId, ...newOrder });
    result(null, { order_id: res.insertId, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  sql.query(`SELECT * FROM orders WHERE order_id = ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Order: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (result) => {
  sql.query(`SELECT * FROM orders`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("orders: ", res);
    result(null, res);
  });
};

Order.updateById = (orderId, order, result) => {
  sql.query(
    `UPDATE orders SET user_id=?, product_id=?,product_name=?, address=?, delivery_place=?, delivery_time=?, quantity=?, total_amount=? WHERE order_id =? `,
    [
      order.user_id,
      order.product_id,
      order.product_name,
      order.delivery_place,
      order.address,
      order.delivery_time,
      order.quantity,
      order.total_amount,
      orderId,
    ],
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
      console.log("Updated Order: ");
      result(null, { order_id: orderId, ...order });
    }
  );
};

Order.remove = (orderId, result) => {
  sql.query(`DELETE FROM orders WHERE order_id = ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Order: ");
    result(null, res);
  });
};

Order.removeAll = (result) => {
  sql.query(`DELETE FROM orders`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(" All Orders Deleted: ");
    result(null, res);
  });
};

module.exports = Order;
