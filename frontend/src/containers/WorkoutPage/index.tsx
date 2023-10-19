import React, {useState} from "react";
import Catalog from "./catalog";
import Grid from "@mui/material/Grid";
import NavigationBar from "../navigationBar";
import Typography from "@mui/material/Typography";
import Panel from "./panel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

export default function WorkoutPage()
{
    const [exercisesInWorkout, setExercisesInWorkout] = useState([])

    function testClick(args)
    {
        let arr = [...exercisesInWorkout];
        let value = args.target.id
        if (searchStringInArray(value, exercisesInWorkout) == -1)
        {
            arr.push(args.target.id)
            setExercisesInWorkout(arr)
        }
        else
        {
            console.log("Already in workout!")
        }

        console.log(exercisesInWorkout)
    }

    function removeExercise(args)
    {
        let index = parseInt(args.target.id)-1;
        let arr = []
        for(let i = 0; i < exercisesInWorkout.length; i++)
        {
            if(i != index){
                arr[i] = exercisesInWorkout[i]
            }
        }
        setExercisesInWorkout(arr)
    }

    return(
        <>
            <NavigationBar />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Catalog onClick={testClick}></Catalog>
                </Grid>
                <Grid xs={6}>

                    <Box sx={{border:'hidden', marginTop : '10%'}}>
                        <TextField
                            name="WorkoutName"
                            required
                            fullWidth
                            id="WorkoutName"
                            label="Workout Name"
                            autoFocus
                            /*onChange=*/
                        />
                        <Box sx={{marginTop:'3%', borderRadius:'5px', boxShadow:'2,1'}}>
                            <Panel addExercise={exercisesInWorkout} removeExercise={removeExercise}></Panel>
                        </Box>
                        <Grid container spacing={2} sx={{marginTop:'3%'}}>
                            <Grid item xs={4}>
                                <Button variant='contained'>Save Workout</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}