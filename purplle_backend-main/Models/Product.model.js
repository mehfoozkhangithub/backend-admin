const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  Rating: String,
  imageUrl: { type: String, required: true },
  brand: String,
  name: { type: String, required: true },
  numReviews: Number,
  category: String,
  Price: Number,
  type: String,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
