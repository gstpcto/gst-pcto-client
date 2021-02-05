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

export default function ComponentProjectsTable() {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await axios.get(`${baseRoute}/progetti/myProjects`, { params: { token: auth.token } });
                setData(response.data['data']);
                console.log("QUI CI SONO I PROGETTI", data);
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
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell scope="col" component="th">Progetti</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ Descrizione, Durata, Ente, ID, LinkValutazioni, Nome, Periodo, Valutazione }, index) => (
                        <TableRow key={index}>
                            <TableCell scope="row">
                                {Nome}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
