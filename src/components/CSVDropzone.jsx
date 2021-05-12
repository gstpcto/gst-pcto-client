import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useAuth } from 'ProvideAuth';
import { SuccessAlert } from 'components/snackbars';
import { ErrorAlert } from 'components/snackbars';

const useStyles = makeStyles((theme) => ({
    uploader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploaderContainerPreview: {
        margin: 0,
        width: 'auto',
        marginTop: theme.spacing(1),
    },
}));

export default function CSVDropzone({isopen, opener, closer, reloader, route, toaster}) {
    const classes = useStyles();
    const auth = useAuth();
    const resetter = async () => {
        toaster(null);
    };
    const handleSubmitCaricaCSV = async (files) => {
        console.log('OLLARE I FILESSSSSSSSSSSSSSSSS');
        console.log(files[0]);
        const formData = new FormData();
        formData.append('token', auth.token);
        formData.append('data', files[0]);

        await axios
            .post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((r) => {
                reloader(Math.random());
                resetter().then(() => {
                    toaster(<SuccessAlert message={r.data.message} />)
                })
            })
            .catch((err) => {
                resetter().then(() => {
                    toaster(<ErrorAlert message={err.response.data.cause} />)
                })
            });

        closer();
    };

    const handleCaricaCSVPreviewIcon = (fileObject) => {
        const { type } = fileObject.file;
        switch (type) {
            default:
                return <DescriptionIcon />;
        }
    };

    const handleCaricaCSVFilesLimitExceed = (filesLimit) => {
        return `Non puoi caricare altri file [MAX: ${filesLimit}]`;
    };

    const handleCaricaCSVFileUploadSuccess = (fileName) => {
        return `Hai caricato ${fileName} con successo!`;
    };
    const handleCaricaCSVFileRemoved = (fileName) => {
        return `${fileName} è stato rimosso.`;
    };

    return (
        <>
            <DropzoneDialog
                open={isopen}
                onSave={handleSubmitCaricaCSV}
                acceptedFiles={['.csv', 'text/csv']}
                clearOnUnmount={true}
                filesLimit={1}
                dropzoneClass={classes.uploader}
                showPreviews={true}
                maxFileSize={50000000}
                onClose={closer}
                getPreviewIcon={handleCaricaCSVPreviewIcon}
                dropzoneText={'Clicca o trascina per caricare un file .csv'}
                getFileLimitExceedMessage={handleCaricaCSVFilesLimitExceed}
                getFileAddedMessage={handleCaricaCSVFileUploadSuccess}
                getFileRemovedMessage={handleCaricaCSVFileRemoved}
                cancelButtonText={'Annulla'}
                submitButtonText={'Carica'}
                dialogTitle={'Carica file:'}
                previewText={'File caricati:'}
                previewGridClasses={{
                    container: classes.uploaderContainerPreview,
                }}
            />
        </>
    );
}