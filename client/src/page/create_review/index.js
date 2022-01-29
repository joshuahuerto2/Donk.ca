import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { tester } from "../../action/testing";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import donk_icon from "./donk_icon.png";
import { getUserById, senReview } from "../../action/user";
import { logout } from "../../action/auth";

import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  Grid,
  CardContent,
  Container,
  Card,
  TextField,
} from "@material-ui/core";
import Spinner from "../../components/layout/Spinner";
import { Divider, Rating } from "@mui/material";

const cardSize = {
  height: 400,
};

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

const Index = ({
  logout,
  test,
  tester,
  getUserById,
  auth,
  user,
  senReview,
}) => {
  const { header, logo, menuButton, toolbar } = useStyles();
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    const data = {
      comment: message,
      rating: value,
      senderName: auth.user.name,
      userId: user.userInfo._id,
    };

    senReview(data);
  };

  useEffect(() => {
    let location = window.location.href;
    location = location.split("/");
    getUserById(location[location.length - 1]);
  }, [getUserById]);

  if (user.done) {
    return <Redirect to="/listing" />;
  }

  return user.loading && auth.loading ? (
    <div>
      <header>
        <AppBar className={header}>
          <Toolbar className={toolbar}>
            <Typography variant="h6" component="h1" className={logo}>
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
                  to: `/profile/${auth?.user?._id}`,
                  component: Link,
                  className: menuButton,
                }}
              >
                My Profile
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </header>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Spinner />
    </div>
  ) : (
    <div>
      {/* The header of the site */}
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
                  to: `/profile/${auth?.user?._id}`,
                  component: Link,
                  className: menuButton,
                }}
              >
                My Profile
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

      <Container>
        <div
          style={{
            fontSize: "30px",
            fontFamily: "Work Sans, sans-serif",
            color: "black",
            marginTop: "20px",
          }}
        >
          Create a Review
        </div>
      </Container>

      <br></br>
      <br></br>
      <br></br>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4} style={{ margin: "auto" }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                {/* <Container> */}
                <Grid container>
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        color: "black",
                      }}
                    >
                      <h3 className="center">How was your experience with</h3>
                    </div>
                  </Grid>
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
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        color: "black",
                      }}
                    >
                      <h3 className="center">
                        <Link to={`/profile/${user?.userInfo?._id}`}>
                          {user?.userInfo?.name}
                        </Link>
                        ?
                      </h3>
                    </div>
                  </Grid>
                  {/* <Container>
                        <Grid item xs={12}>
                          <Typography component="legend">Controlled</Typography>
                            <Rating
                              name="simple-controlled"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                            />
                        </Grid>
                        </Container> */}
                </Grid>
                {/* </Container> */}
              </CardContent>
            </Card>
          </Grid>
          {/* Review Card */}
          <Grid item xs={8}>
            <Card sx={{ minWidth: 275 }} style={{ height: "400px" }}>
              <CardContent>
                <div
                  style={{
                    fontFamily: "Work Sans, sans-serif",
                    color: "black",
                  }}
                >
                  <h3 className="center">Leave a Review</h3>
                  <Divider />
                  <br></br>
                  <TextField
                    fullWidth
                    id="reviewText"
                    label="Write a Review Here"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <br></br>
                  <br></br>

                  {/* <Divider /> */}

                  <br></br>

                  <div className="center">
                    <Typography
                      component="legend"
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        color: "black",
                      }}
                    >
                      Rate out of 5 Stars
                    </Typography>
                  </div>
                  <div className="center">
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                  <div className="center" style={{ marginTop: "20px" }}>
                    <Button
                      style={{ backgroundColor: "#FFF3E6" }}
                      variant="contained"
                      onClick={onSubmit}
                    >
                      <div
                        style={{
                          color: "black",
                          fontFamily: "Work Sans, sans-serif",
                        }}
                      >
                        Submit Review
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* The footer of the site */}
      <div class="footerBox">
        <div class="footerWebsiteInfoBox">
          <b>DONK.CA</b>
          <p>@ 2021 - 2021</p>
          <p>Privacy - Terms</p>
        </div>
        <div class="footerInfoBox">
          <b>Contact</b>
          <p>Email</p>
          <p>Phone</p>
          <p>Fax</p>
        </div>
        <div class="footerInfoBox">
          <b>Opportunities</b>
          <p>Careers</p>
          <p>Partnership</p>
          <p>Sponsorship</p>
        </div>
        <div class="footerInfoBox">
          <b>Our Mission</b>
          <p>Statement</p>
          <p>Another one</p>
          <p>Another one</p>
        </div>
        <div class="footerInfoBox">
          <b>Company</b>
          <p>Our Team</p>
          <p>Our Vision</p>
          <p>Our Goal</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  logout,
  tester,
  getUserById,
  senReview,
})(Index);
