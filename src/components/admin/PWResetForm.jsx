import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { baseRoute, useAuth } from "ProvideAuth";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Slide from "@material-ui/core/Slide";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Form, Field } from "react-final-form";
import { Select, TextField } from "final-form-material-ui";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmButton from "components/confirmDeleteButton";
import { OnChange } from "react-final-form-listeners";

const useStyles = makeStyles((theme) => ({
  modifyButton: {
    backgroundColor: green[500],
    color: "white",
  },
  modifyButtonHover: {
    "&:hover": {
      backgroundColor: green[800],
      color: "white",
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  paperContainer: {
    padding: theme.spacing(2),
  },
  boxContainer: {
    width: "100%",
  },
  modal: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    display: "inline-flex",
  },
}));

const PWResetForm = ({ id }) => {
    console.log("L?ID DEL TIPO", id);
  const auth = useAuth();
  const classes = useStyles();

  const onSubmitPass = async ({ nuovaPass }) => {
    if (nuovaPass !== undefined && nuovaPass != null && nuovaPass != "") {
      await axios
        .put(`${baseRoute}/pwReset/${id}`, {
          token: auth.token,
          nuovaPass,
        })
        .then((r) => {
          console.log(r);
        });
    }
  };

  return (
    <Grid item md={6} xs={12}>
      <Typography variant="h6" component="h1">
        Password Reset
      </Typography>
      <Paper className={classes.paperContainer}>
        <Form
          onSubmit={onSubmitPass}
          initialValues={{ nuovaPass: "" }}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form
              onSubmit={async (event) => {
                handleSubmit(event).then(reset);
              }}
            >
              <FormControl className={classes.formControl}>
                <Field
                  fullWidth
                  name="nuovaPass"
                  component={TextField}
                  type="text"
                  label="Nuova Password"
                  required
                />
              </FormControl>
              <Button variant="contained" color="secondary" type="submit">
                Aggiorna Password
              </Button>
            </form>
          )}
        />
      </Paper>
    </Grid>
  );
};

export default PWResetForm;
