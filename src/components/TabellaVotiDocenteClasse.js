import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { baseRoute } from '../ProvideAuth';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../ProvideAuth';

export default function TabellaVotiDocenteClasse() {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios
            .get(`${baseRoute}/progetti/classiAlunni`, { params: { token: auth.token } })
            .then(function (response) {
                console.log(response);
                setData(response.data['progetti']);
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
                        <TableCell scope="col" component="th"></TableCell>
                        {data.map(({ infoProgetto, ...rest }, index) => (
                            <TableCell key={index} scope="col" component="th">
                                {infoProgetto['nome']}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ alunni } ) =>
                        alunni.map(({ nome, cognome, voto }, index) => (
                            <TableRow key={index}>
                                <TableCell scope="row"  >{`${nome} ${cognome}`}</TableCell>
                                <TableCell scope="row">{`${voto}`}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
