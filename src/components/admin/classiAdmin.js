import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {baseRoute, useAuth} from '../../ProvideAuth'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core';
import {DataGrid, GridToolbar} from '@material-ui/data-grid'

export default function Classi() {
    return (
        <>
            <Grid item xs={12}>
                <TableBella />
            </Grid>
        </>
    );
}


const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'classe', headerName: 'Classe', width: 150, type: "number" },
    { field: 'sezione', headerName: 'Sezione', width: 150 },
    {
        field: 'indirizzo',
        headerName: 'Indirizzo',
        width: 150,
    },
    {
        valueGetter: (params) =>
            `${params.getValue('classe') || ''} ${params.getValue('sezione') || ''}`,
    },
];


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
            <div style={{height: "70vh"}}>
                <DataGrid rows={data} columns={columns} pageSize={25}  checkboxSelection 
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    localeText={{
                        toolbarDensity: 'Size',
                        toolbarDensityLabel: 'Size',
                        toolbarDensityCompact: 'Small',
                        toolbarDensityStandard: 'Medium',
                        toolbarDensityComfortable: 'Large',
                    }}
                    onRowSelected={
                        (newSelection) => {
                            setSelection(newSelection.data);
                            console.log(select);
                        }
                    }
                />
            </div>
        );
}
