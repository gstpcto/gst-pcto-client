import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { baseRoute, useAuth } from '../../ProvideAuth'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

export default function Classi() {
    return (
        <>
            <Grid item xs={12}>
                <TableBella />
            </Grid>
        </>
    );
}



function TableBella() {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [select, setSelection] = useState([]);

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios
            .get(`${baseRoute}/classi/all`)
            .then(function (response) {
                console.log(response);
                const temp = [...response.data['data'].map(d => {
                    return {
                        id: d.id,
                        classe: d.classe,
                        sezione: d.sezione,
                        indirizzo: d.indirizzo,
                        cancella: <Button variant="contained" color="secondary">
                                        CANCELLA
                                    </Button>
                    }
                })]
                console.log("temp", temp);
                setData(temp);
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
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col" component="th">
                                ID
                            </TableCell>
                            <TableCell scope="col" component="th">
                                classe
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Sezione
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Indirizzo
                            </TableCell>
                            <TableCell scope="col" component="th">
                                Cancella Classe
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ id, classe, sezione, indirizzo, cancella }) =>
                            <TableRow key={id}>
                                <TableCell scope="row"  >{id}</TableCell>
                                <TableCell scope="row"  >{classe}</TableCell>
                                <TableCell scope="row"  >{sezione}</TableCell>
                                <TableCell scope="row"  >{indirizzo}</TableCell>
                                <TableCell scope="row"  >{cancella}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
}
