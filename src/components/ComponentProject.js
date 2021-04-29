import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { baseRoute, useAuth } from 'ProvideAuth';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Warning from '@material-ui/icons/Warning';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Slide from "@material-ui/core/Slide";
import TableRow from '@material-ui/core/TableRow';
import { Form, Field } from 'react-final-form';
import { FormControl, MenuItem, CircularProgress } from '@material-ui/core';
import { Select, TextField } from 'final-form-material-ui';
import DialogProgettoLivelloQuattro from "components/admin/DialogProgettoLivelloQuattro"
import { red, yellow, green } from '@material-ui/core/colors';
import { SuccessAlert } from './snackbars';
import { ErrorAlert } from './snackbars';
import Tooltip from '@material-ui/core/Tooltip';
import WarningIcon from '@material-ui/icons/Warning';
import Done from '@material-ui/icons/Done';
import SendAlertModal from 'components/sendAlertModal'
import { theme } from 'theme';
import { DoneAll } from '@material-ui/icons';
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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    appBar: {
        position: 'relative',
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: 200
    },
    cardMedia: {
        width: 150,
        color: 'white',
    },
    maxWidth: {
        width: 450,
        overflow: 'auto',
    },
    chevronAligner: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    warnAligner: {
        display: 'inline-flex',
        flex: 1,
        justifyContent: 'space-between',
        verticalAlign: "top",
        alignItems: 'space-between',
    },
    chevron: {
        width: '10%',
    },
    textWrap: {
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflowWrap: 'normal',
        wordWrap: 'normal',
        wordBreak: 'normal',
        hyphens: 'auto',
        width: '90%',
    },
    button: {
        margin: theme.spacing(1)
    },
    modifyButton: {
        backgroundColor: green[500],
        color: 'white',
    },
    modifyButtonHover: {
        '&:hover': {
            backgroundColor: green[800],
            color: 'white',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//TODO: add the powerful modal here
//this is the card
export default function ComponentProject({ nome, descrizione, id, linkValutazioni, annoScolastico }) {


    console.log('progetto', id);
    const [cardColor, setColor] = useState(false); //false se mancano dei voti, true se sono tutti. 
    const classes = useStyles();
    const auth = useAuth();
    console.log(auth.user["livello"]);
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);
    const cardRoot = clsx(classes.card, classes.chevronAligner);

    const [open, setOpen] = useState(false);
    const [pid, setPid] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setPid(id);
    };
    const handleClose = () => {
        setOpen(false);
        //setPid(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            return await axios
                .get(`${baseRoute}/progetti/classiAlunni/${id}`, { params: { token: auth.token } })
        }

        fetchData()
            .then(r => {
                const al = r.data.progetti.alunni;
                console.log("RISULTATOOO", al);
                al.forEach(a => {
                    if (a.voto === null) {
                        setColor(true);
                        return;
                    }
                });
            })

    }, [])


    return (
        <>
            <Grid item xs={12} md={6}>
                <Box>
                    <CardActionArea
                        onClick={handleOpen}
                    >
                        <Card className={`${cardRoot} ${cardColor ? classes.bgRed : classes.bgGreen}`} style={{ color: "white" }}>
                            <div className={fixedSizeCardDetails}>
                                <CardContent className={classes.textWrap}>
                                    <Typography variant="h6">{nome}</Typography>
                                    <Typography variant="subtitle1" >
                                        {descrizione}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        {annoScolastico}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        {
                                            cardColor ? <><span className={classes.warnAligner}> <Warning /></span> Devi ancora inserire alcuni voti...</> : null
                                        }
                                    </Typography>

                                </CardContent>
                            </div>
                            <Box className={classes.chevron} display="flex" justifyContent="center" alignItems="center">
                                <ChevronRightIcon />
                            </Box>
                        </Card>
                    </CardActionArea>
                </Box>
            </Grid>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                {auth.user["livello"] === 4 ? <DialogProgettoLivelloQuattro pid={pid} closer={handleClose} /> : <ProjectTableDialog pid={pid} closer={handleClose} link={linkValutazioni} />}
            </Dialog>
        </>
    );
}

