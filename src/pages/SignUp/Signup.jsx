import { useNavigate } from "react-router-dom"
import "./Signup.scss";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { signup } from "../../utils/Api";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function Signup() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [name, setName] = useState({
    firstName: "",
    lastName: ""
  });

  const [open, setOpen] = useState({
    isOpen: false,
    message: ""
  });

  const [error, setError] = useState({});

  const handleSignUp = async function () {

    const fullName = `${name.firstName.trim()} ${name.lastName.trim()}`;

    if (!name.firstName.trim() || !name.lastName.trim()) {
      setError({
        isError: true,
        errorMessageForName: "First Name and Last Name are required."
      });
      return;
    }

    if (!data.email.trim()) {
      setError({
        isError: true,
        errorMessageForEmail: "Email is required"
      });
      return;
    }

    if (!data.password.trim()) {
      setError({
        isError: true,
        errorMessageForPassword: "Password is required"
      });
      return;
    }

    if (!data.confirmPassword.trim()) {
      setError({
        isError: true,
        errorMessageForPassword: "Confirm Password is required"
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError({
        isError: true,
        errorMessageForPassword: "Password and Confirm Password should be same"
      });
      return;
    }

    if (data.password.length < 6) {
      setError({
        isError: true,
        errorMessageForPassword: "Password should be atleast 6 characters long"
      });
      return;
    }

    if (!data.email.match(/^[a-zA-Z][a-zA-Z._0-9]+@(gmail|yahoo|hotmail|example).(com|in|org)$/)) {
      setError({
        isError: true,
        errorMessageForEmail: "Please enter valid email"
      });
      return;
    }

    console.log({ ...data, name: fullName });

    let response = await signup("users/register", { ...data, name: fullName });

    if(response.data.status === 409){
      setOpen({
        isOpen: true,
        message: response.data.message
      })
      return;
    }

    setOpen({
      isOpen: true,
      message: response.data.message
    });

    navigate("/");
  }

  const handleClose = () => setOpen({
    isOpen: false,
    message: ""
  });

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
                  onChange={(e) => setName({
                    ...name,
                    firstName: e.target.value
                  })}
                />
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Last Name"
                  onChange={(e) => setName({
                    ...name,
                    lastName: e.target.value
                  })}
                />
                {error.isError && <p style={{ color: "red", marginTop: "3px" }}>{error.errorMessageForName}</p>}
              </div>
              <div className="signup-form-inputs-2">
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Email"
                  style={{ width: "100%" }}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <p>You can use letters numbers and periods</p>
                {error.isError && <p style={{ color: "red", marginTop: "3px" }}>{error.errorMessageForEmail}</p>}
              </div>
              <div className="signup-form-inputs-3">
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Password"
                  type="password"
                  style={{ marginRight: "20px" }}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  label="Confirm"
                  type="password"
                  onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                />
                <p>
                  Use 8 or more characters with the mix of letters, number &
                  symbols
                </p>
                {error.isError && <p style={{ color: "red" }}>{error.errorMessageForPassword}</p>}
              </div>
            </div>
            <div className="signup-form-footer">
              <Button variant="text" className="signup-signin-button">
                Sign in Instead
              </Button>

              <Button variant="contained" onClick={handleSignUp}>Register</Button>
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
      <Snackbar
        open={open.isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        message= {open.message}
        action={action}
      />
    </>
  );
}

export default Signup;
