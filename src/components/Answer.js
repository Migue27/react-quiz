import React from "react";
import { Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
function Answer(props) {

    const classes = useStyles();


    return (
        <Button
            value={props.answer}

            className={classes.button}
            selected={props.selected}
            onClick={(event)=> props.handleClick(props.id)}
            color={props.selected ? "primary": "secondary"}
        >
            {props.answer}
        </Button>
        
    )
}

const useStyles = makeStyles(theme => ({
    button: {
        // color: props => props.selected ? "primary" : "secondary",
    }
}));

export default Answer;