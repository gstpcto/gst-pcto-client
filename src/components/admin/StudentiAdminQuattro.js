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
  form:{
    display: "inline-flex",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Studenti() {
    const auth = useAuth();
    const classes = useStyles();
    const [reloader, setReloader] = useState(null);
    const [uid, setUid] = useState(null);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    
  const onSubmit = async ({filtro}) => {
    console.log('form submitted');
    console.log(filtro);
    setFilter(filtro)
  };
    
    
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
                            setUid(obj.id);
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
    }, [reloader, filter]);

    return isLoading ? (
      <CircularProgress />
    ) : (
      <>

          <Form md={12} xs={12}
            onSubmit={onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate className={classes.form} onChange={handleSubmit}>
                  <FormControl className={classes.formControl} xs={9} >
                    <Field fullWidth name="filtro" component={TextField} type="text" label="Filtra studenti" />
                  </FormControl>
              </form>
            )}
          />

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          >
            <StudenteDialogContent uid={uid} updater={setReloader} closer={handleClose} reloader={reloader} />
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
              {data.filter((item)=>{
                
                if(filter===undefined) return true;
                if (filter[0]==="#"){
                  const temp = filter.substring(1);
                  if(item.id===temp) return true;
                  else return false;
                }else{
                  if (filter === null || filter === "") return true
                  if (item.nome.includes(filter)) return true
                  else return false;
                }
              }).map(({ id, nome, email, modifica }) => (
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


const StudenteDialogContent = ({uid, updater, closer, reloader}) =>{
    const [studente, setStudente] = useState(null);
    const [storico, setStorico] = useState(null)
    const [isLoading, setLoading] = useState(true);
    const [openAggiungiAnnoModal, setOpenAggiungiAnnoModal] = useState(false);
    const auth = useAuth();
    const classes = useStyles();

    const handleOpenAggiungiModal = () => {
      setOpenAggiungiAnnoModal(true);
    };

    const handleCloseAggiungiModal = () => {
      setOpenAggiungiAnnoModal(false);
    };


    const onSubmit = async (data) => {
      console.log('form submitted');
      console.log(data);
      axios.put(`${baseRoute}/studenti/updateAdmin`, {token: auth.token, idstudente: studente.id, data})
      .then(r=>{console.log(r);})
      .then(()=>updater(Math.random()))
    };

    const onSubmitPass = async ({nuovaPass}) =>{
        if(nuovaPass!==undefined){
          axios.put(`${baseRoute}/studenti/updatePasswordAdmin`, {token: auth.token, idstudente: studente.id, nuovaPass})
            .then(r => { console.log(r); })
            .then(() => updater(Math.random()))
        }
    }

    useEffect(()=>{
      console.log('====================================');
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log('====================================');
      console.log(`${baseRoute}/studenti/${uid}`);
      axios
        .get(`${baseRoute}/studenti/${uid}`, { params: { token: auth.token } })
        .then((res) => {
          setStudente(res.data.data);
          console.log(res.data.data);
        }).then(()=>{
          axios
            .get(`${baseRoute}/studenti/${uid}/storico`, { params: { token: auth.token } })
            .then((res) => {
              setStorico(res.data.data)
              console.log(res.data.data);
            }).then(() => { setLoading(false) })
        })
      
      //updater(Math.random())
      setOpenAggiungiAnnoModal(false);
    }, [uid, auth, reloader]);


    return isLoading? <CircularProgress /> :
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
                Info Studente
              </Typography>
            
            <Button autoFocus color="inherit" onClick={closer}>
              OK
                </Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{display: "flex"}}>
          {/* update student data component */}
          <Grid item md={6} xs={12}>
            <Typography variant="h6" component="h1">
              Informazioni utente
            </Typography>
            <Paper className={classes.paperContainer} >
              <Form
                onSubmit={onSubmit}
                initialValues={{nome: studente.nome, cognome: studente.cognome, email: studente.email, codiceF: studente.codiceF, dataN: studente.dataN.split('T')[0]}}
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
          {/* password admin reset component */}
          <Grid item md={6} xs={12}>
            <Typography variant="h6" component="h1">
              Password Reset
            </Typography>
            <Paper className={classes.paperContainer} >
              <Form
                onSubmit={onSubmitPass}
                initialValues={{nuovaPass: ""}}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                  <form onSubmit={async (event) =>{
                    handleSubmit(event).then(reset);
                  }}>
                    <FormControl className={classes.formControl} >
                      <Field fullWidth name="nuovaPass" component={TextField} type="text" label="Nuova Password"  required />
                    </FormControl>
                    <Button variant="contained" color="secondary" type="submit">
                      Aggiorna Password
                  </Button>
                  </form>
                )}
              />
            </Paper>
          </Grid>
          {/**storico delle classi frequentate */}
          <Grid item md={12} xs={12}>
            <Typography variant="h6" className={classes.title}>
              Storico dello Studente
              </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenAggiungiModal}>
              Aggiungi Anno
            </Button>
            <Modal //add classe modal
                    open={openAggiungiAnnoModal}
                    onClose={handleCloseAggiungiModal}
                    aria-labelledby="nuova classe"
                    aria-describedby="puoi aggiungere una nuova classe"
                    className={classes.modal}
                >
                    <AggiungiAnnoModal updater={updater} studenteid={studente.id} />
                </Modal>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell scope="col" component="th">
                      Anno Scolastico
                    </TableCell>
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
                      Modifica
                    </TableCell>
                    <TableCell scope="col" component="th">
                      Elimina
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {storico.map(({ annoScolastico, id, classe, sezione, indirizzo, modifica, elimina }) => (
                    <TableRow key={id}>
                      <TableCell scope="row">{annoScolastico}</TableCell>
                      <TableCell scope="row">{id}</TableCell>
                      <TableCell scope="row">{classe}</TableCell>
                      <TableCell scope="row">{sezione}</TableCell>
                      <TableCell scope="row">{indirizzo}</TableCell>
                      <TableCell scope="row">{modifica}</TableCell>
                      <TableCell scope="row">{elimina}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

      </Grid> 
    </Grid>
    ;
}



const AggiungiAnnoModal = ({updater, studenteid}) =>{
  console.log(studenteid);
  const auth = useAuth();
  const classes = useStyles();
  const [classi, setClassi] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const onSubmit = async (data) => {
    console.log('form submitted');
    console.log(data);
    //TODO: add api functionality
    const {annoScolastico, idclasse} = data;
    const req = {
      as: annoScolastico,
      idclasse,
      idstudente: studenteid
    }
    await axios.put(`${baseRoute}/studenti/cambiaClasse`, {token: auth.token, data: req})
    .then(res =>{
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })    

    updater(Math.random());
  };

  const fetchData = async() =>{
    await axios.get(`${baseRoute}/classi/all`)
    .then((res)=>{
      setClassi([...res.data.data.map(item => (<MenuItem value={item.id}>{`${item.classe}${item.sezione} ${item.indirizzo}`}</MenuItem>))])
    })
  }

  useEffect(()=>{
    fetchData().then(()=>{
      setLoading(false);

    })
  }, [studenteid, updater]);



  return (isLoading? <CircularProgress />: <Box>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Paper className={classes.paperContainer}>
            <Typography variant="h6" component="h1">
              Aggiungi allo storico
                            </Typography>
            <FormControl className={classes.formControl}>
              <Field fullWidth required name="annoScolastico" component={TextField} type="text" label="Anno Scolastico" />
            </FormControl>
            
            <FormControl className={classes.formControl}>
              <Field fullWidth name="idclasse" component={Select} label="Classe" formControlProps={{ fullWidth: true }}>
                {classi}
              </Field>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" >
              Submit
                            </Button>
          </Paper>
        </form>
      )}
    />
  </Box>);
}