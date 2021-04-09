import React from "react";
import axios from "axios";
import { FormControl, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { baseRoute, useAuth } from "ProvideAuth";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { green } from "@material-ui/core/colors";

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
    if (nuovaPass !== undefined && nuovaPass !== null && nuovaPass !== "") {
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
