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

export default function ClasseDocenteClasse() {
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
                console.log("cos è sta roba", response);
                setData(response.data['progetti'][0]['alunni']);
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
                            Classe
                        </TableCell>
                        <TableCell scope="col" component="th">
                            Nome
                        </TableCell>
                        <TableCell scope="col" component="th">
                            Cognome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ iduser, nome, cognome, idclasse, ...rest }, index) => (
                        <TableRow key={index}>
                            <TableCell scope="row">
                                {idclasse} 
                            </TableCell>
                            <TableCell scope="row">
                                {nome}
                            </TableCell>
                            <TableCell scope="row">
                                {cognome}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
