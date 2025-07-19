// server.js
require ("dotenv").config();
const express = require("express");
const cors = require ("cors");
const connectDB = require ("./config/db")

const app = express()
connectDB()
app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require ("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "API is healthy ✅" });
});




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))

