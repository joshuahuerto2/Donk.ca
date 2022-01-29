import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Container,
  Grid,
  Card,
  Box,
  Checkbox,
  CardContent,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Slider,
} from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register, loadUser } from "../action/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/home">
        🐴DONK.CA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({});

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#FFF3E6",
    paddingRight: "79px",
    paddingLeft: "118px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#000",
    textAlign: "left",
    fontSize: "30px",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    color: "#000",
    fontWeight: 700,

    size: "18px",
    marginLeft: "38px",
    "&:hover": {
      background: "#555555",
      color: "#FFF",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
const SignUp = ({ auth: { loading, isAuthenticated }, register, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const { header, logo, menuButton, toolbar } = useStyles();

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (data.get("email") === "") {
      setEmailError("Email address are required");
      return;
    }
    setEmailError("");
    if (data.get("name") === "") {
      setNameError("Name are required");
      return;
    }
    setNameError("");
    if (data.get("phone") === "") {
      setPhoneError("Phone number are required");
      return;
    }
    setPhoneError("");
    if (data.get("password") === "") {
      setPasswordError("Password are required");
      return;
    }
    if (data.get("password").length < 6) {
      setPasswordError("Password need to have a minimum length of 6");
      return;
    }
    setPasswordError("");
    if (data.get("password") !== data.get("password2")) {
      setPasswordError2("Password does not match");
      return;
    }
    setPasswordError2("");
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phone"),
      name: data.get("name"),
    };
    console.log(user);
    register(user);
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar className={header}>
          <Toolbar className={toolbar}>
            <Typography
              onClick={() => {
                window.location.href = "/home";
              }}
              variant="h6"
              component="h1"
              className={logo}
            >
              🐴DONK.CA
            </Typography>
            <div></div>
          </Toolbar>
        </AppBar>
      </header>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "140px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            🐴 Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            <div style={{ color: "red" }}>{emailError}</div>

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <div style={{ color: "red" }}>{nameError}</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone number"
              // type="number"
              id="phone"
            />
            <div style={{ color: "red" }}>{phoneError}</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div style={{ color: "red" }}>{passwordError}</div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <div style={{ color: "red" }}>{passwordError2}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ color: "black", backgroundColor: "#fff3e6" }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { register, loadUser })(SignUp);
