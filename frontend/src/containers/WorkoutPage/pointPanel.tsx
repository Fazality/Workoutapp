import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ExpandMore} from "@mui/icons-material";


const PointPanel = (props) => {
    const [expanded, setExpanded] = React.useState("");

    const handleChange = (panel) => (evt, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion
            key={'p' + props.sd}
            expanded={expanded === props.sd}
            onChange={handleChange(props.sd)}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                id="panel1bh-header"
                aria-controls="panel1bh-content"
            >
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>FYLLA I REPS, SETS, O SÅNT</Typography>
                <Button variant='contained' color='error' onClick={props.remove} id={props.sd}>Remove</Button>
            </AccordionDetails>
        </Accordion>
    );
};

export default PointPanel;