//level 2 things
//this is the table for a single project
const ProjectTableDialog = ({ pid, closer, link }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [reloader, setReloader] = useState(null);
    const [datiProgetto, setDatiProgetto] = useState({});
    const [alunniProgetto, setAlunniProgetto] = useState([]);
    const [toast, toaster] = useState(null);
    const [infoVoto, setInfoVoto] = useState({
        iduser: '',
        nome: '',
        cognome: '',
        data: '',
    });
    const [sendButton, setSendButton] = useState(false);

    const [openSendAlert, setOpenSendAlert] = useState(false);
    const [usersToSend, setUsersToSend] = useState([]);
    const handleOpenSendAlert = async () => { //raccogliere i dati sugli utenti da passare
        setOpenSendAlert(true);
    }
    const handleCloseSendAlert = () => {
        setOpenSendAlert(false);
    }
    const updateUsersToSend = async (users) => {
        setUsersToSend(users);
    }



    const [votoEdit, setVotoEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const handleModalOpen = ({ iduser, nome, cognome, idprogetto, data }) => {
        setInfoVoto({ iduser, nome, cognome, idprogetto, data });
        setOpen(true);
    };
    const [openEditValutation, setOpenEditValutation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            return await axios
                .get(`${baseRoute}/progetti/classiAlunni/${pid}`, { params: { token: auth.token } })
        }
        setOpen(false);
        setOpenEditValutation(false);
        setOpenSendAlert(false)
        setSendButton(false);
        fetchData()
            .then((res) => {
                console.log('OMG', res.data.progetti);
                if (res.data.progetti === []) return;
                else {
                    setDatiProgetto(res.data['progetti'].infoProgetto);
                    setAlunniProgetto(res.data['progetti']['alunni']);
                }
                return res.data["progetti"]["alunni"]
            })
            .then((d) => {
                console.log("SDADASDASDASDAS", d);
                for (let i = 0; i < d.length; i++) {
                    console.log(d[i]);
                    if (d[i].oreEffettive == null) {
                        setSendButton(true);
                        return;
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line
    }, [reloader]);


    const handleModalClose = () => {
        setInfoVoto({
            iduser: '',
            nome: '',
            cognome: '',
            idprogetto: '',
            data: '',
        });
        setOpen(false);
    };


    const handleOpenEditValutation = ({ idvoto, nome, cognome }) => {
        setVotoEdit({ idvoto: idvoto, nome: nome, cognome: cognome });
        setOpenEditValutation(true);
    };

    const handleCloseEditValutation = () => {
        setVotoEdit({ idvoto: '', nome: '', cognome: '' });
        setOpenEditValutation(false);
    };

    return (
        <>
            <Modal open={openSendAlert} onClose={handleCloseSendAlert} className={classes.modal}>
                <SendAlertModal updater={setReloader} toaster={toaster} users={usersToSend} />
            </Modal>

            <Modal open={openEditValutation} onClose={handleCloseEditValutation} className={classes.modal}>
                <EditValutation vid={votoEdit} updater={setReloader} toaster={toaster} />
            </Modal>
            <Modal open={open} onClose={handleModalClose} className={classes.modal}>
                <AddValutation infoVoto={infoVoto} updater={setReloader} toaster={toaster} />
            </Modal>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closer} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Info Progetto
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container>

                <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }} style={{ marginTop: theme.spacing(1), marginLeft: theme.spacing(1) }}>
                    <Paper className={classes.paperContainer}>
                        {link ? <a href={link} >Link al form</a> : "link non ancora creato"}
                    </Paper>
                    {sendButton ?
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<WarningIcon />}
                            onClick={handleOpenSendAlert}
                        >
                            Manda Alert
                    </Button> :
                        <Button
                            variant="outlined" color="primary"
                            className={`${classes.button}`}
                            startIcon={<DoneAll />}

                        >
                            Tutto ok
                    </Button>
                    }


                </Box>
                <TableContainer style={{ margin: '25px' }} component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell scope="col" component="th">
                                    Nome e Cognome
                                </TableCell>
                                <TableCell scope="col" component="th">
                                    {datiProgetto.nome}
                                </TableCell>
                                <TableCell scope="col" component="th">
                                    Stato
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alunniProgetto.map(({ iduser, nome, cognome, voto, idvalutazione, oreEffettive }, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row">{`${nome} ${cognome}`}</TableCell>
                                    <TableCell scope="row">
                                        {voto ? (
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                onClick={() => {
                                                    console.log('QUESTO è IL VOTOOOOOOOOO', voto);
                                                    handleOpenEditValutation({ idvoto: idvalutazione, nome: nome, cognome: cognome });
                                                }}
                                            >
                                                {voto}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => {
                                                    handleModalOpen({ iduser: iduser, nome, cognome, idprogetto: datiProgetto.id });
                                                    console.log({ iduser: iduser, nome, cognome, idprogetto: datiProgetto.id });
                                                }}
                                            >
                                                Aggiungi voto
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell scope="row">
                                        {
                                            !oreEffettive ? <Tooltip title="Ore Mancanti">
                                                <IconButton aria-label="warning">
                                                    <WarningIcon style={{ color: red[500] }} />
                                                </IconButton>

                                            </Tooltip> : <Tooltip title="Tutto ok">
                                                <Done style={{ color: green[500] }} />
                                            </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {toast}
        </>
    );
};


const EditValutation = ({ vid, updater, toaster }) => {
    const classes = useStyles();
    const auth = useAuth();
    const [infoTutto, SetInfoTutto] = useState();
    const [loading, setLoading] = useState(true);
    const { idvoto, nome, cognome } = vid;
    const resetter = async () => {
        toaster(null);
    }


    useEffect(() => {
        axios
            .get(`${baseRoute}/voti/voti/${idvoto}`, { params: { token: auth.token } })
            .then((res) => {
                console.log('EDIT VOTOOOOOOOOOOO> ', res.data.data);
                SetInfoTutto(res.data.data);
                setLoading(false);

            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
        const req = {
            voto: data.voto,
            descrizione: data.descV,
            data: data.dataV,
        };

        await axios
            .put(`${baseRoute}/voti/voti/${idvoto}`, { token: auth.token, data: req })
            .then((res) => {
                console.log(res);
                resetter().then(() => {
                    toaster(<SuccessAlert message={res.data.message} />)
                })
                updater(Math.random());
            })
            .catch((err) => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
                console.error(err);
            });

    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ voto: infoTutto.valutazione, descV: infoTutto.descrizione, dataV: infoTutto.data.split('T')[0] }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper className={classes.paperContainer}>
                                <Typography variant="h6" component="h1" color="initial">
                                    Modifica il voto allo studente
                                    {nome} {cognome}
                                </Typography>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth name="voto" component={Select} label="Voto" formControlProps={{ fullWidth: true }}>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={3.5}>3.5</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={4.5}>4.5</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={5.5}>5.5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={6.5}>6.5</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={7.5}>7.5</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={8.5}>8.5</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={9.5}>9.5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Field>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth name="descV" component={TextField} type="text" label="Descrizione Voto" />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Field fullWidth name="dataV" component={TextField} type="date" label="Data Voto" />
                                </FormControl>
                                <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                    Modifica Valutazione
                                </Button>
                            </Paper>
                        </form>
                    )}
                />
            )}
        </Box>
    );
};

