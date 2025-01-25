import "./Signup.scss";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

function Signup() {

  

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="signup-form-container">
            <div className="signup-container-header">
              <h3>Fundo</h3>
              <h4>Create Your Fundo Account</h4>
            </div>
            <div className="signup-form">
              <div className="signup-form-inputs-1">
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="First Name"
                  style={{ marginRight: "20px" }}
                />
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Last Name"
                />
              </div>
              <div className="signup-form-inputs-2">
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Email"
                  style={{ width: "100%" }}
                />
                <p>You can use letters numbers and periods</p>
              </div>
              <div className="signup-form-inputs-3">
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Password"
                  style={{ marginRight: "20px" }}
                />
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Confirm"
                />
                <p>
                  Use 8 or more characters with the mix of letters, number &
                  symbols
                </p>
              </div>
            </div>
            <div className="signup-form-footer">
              <Button variant="text" className="signup-signin-button">
                Sign in Instead
              </Button>

              <Button variant="contained">Register</Button>
            </div>
          </div>
          <div className="signup-image-container">
            <img
              src="https://www.pikpng.com/pngl/b/136-1367487_google-account-products-icons-use-my-google-account.png"
              alt="SignUp Image"
              className="signup-image"
            />
            <p style={{ marginBottom: "2px" }}>One Account. All of Fundo </p>
            <p style={{ marginTop: "0" }}>working for you</p>
          </div>
        </div>
        <div className="signup-footer">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </>
  );
}

export default Signup;
