import React, { useState } from 'react';
import { Button, Paper, Box, FormControl, InputAdornment, OutlinedInput, InputLabel, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { baseRoute, useAuth } from 'ProvideAuth';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paperContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    boxContainer: {
        width: '100%',
    },
}));

export default function ComponentChangePassword() {
    const classes = useStyles();
    const auth = useAuth()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleTextChange = (event) => {
        setPassword((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const submitHandler = async () => {
        console.log('hai clicato il boton pass', password);
        if (password.newPassword !== password.confirmPassword) {
            setNewPasswordError(true);
        }else{
            if (password.oldPassword === "" || password.newPassword === "") {
                if (password.oldPassword === "") setOldPasswordError(true);
                if (password.newPassword === "") setNewPasswordError(true)
            }else{
                await axios.put(`${baseRoute}/resetPassword`, {
                    token: auth.token,
                    oldPass: password.oldPassword,
                    newPass: password.newPassword
                }).then(res => {
                    console.log(res);
                }).then(()=>{
                    setNewPasswordError(false);
                    setOldPasswordError(false);
                })
            }
        }


        
        setPassword({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Paper className={classes.paperContainer}>
            <Box className={classes.boxContainer}>
                <Typography variant="h6" component="h1">
                    Cambia Password
                </Typography>
                <FormControl fullWidth variant="outlined" error={oldPasswordError} className={classes.formControl}>
                    <InputLabel>Vecchia Password</InputLabel>
                    <OutlinedInput
                        id="oldPassword"
                        type={showOldPassword ? 'text' : 'password'}
                        onChange={handleTextChange}
                        value={password.oldPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowOldPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Vecchia Password"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" error={newPasswordError} className={classes.formControl}>
                    <InputLabel>Nuova Password</InputLabel>
                    <OutlinedInput
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        onChange={handleTextChange}
                        value={password.newPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowNewPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Nuova Password"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" error={newPasswordError} className={classes.formControl}>
                    <InputLabel>Conferma Password</InputLabel>
                    <OutlinedInput id="confirmPassword" type={showNewPassword ? 'text' : 'password'} onChange={handleTextChange} value={password.confirmPassword} label="Conferma Password" />
                </FormControl>
            </Box>

            <Box className={classes.boxContainer}>
                <Button variant="contained" color="secondary" fullWidth onClick={submitHandler}>
                    Cambia Password
                </Button>
            </Box>
        </Paper>
    );
}
