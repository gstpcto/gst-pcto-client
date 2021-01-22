import React, { useEffect, useState } from 'react';
import { baseRoute } from '../ProvideAuth';
import axios from 'axios';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import ComponentVoti from './ComponentVoti';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
    },
    fixedHeight: {
        height: 240,
    },
    paperContainer: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'auto',
    },
    markMargin: {
        margin: '0px 5px 0px 5px',
    },
    fixedWidth: {
        width: 150,
    },
}));

export default function VotiWrapper({ auth }) {
    console.log('dentro a voti', auth);
    console.log('capiamo', auth.token);
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await axios.get(`${baseRoute}/voti/voti`, { params: { token: auth.token } });
                setData(response.data['data']);
                console.log('stampo i voti');
                console.log(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Box className={classes.paperContainer} display="flex" flexDirection="row">
            {data.map(({ Nome, Data, Descrizione, Valutazione }, index) => {
                return (
                    <Box className={classes.markMargin}>
                        <ComponentVoti key={index} Nome={Nome} Data={Data} Descrizione={Descrizione} Valutazione={Valutazione} />
                    </Box>
                );
            })}
        </Box>
    );
}
