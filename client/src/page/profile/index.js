import React from "react";
import { connect } from "react-redux";
import { tester } from "../../action/testing";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import donk_icon from "../edit_profile/donk_icon.png";
import Item from "../../components/layout/item";
import Review from "../../components/layout/review";
import "./style.css";
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
  CardMedia,
  Link as Link2,
} from "@material-ui/core";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Slider,
  Stack,
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Mail, Edit, Phone } from "@material-ui/icons";
import { getUserById, getReviewById } from "../../action/user";
import { getItemsByUserId } from "../../action/item";
import { logout } from "../../action/auth";

import Spinner from "../../components/layout/Spinner";

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
  test,
  tester,
  auth: { isAuthenticated, user },
  getUserById,
  user: { userInfo, loading, reviews },
  getItemsByUserId,
  items,
  getReviewById,
  logout,
}) => {
  useEffect(() => {
    let location = window.location.href;
    location = location.split("/");
    getUserById(location[location.length - 1]);
    // getItemsByUserId(location[location.length - 1]);
  }, [getUserById]);

  useEffect(() => {
    let location = window.location.href;
    location = location.split("/");
    getItemsByUserId(location[location.length - 1]);
  }, [getItemsByUserId]);

  useEffect(() => {
    let location = window.location.href;
    location = location.split("/");
    getReviewById(location[location.length - 1]);
  }, [getReviewById]);

  const { header, logo, menuButton, toolbar } = useStyles();

  const [display, setDisplay] = useState("0");
  const [color, setColor] = useState("#FFF3E6");
  const [color1, setColor1] = useState("");

  return loading && items.loading ? (
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
                    to: "/signin",
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
                    to: "/signin",
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

      <Container>
        <Grid container spacing={2} style={{ marginTop: "30px" }}>
          <Grid item xs={4}>
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
                      marginTop: "-20px",
                    }}
                  >
                    <div
                      style={{
                        color: "black",
                        fontFamily: "Work Sans, sans-serif",
                        fontSize: "20px",
                      }}
                    >
                      {userInfo?.name}
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
                      marginTop: "-40px",
                    }}
                  >
                    <div
                      style={{
                        color: "black",
                        fontFamily: "Work Sans, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {userInfo?._id === user?._id ? (
                        <Link2
                          href="../edit_profile"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {" "}
                          <Edit fontSize="small" /> &nbsp;Edit profile
                        </Link2>
                      ) : null}
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
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Mail fontSize="small" /> &nbsp;{userInfo?.email}
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
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Phone fontSize="small" /> &nbsp;{userInfo?.phoneNumber}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <ToggleButtonGroup
              orientation="vertical"
              value={display}
              exclusive
              onChange={(e) => {
                setDisplay(e.target.value);
                if (e.target.value === "0") {
                  setColor("#FFF3E6");
                  setColor1("");
                } else if (e.target.value === "1") {
                  setColor("");
                  setColor1("#FFF3E6");
                }
              }}
              style={{ width: "100%", marginTop: "40px" }}
            >
              <ToggleButton
                value="0"
                aria-label="Listings"
                style={{ backgroundColor: color }}
              >
                Listings
              </ToggleButton>
              <ToggleButton
                value="1"
                aria-label="Reviews"
                style={{ backgroundColor: color1 }}
              >
                Reviews
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={8}>
            {display === "0" ? (
              <>
                {items.userItems.length === 0 ? (
                  <Grid container>
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
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ marginTop: "100px", fontSize: "50px" }}>
                          No Listings
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      {items.userItems.map((item) => {
                        return (
                          <>
                            <Item item={item} />
                          </>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <>
                {reviews?.length === 0 ? (
                  <Grid container>
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
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ marginTop: "100px", fontSize: "50px" }}>
                          No Reviews
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
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
                    >
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          {reviews.map((item) => {
                            return (
                              <>
                                <Review item={item} />
                              </>
                            );
                          })}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
  auth: state.auth,
  user: state.user,
  items: state.item,
});

export default connect(mapStateToProps, {
  tester,
  getUserById,
  getItemsByUserId,
  getReviewById,
  logout,
})(Index);
