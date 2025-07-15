const express = require ("express");
const { createCategory, getCategories } = require ("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);      // POST /api/categories
router.get("/", getCategories);        // GET /api/categories

export default router;
