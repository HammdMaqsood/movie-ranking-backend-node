const mongoose = require("mongoose");

const Category = require("../models/Category");
const MainCategory=require('../models/MainCategory')

exports.Categorys_get_all = (req, res, next) => {
    Category.find()
  .select("Category_name MainCategory_name Category_id")
  .populate("_id", "MainCategory_name")
  .exec()
  .then(categories => {
    if (!categories) {
      return res.status(404).json({
        message: "Categories not found"
      });
    }
    const result = [];
    let mainCategory = {};
    categories.forEach(category => {
      if (!mainCategory[category.MainCategory_name]) {
        mainCategory[category.MainCategory_name] = [];
      }
      mainCategory[category.MainCategory_name].push({
        Category_name: category.Category_name,
        // Category_id: category.Category_id
      });
    });
    for (const key in mainCategory) {
      result.push({
        MainCategory_name: key,
        categories: mainCategory[key]
      });
    }
    res.status(200).json({
      categories: result,
      request: {
        type: "GET",
        url: "http://localhost:5000/categories"
      }
    });
  });





//   Category.find()
//     .select("Category_name Category_id MainCategory_name")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         products: docs.map((doc) => {
//           return {
//             Category_name: doc.Category_name,
//             MainCategory_name:doc.MainCategory_name,

//             Category_id: doc.Category_id,
//             request: {
//               type: "GET",
//               url: "http://localhost:5000/products/" + doc._id,
//             },
//           };
//         }),
//       };

//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
};

exports.Create_Category = (req, res, next) => {
  MainCategory.findOne({MainCategory_name:req.body.MainCategory_name}).then((MainCategory) => {
    if (!MainCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const categoryy = new Category({
     Category_id: new mongoose.Types.ObjectId(),
      Category_name: req.body.Category_name,
      MainCategory_name: req.body.MainCategory_name,
    });
    categoryy
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdcategory: {
            Category_id:result.Category_id,
            Category_name:result.Category_name,
             MainCategory_name:result.MainCategory_name,

            request: {
              type: "GET",
              url:
                "http://localhost:5000/products/" +
                result.Category_name.replace(/\s+/g, "-"),
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  // const category= new Category({
  //     _id: new mongoose.Types.ObjectId(),
  //     name: req.body.name,

  // });
  // category
  //     .save()
  //     .then(result => {
  //         console.log(result);
  //         res.status(201).json({
  //             message: "Created Category successfully",
  //             createdCategory: {
  //                 name: result.name,
  //                 _id: result._id,
  //                 request: {
  //                     type: "GET",
  //                     url: "http://localhost:5000/products/" + result._id
  //                 }
  //             }
  //         });
  //     })
  //     .catch(err => {
  //         console.log(err);
  //         res.status(500).json({
  //             error: err
  //         });
  //     });
};

// exports.products_get_product = (req, res, next) => {
//     const id = req.params.productId;
//     Product.findById(id)
//         .select("name price _id productImage")
//         .exec()
//         .then(doc => {
//             console.log("From database", doc);
//             if (doc) {
//                 res.status(200).json({
//                     product: doc,
//                     request: {
//                         type: "GET",
//                         url: "http://localhost:5000/products"
//                     }
//                 });
//             } else {
//                 res
//                     .status(404)
//                     .json({ message: "No valid entry found for provided ID" });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// };

// exports.products_update_product = (req, res, next) => {
//     const id = req.params.productId;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product updated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:5000/products/" + id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// exports.products_delete = (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({ _id: id })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:5000/products",
//                     body: { name: "String", price: "Number" }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };
