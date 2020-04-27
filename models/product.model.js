const sql = require("./db.js");

// Constructor
const Product = function (product) {
  this.product_name = product.product_name;
  this.description = product.description;
  this.image = product.image;
  this.product_price = product.product_price;
};

// Insert
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("product added: ", { product_id: res.insertId, ...newProduct });
    result(null, { product_id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(
    `SELECT * FROM products WHERE product_id =   ${productId}`,
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Product: ", res[0]);
        result(null, res[0]);
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Product.getAll = (result) => {
  sql.query(`SELECT * FROM products`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (productId, product, result) => {
  sql.query(
    `UPDATE products SET product_name=?, description=?, image=?, product_price=?  WHERE product_id =? `,
    [
      product.product_name,
      product.description,
      product.image,
      product.product_price,
      productId,
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
      console.log("Updated Product: ");
      result(null, { product_id: productId, ...product });
    }
  );
};

Product.remove = (productId, result) => {
  sql.query(
    `DELETE FROM products WHERE product_id =   ${productId}`,
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
      console.log("Deleted Product: ");
      result(null, res);
    }
  );
};

Product.removeAll = (result) => {
  sql.query(`DELETE FROM products`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(" All Products Deleted: ");
    result(null, res);
  });
};

module.exports = Product;
