const express = require("express");
const router = express.Router();
const MainCategoryController = require('../controllers/MainCategory');
const movieController = require('../controllers/movie');





// router.post("/",movieController.Create_movie);
  router.post("/",movieController.movie_save);
// router.get("/",MainCategoryController.MainCategory_get_single);

// router.post("/",MainCategoryController.Create_MainCategory);

//  router.get("/",MainCategoryController.MainCategorys_get_all);

// router.patch("/:productId", checkAuth, ProductsController.products_update_product);

// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;