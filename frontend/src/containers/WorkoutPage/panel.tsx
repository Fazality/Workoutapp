import React, {useEffect} from "react";

import PointPanel from "./pointPanel";
import {makeStyles} from "@mui/material";
import Button from "@mui/material/Button";

const TransportFlow = (props) => {

    const [sd, setSd] = React.useState(0);
    const [names, setNames] = React.useState([])




    useEffect(() => {
        addPoint()
    }, [props.addExercise]);

    const addPoint = () => {
        let ex = props.addExercise

        setNames([...ex]);
        setSd(names.length);

    };


    return (
        <div className="flow">
            {names.map((n, index, array) => (
                <PointPanel key={index} sd={index} name={n.name} remove={props.removeExercise} typ={n.type} onInput={props.onData}/>
            ))}
        </div>
    );
};

export default TransportFlow;