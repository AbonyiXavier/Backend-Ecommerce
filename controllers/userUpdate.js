const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("../models/db");

const signupValidation = require("../models/signupValidation");

const updateUser = (req, res) => {
  //   console.log("show result", req.body);
  // console.log(req["headers"]["auth-token"]);

  let token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log("ouput decided", decoded);
  const user_id = req.params.user_id;
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    city,
  } = req.body;
  const user = {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    city,
    // user_id: decoded.user_id,
  };
  console.log("output user", user);
  const { error } = signupValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    const updateQuery = "UPDATE users SET ? WHERE user_id = ?";
    sql.query(updateQuery, [user, user_id], function (error, result, fields) {
      // console.log(testing);
      if (error) {
        console.log(error);
      } else {
        return res.status(201).json({
          status: "success",
          message: "information updated successfully",
          // userId
          // results: result[0]
        });
      }
    });
  });
};

module.exports = updateUser;
