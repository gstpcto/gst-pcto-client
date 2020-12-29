import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: red[600],
    },
    text: {
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(2, 0, 2),
    },
}));

export default function NotFound() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FindInPageIcon />
                </Avatar>
                <Typography className={classes.text} component="h1" variant="h5">
                    404 Not Found
                </Typography>
                <Button className={classes.button} variant="contained" onClick={() => { history.push('/'); }} >
                    Vai alla Home
                </Button>
            </Paper>
        </Container>
    );
}
