import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { baseRoute, useAuth } from "ProvideAuth";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import clsx from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Warning from "@material-ui/icons/Warning";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Slide from "@material-ui/core/Slide";
import TableRow from "@material-ui/core/TableRow";
import { Form, Field } from "react-final-form";
import { FormControl, MenuItem, CircularProgress } from "@material-ui/core";
import { Select, TextField } from "final-form-material-ui";
import DialogProgettoLivelloQuattro from "components/admin/DialogProgettoLivelloQuattro";
import { red, yellow, green } from "@material-ui/core/colors";
import { SuccessAlert } from "./snackbars";
import { ErrorAlert } from "./snackbars";
import Tooltip from "@material-ui/core/Tooltip";
import WarningIcon from "@material-ui/icons/Warning";
import Done from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  bgRed: {
    backgroundColor: red[500],
  },
  bgYellow: {
    backgroundColor: yellow[800],
  },
  bgGreen: {
    backgroundColor: green[500],
  },
  modal: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  appBar: {
    position: "relative",
  },
  paperContainer: {
    padding: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "row",
    minHeight: 200,
  },
  cardMedia: {
    width: 150,
    color: "white",
  },
  maxWidth: {
    width: 450,
    overflow: "auto",
  },
  chevronAligner: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  warnAligner: {
    display: "inline-flex",
    flex: 1,
    justifyContent: "space-between",
    verticalAlign: "top",
    alignItems: "space-between",
  },
  chevron: {
    width: "10%",
  },
  textWrap: {
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    overflowWrap: "normal",
    wordWrap: "normal",
    wordBreak: "normal",
    hyphens: "auto",
    width: "90%",
  },
}));

const SendAlertModal = ({ toaster, users, updater }) => {
  console.log("====================================");
  console.log("ALUNNI RICEVUTI", users);
  console.log("====================================");
  const classes = useStyles();
  const auth = useAuth();
  const [error, setError] = useState("");

  const resetter = async () => {
    toaster(null);
  };

  const onSubmit = async () => {
    const emails = [...users.map((u) => u.email)];
    await axios
      .post(`${baseRoute}/sendAlert`, {
        token: auth.token,
        users: emails,
      })
      .then((res) => {
        console.log(res.data);
        updater(Math.random());
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err.response.data);
        resetter().then(() => {
          toaster(<ErrorAlert message={err.response.data.cause} />);
        });
        setError(err.response.data.cause);
        console.log("====================================");
      });
  };

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper className={classes.paperContainer}>
              <Typography
                variant="h6"
                align="center"
                component="h1"
                color="initial"
              >
                Manda un avviso agli studenti mancanti
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Questi alunni non hanno ancora confermato le ore partecipate al
                progetto.
                <br /> Mandare un Avviso a {users.length} studenti?
              </Typography>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Manda Avviso
              </Button>
              <Typography color="secondary">
                {error != "" ? (
                  <>
                    <br />
                    {error}
                  </>
                ) : (
                  ""
                )}
              </Typography>
            </Paper>
          </form>
        )}
      />
    </Box>
  );
};

export default SendAlertModal;
