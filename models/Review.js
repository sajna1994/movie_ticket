const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: String,
  reviewText: String,
  rating: Number,
});

module.exports = mongoose.model('Review', reviewSchema);
