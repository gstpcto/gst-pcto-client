import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar(props) {
    const classes = useStyles();
    const { history } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography edge="start" variant="h6" className={classes.title}>
                        PCTO Pazzo Sgravato
                    </Typography>
                    <Button color="inherit" startIcon={<VpnKeyIcon />} onClick={() => {
                        history.push('/login')
                    }}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}