//edit valutation modal
const AddValutation = ({ infoVoto, updater, toaster }) => {
    const classes = useStyles();
    const auth = useAuth();
    const resetter = async () => {
        toaster(null);
    }
    const onSubmit = async (data) => {
        axios
            .post(`${baseRoute}/voti/voto`, {
                token: auth.token,
                data: {
                    idstudente: infoVoto.iduser,
                    idprogetto: infoVoto.idprogetto,
                    valutazione: data.voto,
                    descrizione: data.descV,
                    date: data.dataV,
                },
            })
            .then(function (response) {
                console.log(response);
                resetter().then(() => {
                    toaster(<SuccessAlert message={response.data.message} />)
                })
                updater(Math.random())
            })
            .catch(function (error) {
                console.log(error);
                resetter().then(() => {
                    toaster(<ErrorAlert message={error.response.data.cause} />)
                })
            });
        // updater(Math.random());
    };

    return (
        <Box>
            <Form
                onSubmit={onSubmit}
                initialValues={{ voto: 6, descV: "", dataV: new Date(Date.now()).toISOString().split('T')[0] }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h6" component="h1" color="initial">
                                Aggiungi un voto allo studente
                                {infoVoto.nome} {infoVoto.cognome}
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="voto" component={Select} label="Voto" formControlProps={{ fullWidth: true }}>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={3.5}>3.5</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={4.5}>4.5</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={5.5}>5.5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={6.5}>6.5</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={7.5}>7.5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={8.5}>8.5</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={9.5}>9.5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Field>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="descV" component={TextField} type="text" label="Descrizione Voto" />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Field fullWidth name="dataV" component={TextField} type="date" label="Data Voto" />
                            </FormControl>
                            <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                Aggiungi Valutazione
                            </Button>
                        </Paper>
                    </form>
                )}
            />
        </Box>
    );
};


export {
    AddValutation, EditValutation
}

