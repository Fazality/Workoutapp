import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, ListItem, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ExpandMore} from "@mui/icons-material";
import Grid from "@mui/material/Grid";


const PointPanel = (props) => {
    const [expanded, setExpanded] = React.useState("");

    const handleChange = (panel) => (evt, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    if (props.typ == 0) {
        return (
            <Accordion
                key={'p' + props.sd}
                expanded={expanded === props.sd}
                onChange={handleChange(props.sd)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    id="panel1bh-header"
                    aria-controls="panel1bh-content"
                >
                    <Typography>{props.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <TextField id={props.sd + " minutes"} label="Minutes" variant="outlined" onChange={props.onInput}/>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField id={props.sd + " reps"} label="Repetitions" variant="outlined" onChange={props.onInput}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Button variant='contained' color='error' onClick={props.remove} id={props.sd}>Remove
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    }

    else
    {
        return (
            <Accordion
                key={'p' + props.sd}
                expanded={expanded === props.sd}
                onChange={handleChange(props.sd)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    id="panel1bh-header"
                    aria-controls="panel1bh-content"
                >
                    <Typography>{props.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <TextField id={props.sd + " sets"} label="Sets" variant="outlined" onChange={props.onInput}/>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField id={props.sd + " reps"} label="Repetitions" variant="outlined" onChange={props.onInput}/>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField id={props.sd + " weight"} label="Weight" variant="outlined" onChange={props.onInput}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Button variant='contained' color='error' onClick={props.remove} id={props.sd}>Remove
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    }
};

export default PointPanel;
