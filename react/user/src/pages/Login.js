import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";
import axios from "axios";

function Login(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, password: fields.password };
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const verified = await verifyUser(fields.username, fields.password);
    console.log(verified)

    // If verified login the user.
    if(verified === 0) {
      props.loginUser(fields.username);
      // Navigate to the home page.
      navigate("/");
      return;
    }else if(verified === 1){
      // Reset password field to blank.
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);

      // Set error message.
      setErrorMessage("Your account has been disabled. Please contact admin");
      return;
    }else{
       // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    // Set error message.
    setErrorMessage("Username and / or password invalid, please try again.");
    return;
    }
   
  }

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
