import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { baseRoute, useAuth } from "ProvideAuth";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Form } from "react-final-form";
import { red, yellow, green } from "@material-ui/core/colors";
import { SuccessAlert } from "./snackbars";
import { ErrorAlert } from "./snackbars";

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

const SendAlertModal = ({ toaster, users, updater, progetto }) => {
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
        progetto,
      })
      .then((res) => {
        console.log(res.data);
        resetter().then(() => {
          toaster(<SuccessAlert message={"le mail saranno inviate"} />);
        });
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
                {auth.user.livello == 2
                  ? "Manda un avviso al referente di classe"
                  : "Manda un avviso agli studenti mancanti"}
              </Typography>
              {auth.user.livello == 2 ? (
                ""
              ) : (
                <Typography variant="h6" color="textSecondary" component="p">
                  Questi alunni non hanno ancora confermato le ore partecipate
                  al progetto.
                  <br /> Mandare un Avviso a {users.length} studenti?
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Manda Avviso
              </Button>
              <Typography color="secondary">
                {error !== "" ? (
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
