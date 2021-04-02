import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";



const ConfirmButton = ({onClick}) =>{

    const [click, setClick] = useState(0);
    const [textDisplay, setTextDisplay] = useState("CANCELLA")

    const handleClick = () =>{
        if(click==0){
            setClick(click+1);
            setTextDisplay("SEI SICURO?")
        }
        else if(click==1){
            onClick();
            setTextDisplay("CANCELLA");
            setClick(0)
        }
    }

    return (
      <Button variant="contained" color="secondary" onClick={handleClick}>
        {textDisplay}
      </Button>
    );
}

export default ConfirmButton;