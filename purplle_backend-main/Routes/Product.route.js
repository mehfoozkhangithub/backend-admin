const express = require("express");
const { ProductModel } = require("../Models/Product.model");
const productRouter = express.Router();

//Get all product
productRouter.get("/", async (req, res) => {
  const product = await ProductModel.find();
  res.send(product);
});

//Add new product
productRouter.post("/createproduct", async (req, res) => {
  const payload = req.body;
  try {
    const new_product = new ProductModel(payload);
    await new_product.save();
    res.send({ msg: "Product created successfully" });
  } catch (err) {
    res.send(400).json({ msg: "Something went wrong" });
  }
});

//Update product
productRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ProductModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete product
productRouter.delete("/delete/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: productID });
    res.send({ msg: "Product deleted successfully" });
  } catch (err) {
    res.send(400).send({ msg: "Something Went Wrong" });
  }
});

module.exports = { productRouter };
