const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: { type: Number, default: 0 },
  baseAmount: Number,
  discount: { type: Number, default: 0 },
  totalAmount: Number,
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Item", ItemSchema);
