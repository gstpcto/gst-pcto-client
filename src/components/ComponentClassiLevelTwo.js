import React, { useState, useEffect } from 'react';
import { baseRoute, useAuth } from '../ProvideAuth';
import clsx from 'clsx';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import ComponentProject from 'components/ComponentProject';
import { red, yellow, green } from '@material-ui/core/colors';
import { Warning } from '@material-ui/icons';
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
        height: 150,
        overflow: 'auto',
    },
    cardMedia: {
        width: 150,
        color: 'white',
    },
    maxWidth: {
        width: 300,
        overflow: 'auto',
    },
    chevronAligner: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
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
    warnAligner: {
        display: 'inline-flex',
        flex: 1,
        justifyContent: 'space-between',
        verticalAlign: "top",
        alignItems: 'space-between',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ComponentClassiLevelTwo({ classe, sezione, idClasse, indirizzo, livelloUp }) {
    const auth = useAuth();
    const classes = useStyles();
    const fixedSizeCardDetails = clsx(classes.card, classes.maxWidth);
    const cardRoot = clsx(classes.card, classes.chevronAligner);

    const [openClasse, setOpenClasse] = useState(false);
    const [cid, setCid] = useState(null); // id Class3
    const [errorColor, setErrorColor] = useState(false);

    const handleOpenClasse = () => {
        setOpenClasse(true);
        setCid(idClasse);
        console.log(cid);
    };
    const handleCloseClasse = () => {
        setOpenClasse(false);
        setCid(null);
    };
    useEffect(() => {
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/progetti/progettiPerClasse/${idClasse}`, { params: { token: auth.token } });
        };

        fetchData()
            .then(function (response) {
                return response["data"]["data"];
            })
            .then(data => {
                data.forEach(({ id }) => {
                    const fetchDataa = async () => {
                        return await axios
                            .get(`${baseRoute}/progetti/classiAlunni/${id}`, { params: { token: auth.token } })
                    }
                    fetchDataa()
                        .then(r => {
                            const al = r.data.progetti.alunni;
                            console.log("RISULTATOOO", al);
                            al.forEach(a => {
                                if (a.voto === null) {
                                    setErrorColor(true);
                                    return;
                                }
                            });
                        })
                })
            })
            .catch(function (error) {
                console.log(error);
            });



        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Grid item xs={12} md={6}>
                <Box>
                    <CardActionArea onClick={handleOpenClasse}>
                        <Card className={`${cardRoot} ${errorColor ? classes.bgRed : classes.bgGreen}`} style={{ color: "white" }}>
                            <div className={fixedSizeCardDetails}>
                                <CardContent className={classes.textWrap}>
                                    <Typography variant="h6">
                                        {classe}
                                        {sezione}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {`${indirizzo}`}
                                    </Typography>
                                    <Typography variant="subtitle1" color="white">
                                        {
                                            errorColor ? <><span className={classes.warnAligner}> <Warning /></span> Devi ancora inserire alcuni voti...</> : null
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
            <Dialog fullScreen open={openClasse} onClose={handleCloseClasse} TransitionComponent={Transition}>
                <DialogProgettiClasse closer={handleCloseClasse} classe={classe} sezione={sezione} idClasse={idClasse} indirizzo={indirizzo} setColor={setErrorColor} livelloUp={livelloUp} />
            </Dialog>
        </>
    );
}

const DialogProgettiClasse = ({ classe, sezione, idClasse, indirizzo, closer, setColor, livelloUp }) => {
    const classes = useStyles();
    const auth = useAuth();

    const [progettiClasse, setProgettiClasse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/progetti/progettiPerClasse/${idClasse}`, { params: { token: auth.token } });
        };

        fetchData()
            .then(function (response) {
                // console.log('questi sono i progetti della classe ', idClasse, ' PROGETTI ', response);
                // console.log('progetti', response['data']['data']);
                setProgettiClasse(response['data']['data']);
                return response["data"]["data"];
            })
            .catch(function (error) {
                console.log(error);
            });



        // eslint-disable-next-line
    }, []);

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closer} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Progetti Classe {classe}
                        {sezione} - {indirizzo}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box className={classes.paperContainer}>
                <Grid item container xs={12} spacing={1}>
                    {progettiClasse.length !== 0 ?
                        progettiClasse.map(({ id, nome, descrizione, linkValutazioni, annoScolastico }, index) => {
                            return <ComponentProject key={index} nome={nome} descrizione={descrizione} id={id} linkValutazioni={linkValutazioni} annoScolastico={annoScolastico} livelloUp={livelloUp} idClasse={idClasse} />;
                        }) :
                        "Nessun progetto disponibile"
                    }
                </Grid>
            </Box>
        </>
    );
};
