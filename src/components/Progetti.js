import React, { useEffect, useState } from 'react';
import { baseRoute } from 'ProvideAuth';
import { CircularProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from 'ProvideAuth';
import ComponentProject from 'components/ComponentProject';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Select, TextField } from 'final-form-material-ui';
import { FormControl, MenuItem, Paper } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from 'theme';
import genYears from 'fragments/genYears';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(4, 0, 6),
    },
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
}));

export default function ProgettiWrapper() {
    const classes = useStyles();
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setError(false);
        setLoading(true);
        const fetchData = async () => {
            return await axios.get(`${baseRoute}/progetti/classiAlunni`, { params: { token: auth.token } });
        };

        fetchData()
            .then(function (response) {
                console.log('progetti', response);
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
            {auth.user['livello'] === 4 ? (
                <>
                    <Modal open={open} onClose={handleModalClose} className={classes.modal}>
                        <AddProject />
                    </Modal>
                    <Container maxWidth="md" component="main" className={classes.heroContent}>
                        <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Progetti
                        </Typography>
                        <Box display="flex" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: theme.spacing(1) }}
                                width={{ xs: 'fullwidth', sm: 'auto' }}
                                onClick={() => {
                                    handleModalOpen();
                                }}
                            >
                                Aggiungi un Progetto
                            </Button>
                        </Box>
                    </Container>
                </>
            ) : (
                ''
            )}
            {data.map(({ infoProgetto }, index) => {
                const { nome, descrizione, id, linkValutazioni, annoScolastico } = infoProgetto;
                return <ComponentProject key={index} nome={nome} descrizione={descrizione} id={id} linkValutazioni={linkValutazioni} annoScolastico={annoScolastico} />;
            })}
        </>
    );
}

const AddProject = () => {
    const classes = useStyles();

    const onSubmit = async (data) => {
        console.log('form submitted');
    }

    const required = (value) => (value ? undefined : 'Required');

    return (
        <Paper className={classes.paperContainer}>
            <Typography variant="h6" component="h1">
                Informazioni Progetto
            </Typography>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    annoScolastico: genYears()[4],
                    startDate: new Date(Date.now()).toISOString().split('T')[0],
                    endDate: new Date(Date.now()).toISOString().split('T')[0],
                }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="nome" component={TextField} type="text" label="Nome" validate={required} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="descrizione" component={TextField} type="text" label="Descrizione" validate={required} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="durata" component={TextField} type="text" label="Durata in Ore" validate={required} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="ente" component={TextField} type="text" label="Ente" validate={required} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="annoScolastico" component={Select} type="text" label="Anno Scolastico" validate={required}>
                                {genYears().map((o, index) => (
                                    <MenuItem key={index} value={o}>
                                        {o}
                                    </MenuItem>
                                ))}
                            </Field>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="startDate" component={TextField} type="date" label="Data di Inizio" validate={required} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="endDate" component={TextField} type="date" label="Data di Fine" validate={required} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <Field fullWidth name="linkValutazioni" component={TextField} type="text" label="Link Valutazioni" />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                            Aggiungi Progetto
                        </Button>
                    </form>
                )}
            />
        </Paper>
    );
};
