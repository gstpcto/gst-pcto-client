import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { baseRoute, useAuth } from "../../ProvideAuth";
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
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Studenti() {
    const auth = useAuth();
    const classes = useStyles();
    const [reloader, setReloader] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        axios
        .get(`${baseRoute}/studenti/all`, { params: { token: auth.token } })
        .then((res) => {
            console.log(res.data.data);
            if (res.data.data === undefined) {
            console.error(res.data);
            } else {
            const temp = [
                ...res.data.data.map((obj) => {
                return {
                    id: obj.id,
                    email: obj.email,
                    nome: `${obj.nome} ${obj.cognome}`,
                    modifica: (
                    <Button
                        variant="contained"
                        className={`${classes.modifyButton} ${classes.modifyButtonHover}`}
                        onClick={() => {
                            console.log(obj.id);
                            handleClickOpen()
                        }}
                    >
                        MODIFICA
                    </Button>
                    ),
                };
                }),
            ];
            console.log("temp", temp);
            setData(temp);
            }
        })
        .then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, [reloader]);

    return isLoading ? (
      <CircularProgress />
    ) : (
      <>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            >
            <AppBar className={classes.appBar}>
                <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                    save
                </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                />
                </ListItem>
            </List>
        </Dialog>
        
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell scope="col" component="th">
                  ID
                </TableCell>
                <TableCell scope="col" component="th">
                  classe
                </TableCell>
                <TableCell scope="col" component="th">
                  Email
                </TableCell>
                <TableCell scope="col" component="th">
                  Modifica
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({ id, nome, email, modifica }) => (
                <TableRow key={id}>
                  <TableCell scope="row">{id}</TableCell>
                  <TableCell scope="row">{nome}</TableCell>
                  <TableCell scope="row">{email}</TableCell>
                  <TableCell scope="row">{modifica}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
}


const studenteDialog = ({}) =>{

    return (
      <div>
            
      </div>
    );
}