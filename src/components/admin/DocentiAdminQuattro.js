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
import Container from '@material-ui/core/Container';
import { OnChange } from 'react-final-form-listeners'
import { Transition} from "./StudentiAdminQuattro";


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
        margin: theme.spacing(2)
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
    margin: {
        margin: theme.spacing(2),
    },
    marginLeft: {
        marginLeft: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: theme.spacing(8),
    }
}));

const Docenti = () => {
    const classes = useStyles();
    const auth = useAuth();
    const [reloader, setReloader] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const [docenti, setDocenti] = useState([]);
    const [docente, setDocente] = useState(null);
    const [open, setOpen] = useState(false);
    //dialog handlers

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setReloader(Math.random())
    };


    useEffect(()=>{
        console.log("CARICANDO LA GENKIDAMA");
        const fetchData = async () =>{
            return await axios.get(`${baseRoute}/docenti/all`, { params: { token: auth.token}})
        }

        fetchData().then(res=>{
            console.log(res.data);
            setDocenti([...res.data.data.map((d)=>{
                const modifica = <Button
                    variant="contained"
                    className={`${classes.modifyButton} ${classes.modifyButtonHover}`}
                    onClick={() => {
                        console.log(d.id);
                        setDocente(d.id);
                        handleClickOpen()
                    }}
                >
                    MODIFICA
                </Button>
                return {...d, modifica}
            })])
        })
        .then(()=>{setLoading(false)})

    }, [auth, reloader])

    return ( isLoading? <CircularProgress /> : 
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <StudenteDialogContent did={docente} closer={handleClose} />
            </Dialog>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Docenti
                </Typography>
                
            </Container>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th">
                                ID
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Nome
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Cognome
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
                        {docenti.map(({ id, nome,cognome,  email, modifica}) => (
                            <TableRow key={id}>
                                <TableCell scope="row">{id}</TableCell>
                                <TableCell scope="row">{nome}</TableCell>
                                <TableCell scope="row">{cognome}</TableCell>
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

const StudenteDialogContent = ({ did, closer }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [docente, setDocente] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [updater, setUpdater] = useState(null)
    //frequentare
    

    useEffect(() => {
        const fetchData = async () =>{
            return await axios.get(`${baseRoute}/docenti/${did}`,  {params: {token: auth.token}});
        }
        fetchData().then(res =>{
            console.log(res.data.data);
            setDocente(res.data.data)
        }).then(()=>{setLoading(false)})
        
    }, [updater])

    const onSubmit = async (data) => {
        console.log('form submitted');
        console.log(data);
        axios.put(`${baseRoute}/docenti/updateAdmin`, { token: auth.token, idDocente: did, data })
            .then(r => { console.log(r); })
            .then(() => setUpdater(Math.random()))
    };



    return isLoading ? <CircularProgress /> :
        <Grid spacing={2}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closer}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Info Docente
              </Typography>

                    <Button autoFocus color="inherit" onClick={closer}>
                        OK
                </Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{ display: "flex" }}>
                <Grid item md={6} xs={12}>
                    <Typography variant="h6" component="h1">
                        Informazioni utente
                    </Typography>
                    <Paper className={classes.paperContainer} >
                        <Form
                            onSubmit={onSubmit}
                            initialValues={{ nome: docente.nome, cognome: docente.cognome, email: docente.email, codiceF: docente.codiceF, dataN: docente.dataN.split('T')[0] }}
                            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <FormControl className={classes.formControl} >
                                        <Field fullWidth name="nome" component={TextField} type="text" label="Nome" />
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
        </Grid>
        ;
}





























export default Docenti;