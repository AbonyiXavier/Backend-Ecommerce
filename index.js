const express = require("express");
const bodyParser = require("body-parser");
var cloudinary = require("cloudinary").v2;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const signupRoute = require("./controllers/signup");
const signinRoute = require("./controllers/signin");
const updateUser = require("./controllers/userUpdate");
const updatePasswordRoute = require("./controllers/changepassword");
const logoutRoute = require("./controllers/logout");
const verifyToken = require("./middleware/verifyToken");

require("dotenv").config();

const app = express();

//Parse requset of content type application/json
app.use(bodyParser.json());

//Parse content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
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

app.post("/signup", signupRoute);
app.post("/signin", signinRoute);
app.post("/updatePassword/:user_id", updatePasswordRoute);
app.patch("/updateUser/:user_id", updateUser);
app.post("/logout", logoutRoute);

app.get("/authUser", verifyToken, (req, res, next) => {
  res.send("my auth user");
});

require("./routes/product.route.js")(app);
require("./routes/order.route.js")(app);
require("./routes/category.route.js")(app);
require("./routes/cart.route.js")(app);

app.listen(5000, () => {
  console.log("Nodejs backend application is running at 5000");
});
