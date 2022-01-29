import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { tester } from "../action/testing";
import { useState } from "react";
import { useEffect } from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar, 
  Typography,
} from "@material-ui/core";

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
}));

const Test = ({ test, tester }) => {
  const { header, logo, menuButton, toolbar } = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    tester();
  }, []);

  useEffect(() => {
    setValue(test.test_message);
  }, [test.test_message]);

  return (
    <div>
      <header>
        <AppBar className={header}>
          <Toolbar className={toolbar}>
            <Typography variant="h6" component="h1" className={logo}>
              DONK.CA
            </Typography>
            <div>
              <Button
                {...{
                  key: "Home",
                  color: "inherit",
                  to: "/Home",
                  component: Link,
                  className: menuButton,
                }}
              >
                Home
              </Button>

              <Button
                {...{
                  key: "About",
                  color: "inherit",
                  to: "/about",
                  component: Link,
                  className: menuButton,
                }}
              >
                About
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
                  to: "/SignIn",
                  component: Link,
                  className: menuButton,
                }}
              >
                Sign In
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, { tester })(Test);
