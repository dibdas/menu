const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: { type: Number, default: 0 },
  taxType: String,
});

module.exports = mongoose.model("Category", CategorySchema);
