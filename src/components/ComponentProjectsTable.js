import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { baseRoute } from 'ProvideAuth';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from 'ProvideAuth';

export default function ComponentProjectsTable() {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios
            .get(`${baseRoute}/progetti/myProjects`, { params: { token: auth.token } })
            .then(function (response) {
                console.log("project table ",response);
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
                Progetti
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell fontWeight="fontWeightBold" scope="col" component="th">
                                Progetto
                            </TableCell>
                            <TableCell fontWeight="fontWeightBold" scope="col" component="th">
                                Descrizione
                            </TableCell>
                            <TableCell fontWeight="fontWeightBold" scope="col" component="th">
                                Ente
                            </TableCell>
                            <TableCell fontWeight="fontWeightBold" scope="col" component="th">
                                inizio
                            </TableCell>
                            <TableCell fontWeight="fontWeightBold" scope="col" component="th">
                                fine
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ descrizione, ente, id, linkValutazioni, nome, startDate, endDate, valutazione }, index) => (
                            <TableRow key={index}>
                                <TableCell scope="row">{nome}</TableCell>
                                <TableCell scope="row">{descrizione}</TableCell>
                                <TableCell scope="row">{ente}</TableCell>
                                <TableCell scope="row">{startDate.split('T')[0]}</TableCell>
                                <TableCell scope="row">{endDate.split('T')[0]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
