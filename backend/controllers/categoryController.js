const Category = require('../models/Category')

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 exports.seedCategories = async (req, res) => {
  const categories = [
    "Vegetables",
    "Cereals",
    "Fruits",
    "Livestock",
    "Dairy",
  ];

  try {
    // Clear existing categories
    await Category.deleteMany();

    // Insert only if not already present
    const inserted = await Category.insertMany(categories.map((name) => ({ name })));
    res.status(200).json({ message: "Categories seeded successfully", data: inserted });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Failed to seed categories" });
  }
};

