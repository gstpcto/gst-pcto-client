import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { baseRoute, useAuth } from "../../ProvideAuth";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Form, Field } from "react-final-form";
import { Select, TextField } from "final-form-material-ui";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    modifyButton: {
        backgroundColor: green[500],
        color: "white",
    },
    modifyButtonHover: {
        "&:hover": {
        backgroundColor: green[800],
        color: "white",
        },
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "100%",
    },
    paperContainer: {
        padding: theme.spacing(2),
    },
    boxContainer: {
        width: "100%",
    },
    modal: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
    },
}));





export default function Studenti(){
    const auth = useAuth();
    const classes = useStyles();
    const [reloader, setReloader] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async() =>{
        axios.get(`${baseRoute}/studenti/all`, {params: {token: auth.token}}).
        then(res =>{
            console.log(res.data.data);
            if(res.data.data===undefined){
                console.error(res.data);
            }
            else{
                const temp = [...res.data.data.map(obj =>{
                    return {
                        id: obj.id,
                        email: obj.email,
                        nome: `${obj.nome} ${obj.cognome}`
                    };
                })]
                console.log("temp", temp);
                setData(temp);
            }
        }).then(()=>{setLoading(false)});
    }



    useEffect(()=>{
        fetchData()
        
    }, [reloader])

    return isLoading? <CircularProgress /> : (
        <>
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell scope="col" component="th">
                    ID
                    </TableCell>
                    <TableCell scope="col" component="th">
                    classe
                    </TableCell>
                    <TableCell scope="col" component="th">
                    Sezione
                    </TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {data.map(
                    ({ id, nome, email}) => (
                    <TableRow key={id}>
                        <TableCell scope="row">{id}</TableCell>
                        <TableCell scope="row">{nome}</TableCell>
                        <TableCell scope="row">{email}</TableCell>
                    </TableRow>
                    )
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}