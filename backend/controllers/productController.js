/////productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.createProduct = async (req, res) => {
  try {
    const { category, ...productData } = req.body;

    // Look up the category by _id (sent from frontend)
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      console.log("Category not found in DB:", category);
      const allCategories = await Category.find();
      console.log("Available categories:", allCategories.map(c => c.name));
      return res.status(400).json({ error: "Invalid category" });
    }

    const newProduct = new Product({
      ...productData,
      category: foundCategory._id,
      seller: req.user.userId,
    });

    await newProduct.save();

    // Populate category for immediate response if needed
    const populatedProduct = await newProduct.populate("category", "name");

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("seller", "username email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("seller", "username email");

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const myProducts = await Product.find({ seller: req.user.userId })
      .populate("seller", "username email")
      .populate("category", "name");

    res.json(myProducts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { category, ...updateData } = req.body;

    let updatedFields = { ...updateData };

    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ error: "Invalid category" });
      }
      updatedFields.category = foundCategory._id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name");

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
