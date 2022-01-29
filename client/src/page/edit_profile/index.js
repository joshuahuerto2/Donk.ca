import React from "react";
import { connect } from "react-redux";
import { tester } from "../../action/testing";
import { useState, useEffect } from "react";
import "./style.css";
import donk_icon from "./donk_icon.png";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  OutlinedInput,
} from "@material-ui/core";
import { Divider } from "@mui/material";
import { updateProfule, logout } from "../../action/auth";

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
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#000",
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

const Index = ({ logout, auth: { user, loading, done }, updateProfule }) => {
  const { header, logo, menuButton, toolbar } = useStyles();

  const [value, setValue] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcoe] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (!loading) {
      setName(`${user.name}`);
      setEmail(`${user.email}`);
      setPhone(`${user.phoneNumber}`);
      if (user?.address?.street) {
        setStreet(`${user?.address?.street}`);
      }
      if (user?.address?.city) {
        setCity(`${user?.address?.city}`);
      }
      if (user?.address?.zipcode) {
        setZipcoe(`${user?.address?.zipcode}`);
      }
    }
  }, [loading]);

  const onSave = () => {
    if (email === "") {
      setEmailError("Email address are required");
      return;
    }
    setEmailError("");
    if (name === "") {
      setNameError("Name are required");
      return;
    }
    setNameError("");

    if (phone === "") {
      setPhoneError("Phone number are required");
      return;
    }
    setPhoneError("");

    const data = {
      name: name,
      phoneNumber: phone,
      email: email,
      address: {
        street: street,
        city: city,
        zipcode: zipcode,
      },
    };

    updateProfule(data);
  };

  return (
    <div>
      <header>
        <AppBar className={header}>
          <Toolbar className={toolbar}>
            <Typography
              variant="h6"
              component="h1"
              className={logo}
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              🐴DONK.CA
            </Typography>
            <div>
              <Button
                {...{
                  key: "Home",
                  color: "inherit",
                  to: "/home",
                  component: Link,
                  className: menuButton,
                }}
              >
                Home
              </Button>

              <Button
                {...{
                  key: "Listing",
                  color: "inherit",
                  to: "/listing",
                  component: Link,
                  className: menuButton,
                }}
              >
                Listing
              </Button>

              <Button
                {...{
                  key: "Sign In",
                  color: "inherit",
                  to: "/createpost",
                  component: Link,
                  className: menuButton,
                }}
              >
                Create Post
              </Button>

              <Button
                onClick={() => {
                  logout();
                }}
                {...{
                  key: "Sign In",
                  color: "inherit",
                  component: Link,
                  className: menuButton,
                }}
              >
                Sign out
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </header>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div>
        <Container>
          <div
            style={{
              fontSize: "30px",
              fontFamily: "Work Sans, sans-serif",
              color: "black",
              marginTop: "20px",
            }}
          >
            Edit Profile
          </div>
          <div
            style={{ fontFamily: "Work Sans, sans-serif", marginTop: "5px" }}
          >
            Only your name, email and phone number will be displayed on your
            public profile.
          </div>
        </Container>

        <Container>
          <Grid container spacing={3} style={{ marginTop: "40px" }}>
            <Grid item xs={8}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Container>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "5px",
                        fontSize: "20px",
                      }}
                    >
                      Details
                    </div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Name
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <div style={{ color: "red" }}>{nameError}</div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Email address
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <div style={{ color: "red" }}>{emailError}</div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Phone number
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <div style={{ color: "red" }}>{phoneError}</div>
                  </Container>
                  <br />
                  <br />
                  <Divider />
                  <Container>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "25px",
                        fontSize: "20px",
                      }}
                    >
                      Address
                    </div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Street (optional)
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      City (optional)
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Zipcode (optional)
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={zipcode}
                      onChange={(e) => setZipcoe(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <br />
                    <br />
                    <br />
                  </Container>
                </CardContent>
              </Card>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Container>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "60%",
                          height: "240px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                          resizeMode="contain"
                          src={donk_icon}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "50px",
                          height: "70px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{ backgroundColor: "#FFF3E6" }}
                          variant="contained"
                          onClick={onSave}
                        >
                          <div
                            style={{
                              color: "black",
                              fontFamily: "Work Sans, sans-serif",
                            }}
                          >
                            Save Changes
                          </div>
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, tester, updateProfule })(
  Index
);
