import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../ProvideAuth';

import Copyright from '../components/Copyright';
import EventListener from 'react-event-listener';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        color: '#e53935',
    },
}));

export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    
    const [loading, setLoading] = useState(false);
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleTextChange = (event) => {
        setLoginValues((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const handleLogin = async () => {
        setLoading(true);
        await auth.login({ username: loginValues['email'], password: loginValues['password'] });

        setLoading(false);
        if (auth.isAuthenticated()) {
            history.push('/dashboard');
        } else {
            setErrorMessage('Accesso fallito');
        }
    };

    const handleKeyPress = (e) => {
        //e.preventDefault();
        //console.log(e);
        if (e.key === 'Enter') handleLogin();
    };

    return loading ? (
        <Container component="main" maxWidth="xs">
            <Container className={classes.paper}>
                <CircularProgress />
            </Container>
        </Container>
    ) : (
        <Container component="main" maxWidth="xs">
            <EventListener target="window" onKeyPress={handleKeyPress} />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Accedi al portale
                </Typography>
                <Typography className={classes.errorMessage} component="h2" variant="h6">
                    {errorMessage}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField onChange={handleTextChange} variant="outlined" margin="normal" required fullWidth id="email" label="Indirizzo Email" name="email" autoComplete="email" autoFocus />
                    <TextField onChange={handleTextChange} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleLogin}>
                        Accedi
                    </Button>
                </form>
            </Paper>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
