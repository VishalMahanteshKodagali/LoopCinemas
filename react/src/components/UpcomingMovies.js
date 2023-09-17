import React, { useState,useEffect } from "react";
import MovieItem from "./MovieItem";
import { movies, getMovieReviews, updateMovieRatings,getLoggedInUserDetails, getUser } from "../data/repository";
import Review from "./Review";



const UpcomingMovies = () => {

  // Clear user review count from local storage every 10 seconds
  useEffect(() => {
  const clearReviewCountInterval = setInterval(() => {
    const userId = getUser.userId;
    const updatedReviewCount = {
      ...userReviewCount,
      [userId]: 0,
    };

    setUserReviewCount(updatedReviewCount);
    localStorage.setItem('userReviewCount', JSON.stringify(updatedReviewCount));
  }, 10000); 

  // Clear the interval when the component unmounts
  return () => {
    clearInterval(clearReviewCountInterval);
  };
}, []);

  // Hardcoded data for upcoming movies and session times
  const upcomingMovies = movies;
  const [showReview, setShowReview] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userReviewCount, setUserReviewCount] = useState(
    JSON.parse(localStorage.getItem('userReviewCount')) || {});
  
  // Hardcoded ratings data for demonstration
  const ratingsData = getMovieReviews();
  

  const handleLeaveReview = (movieTitle) => {
    const userId = getUser.userId; 
    
    // Check if user has exceeded review limit (3 reviews per user)
    if (userReviewCount[userId] && userReviewCount[userId] >= 3) {
      alert("You have reached the review submission limit.");
      return;
    }
    setSelectedMovie(movieTitle);
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
    setSelectedMovie(null);
  };

  const handleSubmitReview = (movieTitle, rating, comments) => {
    const userId = getUser();

  if (userReviewCount[userId] && userReviewCount[userId] >= 3) {
    alert("You have reached the review submission limit.");
    return;
  }

  // Update user's review count
  const updatedReviewCount = {
    ...userReviewCount,
    [userId]: (userReviewCount[userId] || 0) + 1,
  };

  setUserReviewCount(updatedReviewCount);

  // Store the updated review count in local storage
  localStorage.setItem('userReviewCount', JSON.stringify(updatedReviewCount));


    // Save the review data to a localStorage.
    const movieReview = {
      movieReviewId : Math.floor(Date.now() / 1000),
      movieTitle: movieTitle,
      rating: rating,
      comments: comments,
      userId: userId,
    };
    updateMovieRatings(movieReview);
  };

  // Calculate average rating for each movie
  const averageRatings = upcomingMovies.reduce((acc, movie) => {
    const movieRatings = getMovieReviews().filter((rating) => rating.movieTitle === movie.title);
    if (movieRatings.length > 0) {
      const totalRating = movieRatings.reduce((sum, rating) => sum + rating.rating, 0);
      acc[movie.title] = totalRating / movieRatings.length;
    } else {
      acc[movie.title] = 0;
    }
    return acc;
  }, {});

  // Sort movies based on average ratings (from highest to lowest)
  upcomingMovies.sort((a, b) => averageRatings[b.title] - averageRatings[a.title]);

  return (
    <div className="upcoming-movies">
      <h2>Upcoming Movies</h2>
      <ul>
        {upcomingMovies.map((movie, index) => (
          <li key={index}>
            <MovieItem title={movie.title} sessionTime={movie.sessionTime} image ={movie.image} />
            <p>Average Rating: {averageRatings[movie.title].toFixed(1)} stars</p>
            {getLoggedInUserDetails() && <button onClick={() => handleLeaveReview(movie.title)}>
              Leave Review
            </button>}
          </li>
        ))}
      </ul>
      {showReview && (
        <Review
          movieTitle={selectedMovie}
          onClose={handleCloseReview}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default UpcomingMovies;
