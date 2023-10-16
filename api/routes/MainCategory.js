const express = require("express");
const router = express.Router();
const MainCategoryController = require('../controllers/MainCategory');





// router.post("/",MainCategoryController.Create_MainCategory);
  router.get("/",MainCategoryController.mainCategory_get_all);
  router.post("/",MainCategoryController.mainCategory_create);







// router.get("/",MainCategoryController.MainCategory_get_single);

// router.post("/",MainCategoryController.Create_MainCategory);

//  router.get("/",MainCategoryController.MainCategorys_get_all);

// router.patch("/:productId", checkAuth, ProductsController.products_update_product);

// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;