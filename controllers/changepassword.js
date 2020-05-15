const sql = require("../models/db");
const bcrypt = require("bcryptjs");
const updatePassword = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  let userCheck = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`;
  sql.query(userCheck, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      let isMatch = bcrypt.compareSync(req.body.password, result[0].password);
      if (isMatch) {
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.newpassword, salt);
        let updatepassword = `UPDATE users SET password='${password}' WHERE user_id = '${req.params.user_id}'`;

        sql.query(updatepassword, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            return res.status(200).send(result);
          }
        });
      } else {
        return res.status(201).send({
          message: "Incorrect Current Password",
        });
      }
    }
  });
};

module.exports = updatePassword;
