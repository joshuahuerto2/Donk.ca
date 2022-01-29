import React, { Fragment } from "react";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={
          "https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
        }
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading......"
      />
    </Fragment>
  );
};

export default Spinner;
