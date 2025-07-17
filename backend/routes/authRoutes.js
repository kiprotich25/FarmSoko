const express = require('express')
const { register, login, getMe} = require("../controllers/authController")
const router = express.Router();
const  authMiddleware  = require("../middleware/authMiddleware")

router.post('/register', register);
router.post('/login', login);
router.get('/me',authMiddleware, getMe)

module.exports = router