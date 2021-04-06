import React, { useEffect, useState } from 'react';
import { baseRoute } from '../ProvideAuth';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../ProvideAuth';
import ComponentClassiLevelTwo from './ComponentClassiLevelTwo';

export default function ClassiWrapper() {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setError(false);
        setLoading(true);
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/progetti/classiAlunni`, { params: { token: auth.token } });
        };

        fetchData()
            .then(function (response) {
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
        <>
            {data.map(({ classi }) =>
                classi.map(({ classe, sezione, idClasse, indirizzo }, index) => {
                    // returna ogni classe di quell'indirizzo su cui lavora
                    return <ComponentClassiLevelTwo key={index} classe={classe} sezione={sezione} idClasse={idClasse} indirizzo={indirizzo} />;
                })
            )}
        </>
    );
}
