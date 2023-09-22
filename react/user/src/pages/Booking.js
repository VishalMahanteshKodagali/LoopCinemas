import React from "react";
import { useLocation } from "react-router-dom";
import '../Style/booking.css'; 
import BookTickets from "../components/BookTickets";


const Booking = () => {
  const location = useLocation();
  const { movie } = location.state;

  const sessions = ["Session 1", "Session 2"];

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Booking Details for {movie.title}</h1>
        <p>Session Time: {movie.sessionTime}</p>
      </div>

      <div className="movie-details">
        <img src={movie.image} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>Genre: {movie.genre}</p>
          <p>Duration: {movie.duration} minutes</p>
          <p>Language: {movie.language}</p>
          <p>Rating: {movie.averageRating}/10</p>
        </div>
      </div>

      <div className="booking-section">
      <BookTickets movie={movie} sessions={sessions} />
      </div>
    </div>
  );
};

export default Booking;
