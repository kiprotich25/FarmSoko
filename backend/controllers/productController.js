const Product = require("../models/Product");

exports.createProduct = async (req, res ) => {
    try {
        const newProduct = new Product (req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
        
    } catch (error) {
        res.status(400).json({ error: error.message})
        
    }
};
exports.getProducts = async(req, res ) => {
    try {
        const products = await Product.find().populate('seller');
        res.json(products)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "username email");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


