import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser, getLoggedInUserDetails,deleteUserMovieReviews } from "../data/repository";

function MyProfile(props) {
 
  const user = getLoggedInUserDetails(); // Destructure the user object from props
  console.log(user)
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState({
    username: user.username,
    email: user.email,
    password: "", 
    confirmPassword: "", 
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    // Delete the user here (you need to implement the deleteUser function)
    deleteUserMovieReviews(user.username);
    deleteUser(user.username);
    setSuccessMessage("Profile deleted successfully.");
    // Redirect to the home page after successful delete
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    const validationErrors = {};
    if (!fields.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!fields.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      setSuccessMessage(null);
    } else {
      updateUser(user.username, fields);
      setSuccessMessage("Profile updated successfully.");
      setErrorMessage(null);
      setEditMode(false);
    }
  };

  const renderViewMode = () => (
    <div>
      <h1>My Profile</h1>
      <hr />
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Joining:</strong> {user.joinDate}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <div>
      <h1>Edit Profile</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* Form fields and validation messages */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            id="username"
            value={fields.username}
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-danger">{errorMessage.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={fields.email}
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-danger">{errorMessage.email}</p>}
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {editMode ? renderEditMode() : renderViewMode()}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default MyProfile;
