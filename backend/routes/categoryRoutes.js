//
const express = require ("express");
const { createCategory, getCategories,seedCategories } = require ("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);      // POST /api/categories
router.get("/", getCategories);
router.post("/seed", seedCategories);

module.exports = router;
