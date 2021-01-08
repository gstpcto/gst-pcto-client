import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../ProvideAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography edge="start" variant="h6" className={classes.title}>
                        GSTPCTO
                    </Typography>
                    {auth.isAuthenticated() ? 
                        <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => {
                            history.push('/dashboard')
                        }}>Dashboard</Button>
                    :
                        <Button color="inherit" startIcon={<VpnKeyIcon />} onClick={() => {
                            history.push('/login')
                        }}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}