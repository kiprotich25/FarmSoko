const express = require ("express");
const { getUserById, getAllSellers } = require ("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);       // GET /api/users/:id
router.get("/", getAllSellers);        // GET /api/users/ (returns all sellers)

export default router;
