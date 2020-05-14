const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  // const token = req.header("Authorization");
  // console.log(req);
  const token = req.cookies.token || req.header("Authorization");
  console.log("my token", token);
  try {
    if (!token) {
      return res.status(401).json("Access Denied");
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("my name", decoded);
    res.send(decoded.id);
    req.user = decoded;
    console.log("my user", req.user);
    // next();
  } catch (error) {
    return res.status(500).json(error.toString());
  }
};
module.exports = verifyToken;
