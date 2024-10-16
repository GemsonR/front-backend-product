import Product from "../models/product.model.js";
import mongoose from "mongoose";

const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in fetching product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const creatProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide all fileds" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in creating product. ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: " Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res
      .status(200)
      .json({
        success: true,
        data: updatedProduct,
        message: "Updated Successfully!",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Input Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log("Error for deleting products", error.message);
  }
};

export { getProduct, creatProduct, updateProduct, deleteProduct };
