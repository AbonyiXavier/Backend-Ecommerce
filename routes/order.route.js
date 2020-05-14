module.exports = (app) => {
  const order = require("../controllers/order.controller.js");
  const verifyToken = require("../middleware/verifyToken");
  // Add a Product
  app.post("/orders", order.create);

  //Retrive all order
  app.get("/orders", verifyToken, order.findAll);

  // Retrieve one orders
  app.get("/orders/:orderId", order.findOne);

  // Edit order
  app.put("/orders/:orderId", order.update);

  // Delete order
  app.delete("/orders/:orderId", order.delete);

  //Delete All orders
  app.delete("/orders", order.deleteAll);
};
