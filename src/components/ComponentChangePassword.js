import React, { useState } from 'react';
import { Button, Paper, Box, FormControl, InputAdornment, OutlinedInput, InputLabel, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Paper className={classes.paperContainer}>
            <Box className={classes.boxContainer}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel>Vecchia Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={() => {
                            setPassword('password');
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Vecchia Password"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel>Nuova Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={() => {
                            setPassword('password');
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Nuova Password"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel>Conferma Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={() => {
                            setPassword('password');
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Conferma Password"
                    />
                </FormControl>
            </Box>

            <Box className={classes.boxContainer}>
                <Button variant="contained" color="secondary" fullWidth>
                    Cambia Password
                </Button>
            </Box>
        </Paper>
    );
}
