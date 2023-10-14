import React, { useState } from "react";

const EditReviewForm = ({ review, onCancel, onUpdate }) => {
    const [editedReview, setEditedReview] = useState({ ...review });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      const updatedValue = name === "review_rating" ? parseInt(value, 10) : value;
      setEditedReview((prevReview) => ({
        ...prevReview,
        [name]: updatedValue,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("INside compo"+JSON.stringify(editedReview))
      onUpdate(editedReview);
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Review</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="review_rating">Rating (1 - 5 stars)</label>
              <input
                type="number"
                id="review_rating"
                name="review_rating"
                min="1"
                max="5"
                value={editedReview.review_rating}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="review_description">Comments</label>
              <textarea
                id="review_description"
                name="review_description"
                value={editedReview.comments}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">Update Review</button>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default EditReviewForm;