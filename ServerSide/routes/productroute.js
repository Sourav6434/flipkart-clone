const express = require('express');
const productRouter = express.Router();
//import controller
const productController = require('../controllers/productController');

const {auth} = require("../middlewares/auth");

//define API routes
productRouter.get("/category/all", productController.getAllCategory);
productRouter.get("/subcategory/all", productController.getAllSubCategory);
productRouter.get("/category/", productController.getProductByCategories);
productRouter.get("/getProduct", productController.getProduct);
productRouter.get("/search/any", productController.getProductSearchAny);
productRouter.get("/id/:id", productController.getProductById);
productRouter.get("/bookmark/:id", productController.getProductByBookmark);
productRouter.get("/your/:wishlist", productController.getProductByWishlist);
productRouter.post("/createProduct", productController.createProduct);
productRouter.post("/category/create", productController.createCategory);
productRouter.post("/subcategory/create", productController.createSubCategory);
productRouter.put("/createProduct/:id", productController.updateProductById);
productRouter.put("/bookmark/:id", productController.UpdateBookmark);
productRouter.delete("/deleteall", productController.DeleteAllProduct);
productRouter.delete("/category/deleteall", productController.DeleteAllCategory);
productRouter.delete("/:id", productController.DeleteProduct);







module.exports = productRouter;