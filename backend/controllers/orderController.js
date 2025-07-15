const Order = require('../models/Order')
exports.createOrder = async (req, res) => {
    const { product, quantity, totalPrice } = req.body;
    const buyer = req.user.userId;
    try {
        const newOrder = new Order({ product, quantity, totalPrice, buyer });
        await newOrder.save();
        res.status(201).json(newOrder);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
};
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.userId })
      .populate("product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

