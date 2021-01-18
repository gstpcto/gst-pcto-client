import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Button from '@material-ui/core/Button'
import MenuItems from '../components/MenuItems';
import Copyright from '../components/Copyright';
import { baseroute } from '../ProvideAuth';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    bold: {
        fontWeight: 500,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));


export default function VotiWrapper ({auth}) {
    console.log("dentro a voti", auth);
    console.log("capiamo", auth.token);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false)
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await axios.get(`${baseroute}/voti/voti`, {params: {token: auth.token}});
                setData(response.data["data"]);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData()
    }, []);
    
    
    return(
        isLoading?
            <div> Loading ...</div >
        :  
            <div>{data[0].Valutazione}</div>   
    );
}