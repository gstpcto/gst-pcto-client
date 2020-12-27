import React from 'react';
import { mainPost } from '../components/mainPost';
import { otherPosts } from '../components/otherPosts';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Navbar from '../components/Navbar';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

export default function Homepage(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Navbar {...props} />
            <Container className={classes.mainGrid} maxWidth="lg">
                <main>
                    <MainFeaturedPost post={mainPost} />
                    <Grid container spacing={4}>
                        {
                            otherPosts.map((post) => (
                                <FeaturedPost key={post.title} post={post} />
                            ))
                        }
                    </Grid>
                </main>
            </Container>
            <Footer title="GSTPCTO" description="Gestionale per i percorsi per le competenze trasversali e per l'orientamento" />
        </React.Fragment>
    );
}