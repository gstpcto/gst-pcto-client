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
import ConfirmButton from "../confirmDeleteButton";
import { OnChange } from 'react-final-form-listeners'
import Container from '@material-ui/core/Container';
import { flexbox } from '@material-ui/system';

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
    heroContent: {
        padding: theme.spacing(4, 0, 6),
    },
}));


const ProjectTableDialogQuattro = ({ pid, closer }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [reloader, setReloader] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const [progetto, setProgetto] = useState(null);
    const [datiProgetto, setDatiProgetto] = useState({});
    const [alunniProgetto, setAlunniProgetto] = useState([]);
    

    console.log("PIPO");

    const required = value => (value ? undefined : 'Required')

    useEffect(() => {
        const fetchData = async () =>{
            return await axios
                .get(`${baseRoute}/progetti/${pid}`, { params: { token: auth.token } })
        }
        fetchData().then((res)=>{
            console.log("ER PROGETTO", res.data.data);
            setProgetto(res.data.data.info);
        })
        .then(()=>{setLoading(false)})
    }, [reloader]);

    

    return (
        <>
            
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closer} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Modifica Progetto
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closer}>
                        OK
                    </Button>
                </Toolbar>
                
            </AppBar>
            {   isLoading ? <CircularProgress />
                : 
                <Grid container style={{display: "flex"}}>
                    {/*progetto titolo e descrizione */}
                    <Container maxWidth="md" component="main" className={classes.heroContent}>
                        <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                            {progetto.nome}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                            Descrizione <br/>
                            {progetto.descrizione}
                        </Typography>
                    </Container>
                    {/* form di modifica */}
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6" component="h1">
                            Informazioni Progetto
                        </Typography>
                        <Paper className={classes.paperContainer} >
                            <Form
                                onSubmit={()=>{}}
                                initialValues={{}}
                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <FormControl className={classes.formControl} >
                                            <Field fullWidth name="nome" component={TextField} type="text" label="Nome" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl} >
                                            <Field fullWidth name="cognome" component={TextField} type="text" label="Cognome" />
                                        </FormControl>
                                        <FormControl className={classes.formControl} >
                                            <Field fullWidth name="email" component={TextField} type="text" label="Email" />
                                        </FormControl>
                                        <FormControl className={classes.formControl} >
                                            <Field fullWidth name="codiceF" component={TextField} type="text" label="Codice Fiscale" />
                                        </FormControl>
                                        <FormControl className={classes.formControl} >
                                            <Field fullWidth name="dataN" component={TextField} type="date" label="Data di Nascita" />
                                        </FormControl>

                                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                            Aggiorna Dati
                                        </Button>
                                    </form>
                                )}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default ProjectTableDialogQuattro;