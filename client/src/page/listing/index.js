import React from "react";
import { ReactDOM } from "react";
import Spinner from "../../components/layout/Spinner";
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
} from "@material-ui/core";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Slider,
} from "@mui/material";
import { ExpandLess, ExpandMore, Tune } from "@material-ui/icons";
import { connect } from "react-redux";
import { getItems, setLoader } from "../../action/item";
import { logout } from "../../action/auth";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import Item from "../../components/layout/item";
import { Link } from "react-router-dom";
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
  items: { items, loading },
  getItems,
  setLoader,
  auth: { isAuthenticated, user },
  logout,
}) => {
  useEffect(() => {
    setLoader(true);
    getItems();
  }, [getItems]);

  const { header, logo, menuButton, toolbar } = useStyles();

  const [price, setPrice] = React.useState([0, 100]);

  const [value, setValue] = useState("");
  const [openCategory, setOpenCategory] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const marks = [
    {
      value: 200,
      label: "$200",
    },

    {
      value: 400,
      label: "$400",
    },

    {
      value: 600,
      label: "$600",
    },

    {
      value: 800,
      label: "$800",
    },

    {
      value: 1000,
      label: "$1k +",
    },
  ];

  const onChangePriceRange = (event, newValue) => {
    setPrice(newValue);
  };

  const priceText = (value) => {
    return `$${value}`;
  };

  return loading ? (
    <div>
      {" "}
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
                      to: `/profile/${user._id}`,
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
      </div>
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
                    to: `/profile/${user._id}`,
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

      <div>
        <Container>
          home > listing
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <ListItemButton
                    onClick={() => setOpenCategory(!openCategory)}
                  >
                    <ListItemText primary="Category" />
                    {openCategory ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <FormGroup style={{ marginLeft: "20px" }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Chairs & Recliners"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Couches & Futons"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Beds & Mattresses"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Desks"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Dining Tables & Sets "
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Dressers & Wardrobes"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Coffee Tables"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Chair"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Other Tables"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Others"
                      />
                    </FormGroup>
                  </Collapse>
                  <br />
                  <Divider />
                  <br />
                  <ListItemButton
                    onClick={() => setOpenLocation(!openLocation)}
                  >
                    <ListItemText primary="Location" />
                    {openLocation ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openLocation} timeout="auto" unmountOnExit>
                    <FormGroup style={{ marginLeft: "20px" }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Toronto"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Markham"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Scarborough"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Richmond Hill"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Mississauga"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="North York"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Waterloo"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Others"
                      />
                    </FormGroup>
                  </Collapse>

                  <br />
                  <Divider />
                  <br />

                  <ListItemButton onClick={() => setOpenPrice(!openPrice)}>
                    <ListItemText primary="Price " />
                    {openPrice ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openPrice} timeout="auto" unmountOnExit>
                    <Box sx={{ width: "90%" }}>
                      <FormGroup style={{ marginLeft: "20px" }}>
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={price}
                          onChange={onChangePriceRange}
                          valueLabelDisplay="auto"
                          getAriaValueText={priceText}
                          step={10}
                          min={0}
                          max={1000}
                          marks={marks}
                        />
                      </FormGroup>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {items.map((item) => {
                    return (
                      <>
                        <Item item={item} />
                      </>
                    );
                  })}
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
  items: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getItems, setLoader })(Index);
