const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  Category_id: mongoose.Schema.Types.ObjectId,
  Category_name: String,
  MainCategory_name:{type: String, ref: 'MainCategory', required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
