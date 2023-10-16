const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/Category');





// router.get("/", ProductsController.products_get_all);

router.post("/",CategoryController.Create_Category);

 router.get("/",CategoryController.Categorys_get_all );

// router.patch("/:productId", checkAuth, ProductsController.products_update_product);

// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;