import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';
import { mainPost } from '../components/mainPost';
import { otherPosts } from '../components/otherPosts';
import { standaloneCard } from '../components/standaloneCard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import PWAPost from '../components/PWAPost';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gifSizing: {
    maxWidth: '300px',
    maxHeight: '300px',
  },
}));

export default function Homepage() {
  const classes = useStyles();
  // const history = useHistory();

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ? true : false;
  const [open, setOpen] = useState(false);
  const userAgent = navigator.userAgent.toLowerCase();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container className={classes.mainGrid} maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainPost} />
          <Grid container spacing={4}>
            {/* Crea x FeaturedPost prendendo i dati da otherPosts.js */}
            {otherPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
            {/* se non è standalone (PWA) mostra il post per l'installazione */}
            {!isStandalone && <PWAPost post={standaloneCard} onClick={handleOpen} />}
          </Grid>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Grid className={classes.paper}>
                <h2 id="transition-modal-title">Installa la nostra PWA</h2>
                <Grid container item spacing={1}>
                  {/* Mostra la gif per l'installazione della pwa di android se su un dispositivo android, oppure quello ios su tutti gli altri. */}
                  {userAgent.indexOf('android') > -1 ? (
                    <Grid item xs={6}>
                      <img className={classes.gifSizing} src="/assets/pwa_android.gif" alt="Android PWA Installation" />
                    </Grid>
                  ) : (
                      <Grid item xs={6}>
                        <img className={classes.gifSizing} src="/assets/pwa_ios.gif" alt="iOS PWA Installation" />
                      </Grid>
                    )}
                </Grid>
              </Grid>
            </Fade>
          </Modal>
        </main>
      </Container>
      <Footer title="GSTPCTO" description="Gestionale per i percorsi per le competenze trasversali e per l'orientamento" />
    </React.Fragment>
  );
}
