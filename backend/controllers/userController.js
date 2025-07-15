const Review= require("../models/Review");

exports.addReview = async (req, res) => {
  const { product, rating, comment } = req.body;
  const reviewer = req.user.userId;

  try {
    const review = new Review({ product, rating, comment, reviewer });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviewsForProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate("reviewer", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
