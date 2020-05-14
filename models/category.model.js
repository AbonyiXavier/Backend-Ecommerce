const sql = require("./db.js");

// Constructor
const Category = function (category) {
  this.category_name = category.category_name;
};

// Insert
Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("order added: ", { category_id: res.insertId, ...newCategory });
    result(null, { category_id: res.insertId, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(
    `SELECT * FROM categories WHERE category_id = ${categoryId}`,
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Category: ", res[0]);
        result(null, res[0]);
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Category.getAll = (result) => {
  sql.query(`SELECT * FROM categories`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("categories: ", res);
    result(null, res);
  });
};

Category.updateById = (categoryId, category, result) => {
  sql.query(
    `UPDATE categories SET category_name=? WHERE category_id =? `,
    [category.category_name, categoryId],
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
      console.log("Updated Category: ");
      result(null, { category_id: categoryId, ...category });
    }
  );
};

Category.remove = (categoryId, result) => {
  sql.query(
    `DELETE FROM categories WHERE category_id = ${categoryId}`,
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
      console.log("Deleted category: ");
      result(null, res);
    }
  );
};

Category.removeAll = (result) => {
  sql.query(`DELETE FROM categories`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(" All categories Deleted: ");
    result(null, res);
  });
};

module.exports = Category;
