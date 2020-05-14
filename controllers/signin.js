const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("../models/db");
const signinValidation = require("../models/signinValidation");

const signin = (req, res) => {
  const { email, password } = req.body;
  const { error } = signinValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const userEmail = "SELECT * FROM users WHERE email = ?";
  sql.query(userEmail, [email], (error, user, fields) => {
    console.log(user);
    if (error) {
      res.json({
        status: "error",
        message: "please debug me!!!",
      });
    } else {
      if (user.length) {
        const match = bcrypt.compareSync(password, user[0].password);
        if (match) {
          const token = jwt.sign({ id: user[0] }, process.env.TOKEN_SECRET, {
            // expiresIn: "3600s", // 1min
            expiresIn: 60 * 24, // 24hours
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          });
          res.header("Authorization", token).status(201).json({
            token,
            status: "success",
            message: "logged in!",
            user: user[0],
          });
          console.log("my results", user);
        } else {
          res.json({
            status: "error",
            message: "Email and password does not match",
          });
        }
      } else {
        res.json({
          status: "error",
          message: "Email does not exits",
        });
      }
    }
  });
};
module.exports = signin;
