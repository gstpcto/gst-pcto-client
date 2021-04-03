import React, { useEffect, useState } from 'react';
import { baseRoute } from '../ProvideAuth';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../ProvideAuth';
import ComponentProject from './ComponentProject';

export default function ProgettiWrapper() {
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
                console.log("progetti", response);
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
                {data.map(({ infoProgetto }, index) => {
                    const { nome, descrizione, id, linkValutazioni, annoScolastico } = infoProgetto;
                    return <ComponentProject key={index} props={infoProgetto} nome={nome} descrizione={descrizione} id={id} linkValutazioni={linkValutazioni} annoScolastico={annoScolastico} />;
                })}
        </>
    );
}
