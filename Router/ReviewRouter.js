const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to write a movie review
router.post('/write-review/:movieId', (req, res) => {
  const { movieId } = req.params;
  const { reviewText, rating } = req.body;

  const newReview = new Review({
    movieId,
    reviewText,
    rating,
  });

  newReview
    .save()
    .then(() => {
      res.json({ message: 'Review submitted successfully' });
    })
    .catch((error) => {
      console.error('Error submitting review:', error);
      res.status(500).json({ error: 'Error submitting review' });
    });
});

// Route to fetch movie reviews by movieId
router.get('/movie-reviews/:movieId', (req, res) => {
  const { movieId } = req.params;
  Review.find({ movieId })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error('Error fetching movie reviews:', error);
      res.status(500).json({ error: 'Error fetching movie reviews' });
    });
});
// New route to fetch all reviews and ratings for a specific movie
router.get('/all-reviews-ratings/:movieId', (req, res) => {
  const { movieId } = req.params;
  Review.find({ movieId })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error('Error fetching all reviews and ratings:', error);
      res.status(500).json({ error: 'Error fetching all reviews and ratings' });
    });
});
module.exports = router;
