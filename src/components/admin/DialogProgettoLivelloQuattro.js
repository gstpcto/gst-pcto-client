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
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Form, Field } from "react-final-form";
import { Select, TextField } from "final-form-material-ui";
import { green } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmButton from "../confirmDeleteButton";
import Container from '@material-ui/core/Container';
import genYears from 'fragments/genYears';

const useStyles = makeStyles((theme) => ({
    modifyButton: {
        backgroundColor: green[500],
        color: 'white',
        '&:hover': {
            backgroundColor: green[600],
            color: 'white',
        },
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    paperContainer: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    boxContainer: {
        width: '100%',
    },
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    form: {
        display: 'inline-flex',
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
    },
}));


const ProjectTableDialogQuattro = ({ pid, closer }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [reloader, setReloader] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const [progetto, setProgetto] = useState(null);
    const [classiProgetto, setClassiProgetto] = useState({});
    const [docenti, setDocenti] = useState([]);
    
    const [openAggiungiClasse, setOpenAggiungiClasse] = useState(false);
    const handleOpenAggiungiClasse = () => {
        setOpenAggiungiClasse(true);
    }
    const handleCloseAggiungiClasse = () => {
        setOpenAggiungiClasse(false);
    }

    const remove = async (id) =>{
        await axios.delete(`${baseRoute}/progetti/stage/${id}`, {data: {token: auth.token}}).catch(err =>{
            console.log(err);
        })

        setReloader(Math.random());
    }

    const required = value => (value ? undefined : 'Required')

    useEffect(() => {
        setOpenAggiungiClasse(false);
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/progetti/${pid}`, { params: { token: auth.token } });
        };
        fetchData()
            .then((res) => {
                console.log('ER PROGETTO', res.data.data);
                setProgetto(res.data.data.info);
                setClassiProgetto([
                    ...res.data.data.classi.map(({ id, classe, sezione, indirizzo, idRelazione }) => {
                        return {
                            id,
                            classe,
                            sezione,
                            indirizzo,
                            cancella: (
                                <ConfirmButton
                                    onClick={() => {
                                        remove(idRelazione);
                                    }}
                                />
                            ),
                        };
                    }),
                ]);
                setDocenti([...res.data.data.docenti]);
            })
            .then(() => {
                setLoading(false);
            });
        // eslint-disable-next-line
    }, [reloader]);

    const onSubmit = async({nome,descrizione,durata,ente,linkValutazioni,annoScolastico,startDate,endDate}) => {

        const req = {
            nome, descrizione, durata, periodo: annoScolastico, ente, start: startDate, end: endDate, link: linkValutazioni
        }
        
        await axios.put(`${baseRoute}/progetti/modifica/${pid}`, { token: auth.token, data: req })
            .then(res => {
                console.log(res);
            })
            .catch(err =>{
                console.log(err);
            })

        setReloader(Math.random());
    };

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
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container style={{ display: 'flex' }} className={classes.marginBottom}>
                    {/*progetto titolo e descrizione */}
                    <Container maxWidth="md" component="main" className={classes.heroContent}>
                        <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                            {progetto.nome}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" component="p">
                            Descrizione <br />
                            {progetto.descrizione}
                        </Typography>
                    </Container>
                    {/* form di modifica */}
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h1" className={classes.margin}>
                            Informazioni Progetto
                        </Typography>
                        <Paper className={classes.paperContainer}>
                            <Form
                                onSubmit={onSubmit}
                                initialValues={{
                                    nome: progetto.nome,
                                    descrizione: progetto.descrizione,
                                    durata: progetto.durata,
                                    ente: progetto.ente,
                                    linkValutazioni: progetto.linkValutazioni,
                                    annoScolastico: progetto.annoScolastico,
                                    startDate: progetto.startDate.split('T')[0],
                                    endDate: progetto.endDate.split('T')[0],
                                }}
                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="nome" component={TextField} type="text" label="Nome" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="descrizione" component={TextField} type="text" label="Descrizione" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="durata" component={TextField} type="text" label="Durata in Ore" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="ente" component={TextField} type="text" label="Ente" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="annoScolastico" component={Select} type="text" label="Anno Scolastico" validate={required}>
                                                {genYears().map((o) => (
                                                    <MenuItem value={o}>{o}</MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="startDate" component={TextField} type="date" label="Data di Inizio" validate={required} />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="endDate" component={TextField} type="date" label="Data di Fine" validate={required} />
                                        </FormControl>

                                        <FormControl className={classes.formControl}>
                                            <Field fullWidth name="linkValutazioni" component={TextField} type="text" label="Link Valutazioni" />
                                        </FormControl>
                                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                            Aggiorna Dati
                                        </Button>
                                    </form>
                                )}
                            />
                        </Paper>
                    </Grid>
                    {/* aggiungere una classe */}
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h1" className={classes.margin}>
                            Classi partecipanti al progetto
                        </Typography>
                        <Modal open={openAggiungiClasse} onClose={handleCloseAggiungiClasse} aria-labelledby="nuova classe" aria-describedby="puoi aggiungere una nuova classe" className={classes.modal}>
                            <AggiungiClasse updater={setReloader} pid={pid} ceStanno={classiProgetto} />
                        </Modal>
                        <Button variant="contained" color="primary" className={classes.marginLeft} onClick={handleOpenAggiungiClasse}>
                            Aggiungi Classe
                        </Button>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell scope="col" component="th">
                                            ID Classe
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Classe
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Sezione
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Indirizzo
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Elimina
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {classiProgetto.map(({ id, classe, sezione, indirizzo, cancella }) => {
                                        return (
                                            <TableRow key={id}>
                                                <TableCell scope="row">{id}</TableCell>
                                                <TableCell scope="row">{classe}</TableCell>
                                                <TableCell scope="row">{sezione}</TableCell>
                                                <TableCell scope="row">{indirizzo}</TableCell>
                                                <TableCell scope="row">{cancella}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Container maxWidth="md" component="main" className={classes.heroContent}>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            I docenti vengono automaticamente aggiunti tramite la classe
                        </Typography>
                    </Container>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h1" className={classes.margin}>
                            Docenti partecipanti al progetto
                        </Typography>
                        <Button variant="contained" color="primary" className={classes.marginLeft} onClick={handleOpenAggiungiClasse}>
                            Aggiungi Classe
                        </Button>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell scope="col" component="th">
                                            ID Docente
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Nome
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Cognome
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Classe
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Indirizzo
                                        </TableCell>
                                        <TableCell scope="col" component="th">
                                            Descrizione
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {docenti.map(({ id, nome, cognome, classe, indirizzo, descrizione }) => {
                                        return (
                                            <TableRow key={id}>
                                                <TableCell scope="row">{id}</TableCell>
                                                <TableCell scope="row">{nome}</TableCell>
                                                <TableCell scope="row">{cognome}</TableCell>
                                                <TableCell scope="row">{classe || 'NO'}</TableCell>
                                                <TableCell scope="row">{indirizzo}</TableCell>
                                                <TableCell scope="row">{descrizione}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )}
        </>
    );
};



const AggiungiClasse = ({ updater, pid, ceStanno }) => {
    const auth = useAuth();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [classi, setClassi] = useState([]);
    

    const onSubmit = async ({classe}) => {
        
        await axios.put(`${baseRoute}/progetti/addClass`, { token: auth.token, data: { idclasse: classe, idprogetto: pid } }).catch((err) => {
            console.log(err);

        })

        updater(Math.random());
    };

    

    const required = value => (value ? undefined : 'Required')
    const fetchData = async () => {
       return await axios.get(`${baseRoute}/classi/allconcat`)
    }

    useEffect(() => {
        const test = ceStanno.map((c) => c.id);
        fetchData().then((res) => {
            console.log('LE CLASSI', res);
            setClassi([
                ...res.data.data
                    .filter((item) => {
                        return !test.includes(item.id);
                    })
                    .map((c) => {
                        return <MenuItem value={c.id}>{c.classe}</MenuItem>;
                    }),
            ]);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [updater]);



    return (isLoading ? <CircularProgress /> : <Box>
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Paper className={classes.paperContainer}>
                        <Typography variant="h6" component="h1">
                            Aggiungi Classe
                        </Typography>
                        
                        
                        <FormControl className={classes.formControl} >
                            <Field fullWidth name="classe" component={Select} label="Classe" formControlProps={{ fullWidth: true }} validate={required}>
                                {classi}
                            </Field>
                        </FormControl>

                        <Box display="flex" justifyContent="space-between">
                            <Button variant="contained" color="primary" type="submit" >
                                FATTO
                            </Button>

                        </Box>

                    </Paper>
                </form>
            )}
        />
    </Box>);
}


















export default ProjectTableDialogQuattro;