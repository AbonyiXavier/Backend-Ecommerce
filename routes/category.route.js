module.exports = (app) => {
  const category = require("../controllers/category.controller.js");

  // Add a Product
  app.post("/categories", category.create);

  //Retrive all Product
  app.get("/categories", category.findAll);

  // Retrieve one products
  app.get("/categories/:categoryId", category.findOne);

  // Edit Product
  app.put("/categories/:categoryId", category.update);

  // Delete Product
  app.delete("/categories/:categoryId", category.delete);

  //Delete All Products
  app.delete("/categories", category.deleteAll);
};
