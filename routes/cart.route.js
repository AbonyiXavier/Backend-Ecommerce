module.exports = (app) => {
  const cart = require("../controllers/cart.controller.js");
  const verifyToken = require("../middleware/verifyToken");
  // Add a Product
  app.post("/carts", cart.create);

  //Retrive all order
  app.get("/carts", verifyToken, cart.findAll);

  // Retrieve one orders
  app.get("/carts/:cartId", cart.findOne);

  // Edit order
  app.put("/carts/:cartId", cart.update);

  // Delete order
  app.delete("/carts/:cartId", cart.delete);

  //Delete All orders
  app.delete("/carts", cart.deleteAll);
};
