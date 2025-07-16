const User = require ("../models/User.js");
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "farmer" }).select("-password");
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



