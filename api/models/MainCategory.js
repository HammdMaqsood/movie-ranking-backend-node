
const mongoose = require("mongoose");

const MainCategorySchema = mongoose.Schema({
  MainCategoty_id: mongoose.Schema.Types.ObjectId,
  MainCategory_name: String,
  subcategories: [
    {
      subcategory_name: String,
      sub_subcategories: [
        {
          sub_subcategory_name: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("MainCategory",MainCategorySchema);










// const mongoose = require("mongoose");

// const MainCategorySchema = mongoose.Schema({
//   MainCategoty_id: mongoose.Schema.Types.ObjectId,
//   MainCategory_name: String,
// });

// module.exports = mongoose.model("MainCategory",MainCategorySchema);



// const mongoose = require("mongoose");

// const MainCategorySchema = mongoose.Schema({
//   MainCategoty_id: mongoose.Schema.Types.ObjectId,
//   MainCategory_name: String,
//   subcategories: [
//     {
//       subcategory_name: String,
//       sub_subcategories: [
//         {
//           sub_subcategory_name: String
//         }
//       ]t
//     }
//   ]
// });

// module.exports = mongoose.model("MainCategory",MainCategorySchema);
