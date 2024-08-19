const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  taxApplicability: { type: Boolean, default: true },
  tax: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
