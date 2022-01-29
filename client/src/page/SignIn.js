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
import { login, loadUser } from "../action/auth";
import { setAlert } from "../action/alert";

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

const SignIn = ({ auth: { loading, isAuthenticated }, login, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const { header, logo, menuButton, toolbar } = useStyles();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordError2, setPasswordError2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (data.get("email") === "") {
      setEmailError("Email address are required");
      return;
    }
    setEmailError("");
    if (data.get("password") === "") {
      setPasswordError("Password are required");
      return;
    }
    setPasswordError("");

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    login(user);
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
            🐴 Sign In
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
            />
            <div style={{ color: "red" }}>{emailError}</div>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ color: "black", backgroundColor: "#fff3e6" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="text.secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" color="text.secondary">
                  {"Don't have an account? Sign Up"}
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

export default connect(mapStateToProps, { login, loadUser })(SignIn);
