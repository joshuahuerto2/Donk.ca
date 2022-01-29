import React, { createRef, useCallback } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { tester } from "../../action/testing";
import { useState, useEffect } from "react";
import "./style.css";
import donk_icon from "./donk_icon.png";
import { Link, Redirect } from "react-router-dom";
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
  CardContent,
  OutlinedInput,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Divider, Select, Modal, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { createPost, setLoader, setDone } from "../../action/item";
import { logout } from "../../action/auth";

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
  items: { items, loading, done },
  setLoader,
  createPost,
  setDone,
  auth: { isAuthenticated, user },
  logout,
}) => {
  useEffect(() => {
    setLoader(false);
    setDone(false);
  }, []);
  const getColor = (props) => {
    if (props.isDragAccept) {
      return "#00e676";
    }
    if (props.isDragReject) {
      return "#ff1744";
    }
    if (props.isDragActive) {
      return "#2196f3";
    }
    return "#eeeeee";
  };
  const { header, logo, menuButton, toolbar } = useStyles();

  const [value, setValue] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [zipcode, setZipcoe] = useState("");
  const [image, setImage] = useState([]);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipcodeError, setZipcoeError] = useState("");
  const [imageError, setImageError] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const posting = () => {
    if (name === "") {
      setNameError("Name are required");
      return;
    }
    setNameError("");
    if (description === "") {
      setDescriptionError("Description are required");
      return;
    }
    setDescriptionError("");
    if (category === "") {
      setCategoryError("Category are required");
      return;
    }
    setCategoryError("");
    if (price === 0 || price < 0 || price === "") {
      setPriceError("Price can't be less than 0");
      return;
    }
    setPriceError("");
    console.log(image.length);
    if (image.length === 0) {
      setImageError("Please upload at least 1 image");
      return;
    }
    setImageError("");
    if (city === "") {
      setCityError("City are required");
      return;
    }

    setCityError("");
    if (zipcode === "") {
      setZipcoeError("Zipcoe are required");
      return;
    }
    setZipcoeError("");

    const itemData = {
      name: name,
      description: description,
      category: category,
      price: price,
      photos: image,
      location: {
        city: city,
        zipcode: zipcode,
      },
    };
    // console.log(itemData);
    setLoader(true);
    createPost(itemData);
  };

  const onDrop = (acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    const item = image;
    acceptedFiles.map((i) => {
      item.push(i);
    });
    setImage(item);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  if (done) {
    return <Redirect to="/home" />;
  }

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
            Create Posting
          </div>
          <div
            style={{ fontFamily: "Work Sans, sans-serif", marginTop: "5px" }}
          >
            Create item here so other users could see what you are offering
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
                      Name *
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
                      Description *
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "110px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <div style={{ color: "red" }}>{descriptionError}</div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Category *
                    </div>

                    <FormControl sx={{ m: 1 }}>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        style={{ minWidth: "440px", marginTop: "10PX" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Chairs & Recliners"}>
                          Chairs & Recliners
                        </MenuItem>
                        <MenuItem value={"Couches & Futons"}>
                          Couches & Futons
                        </MenuItem>
                        <MenuItem value={"Beds & Mattresses"}>Desks</MenuItem>
                        <MenuItem value={"Dining Tables & Sets"}>
                          Dining Tables & Sets
                        </MenuItem>
                        <MenuItem value={"Dressers & Wardrobes"}>
                          Dressers & Wardrobes
                        </MenuItem>
                        <MenuItem value={"Coffee Tables"}>
                          Coffee Tables
                        </MenuItem>
                        <MenuItem value={"Chair"}>Chair</MenuItem>
                        <MenuItem value={"Other Tables"}>Other Tables</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                    <div style={{ color: "red" }}>{categoryError}</div>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Price *
                    </div>

                    <OutlinedInput
                      style={{
                        width: "60%",
                        height: "50px",
                        marginTop: "10PX",
                      }}
                      size="small"
                      id="outlined-adornment-weight"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                      type="Number"
                    />
                    <div style={{ color: "red" }}>{priceError}</div>

                    <br />
                    <br />

                    <div {...getRootProps()}>
                      <container>
                        <label className="custom-file-upload">
                          <div style={{ marginTop: "20px" }}>
                            Drag 'n' image here
                          </div>
                        </label>
                        <input
                          {...getInputProps()}
                          style={{
                            height: "80px",
                            width: "430px",
                            color: "gray",
                            backgroundColor: "gray",
                            display: "none",
                          }}
                        />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <div className="container">
                            <container
                              {...getRootProps({
                                isDragActive,
                                isDragAccept,
                                isDragReject,
                              })}
                            >
                              <p></p>
                            </container>
                          </div>
                        )}
                      </container>
                    </div>
                    {image.length !== 0 ? (
                      <div>
                        {image.map((i) => {
                          return <div>{i.name}</div>;
                        })}
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>{imageError}</div>
                    )}
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
                      Address *
                    </div>

                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      City *
                    </div>

                    <FormControl sx={{ m: 1 }}>
                      <Select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        style={{ minWidth: "440px", marginTop: "10PX" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Toronto"}>Toronto</MenuItem>
                        <MenuItem value={"Markham"}>Markham</MenuItem>
                        <MenuItem value={"Scarborough"}>Scarborough</MenuItem>
                        <MenuItem value={"Richmond Hill"}>
                          Richmond Hill
                        </MenuItem>
                        <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
                        <MenuItem value={"North York"}>North York</MenuItem>
                        <MenuItem value={"Waterloo"}>Waterloo</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                    <div style={{ color: "red" }}>{cityError}</div>
                    <div
                      style={{
                        fontFamily: "Work Sans, sans-serif",
                        marginTop: "40px",
                        fontSize: "20px",
                        color: "#8e9194",
                      }}
                    >
                      Zipcode *
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
                    <div style={{ color: "red" }}>{zipcodeError}</div>
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
                          onClick={posting}
                        >
                          <div
                            style={{
                              color: "black",
                              fontFamily: "Work Sans, sans-serif",
                            }}
                          >
                            Post item
                          </div>
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Modal
            open={loading}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Spinner />
                <div
                  style={{
                    color: "black",
                    marginTop: "10px",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Creating post.....
                </div>
              </Typography>
            </Box>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  createPost,
  setLoader,
  setDone,
})(Index);
