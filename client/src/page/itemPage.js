import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  Box,
  Checkbox,
  CardContent,
  FormControlLabel,
  FormGroup,
  TextField,
  CardMedia,
} from "@material-ui/core";
import donk_icon from "../page/edit_profile/donk_icon.png";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Slider,
  Link as Link2,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { tester } from "../action/testing";
import { setLoader, getItem } from "../action/item";
import { logout } from "../action/auth";
import Spinner from "../components/layout/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import "./itemPage.css";
import ImageGallery from "react-image-gallery";
import { PinDrop, Mail, Phone, ViewList, Edit } from "@material-ui/icons";

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

const cardStyle = {
  height: 250,
};

const ItemPage = ({
  auth,
  items: { item, loading, user, photo },
  getItem,
  setLoader,
  logout,
}) => {
  const { header, logo, menuButton, toolbar } = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    setLoader(true);
    let location = window.location.href;
    location = location.split("/");
    getItem(location[location.length - 1]);
  }, [getItem]);

  return loading ? (
    <div>
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
              {auth.isAuthenticated ? (
                <Button
                  {...{
                    key: "Sign In",
                    color: "inherit",
                    to: `/profile/${auth.user._id}`,
                    component: Link,
                    className: menuButton,
                  }}
                >
                  My Profile
                </Button>
              ) : (
                <Button
                  {...{
                    key: "Sign In",
                    color: "inherit",
                    to: "/login",
                    component: Link,
                    className: menuButton,
                  }}
                >
                  Sign In
                </Button>
              )}

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

              {auth.isAuthenticated ? (
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
              ) : null}
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
              {auth.isAuthenticated ? (
                <Button
                  {...{
                    key: "Sign In",
                    color: "inherit",
                    to: `/profile/${auth.user._id}`,
                    component: Link,
                    className: menuButton,
                  }}
                >
                  My Profile
                </Button>
              ) : (
                <Button
                  {...{
                    key: "Sign In",
                    color: "inherit",
                    to: "/login",
                    component: Link,
                    className: menuButton,
                  }}
                >
                  Sign In
                </Button>
              )}

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

              {auth.isAuthenticated ? (
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
              ) : null}
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
          <Grid container>
            <Grid item xs={8}>
              {" "}
              <div
                style={{
                  color: "black",
                  fontFamily: "Work Sans, sans-serif",
                  fontSize: "30px",
                  marginTop: "30px",
                }}
              >
                {item.name}{" "}
              </div>
              <div
                style={{
                  color: "#37A864",
                  fontFamily: "Work Sans, sans-serif",
                  fontSize: "25px",
                  marginTop: "10px",
                }}
              >
                ${item.price}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "15px",
                  marginTop: "50px",
                  marginLeft: "10px",
                }}
              >
                <PinDrop />
                {item.location.city}, {item.location.zipcode}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "15px",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                Posted at {item.createdAt}
              </div>
            </Grid>
          </Grid>

          {/* <h4 style={{ color: "black" }}>Posted By: *Username*</h4> */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={8}>
              <Card sx={{ minWidth: 275 }}>
                <ImageGallery items={photo} />
              </Card>
              <div
                style={{
                  marginTop: "20px",
                  color: "black",
                  fontFamily: "Work Sans, sans-serif",
                  fontSize: "25px",
                }}
              >
                Description
              </div>

              <div
                style={{
                  marginTop: "15px",
                  fontFamily: "Work Sans, sans-serif",
                  fontSize: "20px",
                }}
              >
                {item.description}
              </div>
            </Grid>
            <Grid item xs={4}>
              {/* <Card sx={{ minWidth: 275 }}>
                <h3 className="centerText">About {user.name}</h3>
                <Container>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginLeft: "20px",
                    }}
                  >
                    <Mail fontSize="small" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {user.email}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginLeft: "20px",
                    }}
                  >
                    <Phone fontSize="small" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {user.phoneNumber}
                  </div>
                </Container>
                <br></br>
              </Card> */}

              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="80"
                  image="https://www.colorbook.io/imagecreator.php?hex=fff3e6&width=1080&height=1920&text=%201080x1920"
                  alt="green iguana"
                />
                <CardContent>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "60%",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "-70px",
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
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "60%",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "black",
                          fontFamily: "Work Sans, sans-serif",
                          fontSize: "20px",
                          marginTop: "-50px",
                        }}
                      >
                        <Link2
                          underline="hover"
                          onClick={() => {
                            window.location.href = `../profile/${item?.userId}`;
                          }}
                        >
                          {user?.name}
                        </Link2>
                      </div>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "60%",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "-100px",
                      }}
                    ></Grid>
                    {user?._id === auth.user?._id ? (
                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "60%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "-60px",
                        }}
                      >
                        <div>
                          <Link2
                            underline="hover"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                            onClick={() => {
                              window.location.href = `../editpost/${item._id}`;
                            }}
                          >
                            {" "}
                            <Edit fontSize="small" /> Edit Post
                          </Link2>
                        </div>
                      </Grid>
                    ) : (
                      <Grid
                        item
                        xs={12}
                        style={{
                          width: "60%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "-60px",
                        }}
                      >
                        <div>
                          <Link2
                            underline="hover"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                            onClick={() => {
                              window.location.href = `../create_review/${item.userId}`;
                            }}
                          >
                            {" "}
                            <ViewList fontSize="small" /> Give user review
                          </Link2>
                        </div>
                      </Grid>
                    )}

                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Mail fontSize="small" /> &nbsp; {user.email}
                        &nbsp;| &nbsp;
                        <Phone fontSize="small" /> &nbsp; {user.phoneNumber}
                      </div>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "",
                      }}
                    ></Grid>
                  </Grid>
                </CardContent>
              </Card>

              <br></br>
              <br></br>
            </Grid>
          </Grid>
        </Container>
      </div>

      <br></br>
      <br></br>
      <br></br>

      {/* Footer Box */}
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
  items: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getItem, setLoader })(
  ItemPage
);
