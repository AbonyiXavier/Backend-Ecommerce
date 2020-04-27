const express = require("express");
const bodyParser = require("body-parser");
var cloudinary = require("cloudinary").v2;
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const app = express();

//Parse requset of content type application/json
app.use(bodyParser.json());

//Parse content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.get("/", (req, res) => {
  res.json("Welcome to our node.js application");
});

require("./routes/product.route.js")(app);

app.listen(5000, () => {
  console.log("Nodejs backend application is running at 5000");
});
