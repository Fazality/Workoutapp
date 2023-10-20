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
        setNames([...props.addExercise]);
        setSd(names.length);
    };

    return (
        <div className="flow">
            {names.map((n, index) => (
                <PointPanel sd={sd} name={n} remove={props.removeExercise}/>
            ))}
        </div>
    );
};

export default TransportFlow;