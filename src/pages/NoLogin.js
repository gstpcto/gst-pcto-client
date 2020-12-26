import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {amber} from '@material-ui/core/colors';

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
        backgroundColor: amber[600],
    },
    text: {
        textAlign: "center",
    },
    button: {
        margin: theme.spacing(2, 0, 2),
    },
}));

export default function NoLogin(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <WarningIcon />
                </Avatar>
                <Typography className={classes.text} component="body2" variant="h5">
                    È necessario fare il login per accedere a questa pagina.
                </Typography>
                <Button className={classes.button} 
                    variant="contained" 
                    onClick={()=>{
                        props.history.push("/signin");
                    }}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}