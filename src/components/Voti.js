import React, { useEffect, useState } from 'react';
import { baseRoute } from 'ProvideAuth';
import axios from 'axios';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import ComponentVoti from 'components/ComponentVoti';
import { useAuth } from 'ProvideAuth';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
    },
    fixedHeight: {
        height: 240,
    },
    boxContainer: {
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'auto',
        display: 'flex'
    },
    fixedWidth: {
        width: 150,
    },
}));

export default function VotiWrapper() {
    const auth = useAuth();
    console.log('dentro a voti', auth);
    console.log('capiamo', auth.token);
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios
            .get(`${baseRoute}/voti/voti`, { params: { token: auth.token } })
            .then(function (response) {
                console.log("voti", response);
                setData(response.data['data']);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });
        // eslint-disable-next-line
    }, []);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Typography variant="h6" component="h1">
                Voti
            </Typography>
            <Box className={classes.boxContainer} mx={1}>
                {data.map((d, index) => {
                    console.log("LI DATIIIIIIII", d);
                    return <ComponentVoti key={index} dati={d} />;
                })}
            </Box>
        </>
    );
}
