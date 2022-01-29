import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { connect } from "react-redux";
import { tester } from "../action/testing";
import { useState } from "react";
import { useEffect } from "react";
import "./home.css";
import { typography } from "@mui/system";
import { Link } from "react-router-dom";
import Item from "../components/layout/item";
import { getItems, setLoader } from "../action/item";
import { logout } from "../action/auth";
import { ClassNames } from "@emotion/react";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
    "&:hover:": {
      background: "#555555",
      color: "#FFF",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    width: 500,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Home = ({
  items: { items, loading },
  getItems,
  setLoader,
  auth: { isAuthenticated, user },
  logout,
}) => {
  const { header, logo, menuButton, toolbar } = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    setLoader(true);
    getItems();
  }, [getItems]);

  return (
    <div>
      {/* Title */}
      <div class="title">🐴DONK.CA</div>
      {/* Headers */}
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

              {isAuthenticated ? (
                <Button
                  {...{
                    key: "Sign In",
                    color: "inherit",
                    to: `/profile/${user?._id}`,
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

              {isAuthenticated ? (
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

      <div class="listingBox">
        <h3>Welcome</h3>
        <div class="itemDisplay-container">
          {items?.map((item, index) => {
            if (index < 9) {
              return (
                <div className="itemDisplay-items">
                  <Item item={item} />
                </div>
              );
            }
          })}
        </div>
        <button class="button seeMoreButton">See More</button>
      </div>
      <br />
      {/* Additional info at the bottom of the page */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="extraInfoBox">
        <h1 class="centerText">Got Something to Sell?</h1>
        <p class="centerText">
          Sign up with donk today and start buying and selling in your community
          hussle free!
        </p>
        <div class="center">
          <button
            class="button buttonSignUp2"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign up
          </button>
        </div>
      </div>
      {/* Footer Box */}
      {/* <BottomNavigation value={value}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </BottomNavigation> */}
      {/* <div class="footerBox">
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
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.item,
  test: state.test,
  auth: state.auth,
});

export default connect(mapStateToProps, { getItems, setLoader, logout })(Home);
