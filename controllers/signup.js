const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("../models/db");
const signupValidation = require("../models/signupValidation");

const signup = (req, res) => {
  try {
    console.log("show me body", req.body);
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
    };
    const { error } = signupValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const emailExist = "SELECT  COUNT( * ) AS count FROM users WHERE email = ?";
    sql.query(emailExist, [email], (err, data, fields) => {
      if (err) {
        res.send(err);
      } else {
        if (data[0].count > 0) {
          res.status(400).send({
            message: "Email Already Exist",
          });
        } else {
          bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              user.password = hash;
              const saveNewUser = "INSERT INTO users SET ?";
              sql.query(saveNewUser, user, (error, results, fields) => {
                if (error) {
                  return res.send(error);
                } else {
                  const token = jwt.sign(user, process.env.TOKEN_SECRET, {
                    expiresIn: "3600s", // 1min
                  });
                  res.cookie("token", token, {
                    httpOnly: false,
                    secure: false,
                  });
                  res.header("Authorization", token).status(201).json({
                    token,
                    message: "Signup Successfully",
                    // results: results,
                    user: user,
                  });
                }
                console.log(results);
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signup;
