import React from "react";
import { getLoggedInUserDetails } from "../data/repository";

const MyBookedTickets = () => {
  const user = getLoggedInUserDetails();
  const userBookingHistory = JSON.parse(localStorage.getItem(user.username)) || [];

  return (
    <div className="my-5 my-booked-tickets" style={styles.container}>
      <h2 style={styles.heading}>Booked Tickets</h2>
      {userBookingHistory.length === 0 ? (
        <p style={styles.noTickets}>No tickets booked found</p>
      ) : (
        <ul style={styles.ticketList}>
          {userBookingHistory.map((booking, index) => (
            <li key={index} style={styles.ticketItem}>
              <strong style={styles.movie}>Movie:</strong> {booking.movieName}, <strong style={styles.session}>Session:</strong> {booking.session}, <strong style={styles.ticketCount}>Tickets:</strong> {booking.ticketCount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  noTickets: {
    fontSize: "18px",
    color: "#888",
  },
  ticketList: {
    listStyle: "none",
    padding: 0,
  },
  ticketItem: {
    marginBottom: "10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  movie: {
    color: "#333",
  },
  session: {
    color: "#555",
  },
  ticketCount: {
    color: "#777",
  },
};

export default MyBookedTickets;
