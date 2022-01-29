import React from "react";
import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Link,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(() => ({
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
}));

const Item = ({ item }) => {
  console.log(item);
  const classes = useStyles();
  const [hover, setHover] = useState("none");
  return (
    <div>
      <Card
        classes={{ root: classes.cardHovered }}
        onClick={() => {
          window.location.href = `/item/${item._id}`;
        }}
        style={{
          border: "none",
          boxShadow: hover,
          marginTop: "15px",
          maxHeight: "150px",
        }}
        onMouseEnter={() => setHover(" -1px 10px 29px 0px rgba(0,0,0,0.1)")}
        onMouseLeave={() => setHover("none")}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            style={{
              width: "100%",
              height: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                // maxHeight: "100%",
                // maxWidth: "100%",
                // minHeight: "150px",
                maxWidth: "180px",
                maxHeight: "150px",
                marginTop: "-60px",
              }}
              resizeMode="contain"
              src={item.photos[0]}
            />
          </Grid>
          <Grid item xs={8}>
            <div>
              <Grid container spacing={3} style={{ marginTop: "10px" }}>
                <Grid
                  item
                  xs={7}
                  style={{
                    fontSize: "15px",
                    fontFamily: "Work Sans, sans-serif",
                  }}
                >
                  <Link href="#" underline="hover">
                    {item.name}
                  </Link>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    color: "green",
                    fontFamily: "Work Sans, sans-serif",
                  }}
                >
                  ${item.price}
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    fontSize: "13px",
                    fontFamily: "Work Sans, sans-serif",
                    marginTop: "-7px",
                  }}
                >
                  {item.location.city} | {item.createdAt}
                </Grid>
                <Grid
                  item
                  xs={11}
                  style={{
                    fontSize: "13px",
                    fontFamily: "Work Sans, sans-serif",
                    marginTop: "-12px",
                  }}
                >
                  {item.description.length > 100 ? (
                    <>{item.description.slice(0, 2)}...</>
                  ) : (
                    <>{item.description}</>
                  )}
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Item;
