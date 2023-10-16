const mongoose = require("mongoose");

const MainCategory = require("../models/MainCategory");

exports.mainCategory_get_all = (req, res, next) => {
  MainCategory.find()
    .select("MainCategoty_id MainCategory_name subcategories")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        MainCategories: docs.map((doc) => {
          return {
            MainCategoty_id: doc.MainCategoty_id,
            MainCategory_name: doc.MainCategory_name,
            subcategories: doc.subcategories,
            request: {
              type: "GET",
              url: "http://localhost:5000/maincategory/" + doc.MainCategoty_id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.mainCategory_create = (req, res, next) => {
  const mainCategory = new MainCategory({
    MainCategoty_id: new mongoose.Types.ObjectId(),
    MainCategory_name: req.body.MainCategory_name,
    subcategories: req.body.subcategories,
  });
  mainCategory
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created MainCategory successfully",
        createdMainCategory: {
          MainCategoty_id: result.MainCategoty_id,
          MainCategory_name: result.MainCategory_name,
          subcategories: result.subcategories,
          request: {
            type: "GET",
            url: "http://localhost:5000/maincategory/" + result.MainCategoty_id,
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
};

// exports.MainCategorys_get_all = (req, res, next) => {
//   MainCategory.find()
//     .select("MainCategory_name  MainCategory_id")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         products: docs.map((doc) => {
//           return {
//             MainCategory_name: doc.MainCategory_name,
//             MainCategory_id: doc.MainCategory_id,
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
// };

// exports.Create_MainCategory = (req, res, next) => {
//   const category = new MainCategory({
//     MainCategory_id: new mongoose.Types.ObjectId(),
//     MainCategory_name: req.body.MainCategory_name,
//   });
//   category
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: "Created Category successfully",
//         createdCategory: {
//           MainCategory_name: result.MainCategory_name,
//           MainCategory_id: result.MainCategory_id,
//           request: {
//             type: "GET",
//             url: "http://localhost:5000/products/" + result._id,
//           },
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

// exports.MainCategory_get_single= (req, res, next) => {
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
