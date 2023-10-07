import React, { useState, useEffect } from "react";
import { getLoggedInUserDetails } from "../data/repository";
import "../Style/bookTickets.css";
import { useNavigate } from "react-router-dom"; 


const BookTickets = ({ movie }) => {
 
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSession, setSelectedSession] = useState(0);
  const [availableTickets, setAvailableTickets] = useState(10); // 0 for the first session, 1 for the second
  const user = getLoggedInUserDetails();
  const username = user ? user.username : "Guest User";

  const navigate = useNavigate();

  const goBack = (movie) => {
    navigate("/");
  }

  useEffect(() => {
    const sessionKey = `${movie.title}_session${selectedSession}`;
    const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
    const bookedTickets = bookingData[sessionKey] || 0;
    setAvailableTickets(10 - bookedTickets);
  }, [selectedSession, movie.title]);

 
  const handleSessionChange = (sessionIndex) => {
    setSelectedSession(parseInt(sessionIndex, 10));
  };

  
  const handleTicketCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setTicketCount(count);
  };

 
  const handleBookTickets = () => {
    const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};

    
    const sessionKey = `${movie.title}_session${selectedSession}`;
    const availableTickets = 10 - (bookingData[sessionKey] || 0);

    if (ticketCount > availableTickets) {
      alert(`Only ${availableTickets} tickets are available for this session.`);
      return;
    }

    const booking = {
        username: username,
        movieName: movie.title,
        session: `Session ${selectedSession + 1}`,
        ticketCount: ticketCount,
      };

    const userBookingHistory = JSON.parse(localStorage.getItem(username)) || [];
    userBookingHistory.push(booking);
    localStorage.setItem(username, JSON.stringify(userBookingHistory));

    bookingData[sessionKey] = (bookingData[sessionKey] || 0) + ticketCount;
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    alert(`Successfully booked ${ticketCount} ticket(s) for ${movie.title}.`);
  };

  return (
    <div className="book-tickets">
      <h2>Book Tickets</h2>
      <div className="session-selection">
        <label>Select Session:</label>
        <select
          value={selectedSession}
          onChange={(e) => handleSessionChange(e.target.value)}
        >
          <option value={0}>Session 1</option>
          <option value={1}>Session 2</option>
        </select>
      </div>
      <div className="ticket-count">
        <h6>Available Ticktes: {availableTickets}</h6>
        <label>Enter Ticket Count </label>
        <input
          type="number"
          min={1}
          max={availableTickets}
          value={ticketCount}
          onChange={handleTicketCountChange}
        />
      </div>
      <button className="book-tickets-btn" onClick={handleBookTickets}>Book Tickets</button>
      <button className="back-tickets-btn" onClick={goBack}>Back</button>
    </div>
  );
};

export default BookTickets;
