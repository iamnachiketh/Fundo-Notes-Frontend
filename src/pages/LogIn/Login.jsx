import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { login } from "../../utils/Api";
import "./Login.scss";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    isError: false,
    errorMessageForEmail: "",
    errorMessageForPassword: ""
  });

  const [open, setOpen] = useState({
    isOpen: false,
    message: ""
  })

  const navigate = useNavigate();

  const handleLogin = async function (e) {

    e.preventDefault();

    if (data.email === "" && data.password === "") {
      setError({
        isError: true,
        errorMessageForEmail: "Please enter email",
        errorMessageForPassword: "Please enter password"
      })
      return;
    }

    if (data.email === "") {
      setError({
        isError: true,
        errorMessageForEmail: "Please enter email",
        errorMessageForPassword: ""
      })
      return;
    }

    if (data.password === "") {
      setError({
        isError: true,
        errorMessageForEmail: "",
        errorMessageForPassword: "Please enter password"
      })
      return;
    }

    if (!data.email.match(/^[a-zA-Z][a-zA-Z._0-9]+@(gmail|yahoo|hotmail|example).(com|in|org)$/)) {

      setError({
        isError: true,
        errorMessageForEmail: "Please enter valid email",
        errorMessageForPassword: ""
      });
      return;
    }

    if (data.password.length < 6) {
      setError({
        isError: true,
        errorMessageForEmail: "",
        errorMessageForPassword: "Password should be minimum 6 characters"
      });
      return;
    }

    const response = await login("users/login", data);

    const errorCodeList = [404, 401, 501, 500];

    if (errorCodeList.includes(response.data.status)) {

      setOpen({
        isOpen: true,
        message: response.data.message
      })
      return;
    }

    setOpen({
      isOpen: true,
      message: response.data.message
    })

    localStorage.setItem("token", response.data.accessToken);

    let userEmail = data.email;

    navigate("/home/notes", { state: { userEmail } });

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
      <div className="login-page-wrapper">
        <div className="login-container">
          <h3 className="login-heading-1">Fundo</h3>
          <h3 className="login-heading-2">Sign In</h3>
          <h4 className="login-heading-3">Use your Fundo Account</h4>
          <form className="login-form">
            <div className="login-form-inputs">
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                label="Email"
                style={{ width: "80%" }}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              {error && <p style={{ color: "red", marginTop: "3px", marginBottom: "20px" }}>{error.errorMessageForEmail}</p>}
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                label="Password"
                type="password"
                style={{ width: "80%" }}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              {error.isError && <p style={{ color: "red", marginTop: "3px", marginBottom: "20px" }}>{error.errorMessageForPassword}</p>}
            </div>
            <Button variant="text" className="login-forget-password">
              Forgot Password
            </Button>
            <div className="login-form-btns">
              <Button variant="text" className="login-create-account">
                Create account
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "30px" }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <div className="login-footer">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
      <Snackbar
        open={open.isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        message={open.message}
        action={action}
      />
    </>
  );
}

export default Login;
