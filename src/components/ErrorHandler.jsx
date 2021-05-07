import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  error: {
    color: "#f52222",
  },
}));

const Error = ({ error }) => {
  const classes = useStyles();
  return (
    <>
      <br />
      <p className={classes.error}>{error}</p>
    </>
  );
};

export default Error;
