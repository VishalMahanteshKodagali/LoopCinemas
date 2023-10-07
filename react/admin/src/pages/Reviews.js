import React, { useState, useEffect } from "react";
import { getMovieReviews, deleteMovieReviewbyId, getUser, editMovieRatings } from "../data/repository";
import '../style.css';
import EditReviewForm from "../components/EditReviewForm";

const ReviewsPage = () => {

  // State to store reviews 
  const [reviews, setReviews] = useState(getMovieReviews());

  // Logged-in user's ID 
  const loggedInUserId = getUser();
  console.log(loggedInUserId);

  // State for edit mode and selected review
  const [editMode, setEditMode] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Function to handle opening edit mode for a review
  const handleEditReview = (review) => {
    setSelectedReview(review);
    setEditMode(true);
  };

  // Function to handle deleting a review
  const handleDeleteReview = (review) => {
    // Remove the review from the state
    setReviews((prevReviews) =>
      prevReviews.filter(
        (r) => r.movieReviewId !== review.movieReviewId
      )
    );
    // Delete the review from the data source
    deleteMovieReviewbyId(review);
  };

  // Function to update a review after editing
  const updateReview = (updatedReview) => {
    //deleteMovieReviews(review);
    // Update the review in the state
    setReviews((prevReviews) =>
      prevReviews.map((r) =>
        r.movieReviewId === updatedReview.movieReviewId
          ? updatedReview
          : r
      )
    );
    editMovieRatings(updatedReview);
    // Exit edit mode
    setEditMode(false);
    setSelectedReview(null);
  };

  // Scroll to top when switching between edit and delete modes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [editMode]);

  return (
    <div className="reviews-page">
      <h2>All Reviews</h2>
      {/* Loop through reviews and display review items */}
      {reviews.map((review, index) => (
        <div className="review-item" key={index}>
          <h3>{review.movieTitle}</h3>
          <p>Rating: {review.rating} stars</p>
          <p>{review.comments}</p>
          <div>
              <button onClick={() => handleDeleteReview(review)}>Delete Review</button>
          </div>
        </div>
      ))}
      {/* Show edit form in edit mode */}
      {editMode && (
        <EditReviewForm
          review={selectedReview}
          onCancel={() => setEditMode(false)}
          onUpdate={updateReview}
        />
      )}
    </div>
  );
};

export default ReviewsPage;

