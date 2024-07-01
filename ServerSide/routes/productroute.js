const express = require("express");
const productRouter = express.Router();
//import controller
const productController = require("../controllers/productController");

const authController = require("../middlewares/auth");

//define API routes
productRouter.get("/category/all", productController.getAllCategory);
productRouter.get("/subcategory/all", productController.getAllSubCategory);
productRouter.get("/category/", productController.getProductByCategories);
productRouter.get("/getProduct", productController.getProduct);
productRouter.get("/search/any", productController.getProductSearchAny);
productRouter.get("/id/:id", productController.getProductById);

productRouter.post(
  "/createProduct",
  authController.authProtect,
  authController.restrictTo("admin"),
  productController.createProduct
);

productRouter.post("/category/create", productController.createCategory);
productRouter.post("/subcategory/create", productController.createSubCategory);

productRouter.put(
  "/createProduct/:id",
  authController.authProtect,
  authController.restrictTo("admin"),
  productController.updateProductById
);

productRouter.delete("/deleteall", productController.DeleteAllProduct);
productRouter.delete(
  "/category/deleteall",
  productController.DeleteAllCategory
);

productRouter.delete("/:id", productController.DeleteProduct);

module.exports = productRouter;
