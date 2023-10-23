import React, {useState} from "react";
import Catalog from "./catalog";
import Grid from "@mui/material/Grid";
import NavigationBar from "../navigationBar";
import Typography from "@mui/material/Typography";
import Panel from "./panel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {json} from "react-router-dom";

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (str.ID == strArray[j].ID) return j;
    }
    return -1;
}

export default function WorkoutPage()
{
    const [exercisesInWorkout, setExercisesInWorkout] = useState([])
    const [workoutName, setWorkoutName] = useState("")
    const [requestData, setRequestData] = React.useState({
        WorkoutName:workoutName,
        UserID:'',
        WorkoutContents:
            [
            ]
    });
    const [successText, setSuccessText] = useState(["", ""])

    function prepareRequestData(args)
    {
        let x = (args.target.id).split(" ")
        let inputType = x[x.length-1]
        x.pop()
        let exerciseIndex = parseInt(x.join(" "))
        let value = args.target.value
        let data = JSON.parse(JSON.stringify(requestData));

        data.WorkoutContents[exerciseIndex][inputType] = parseInt(value);

        setRequestData(data)
    }

    function testClick(args)
    {
        let arr = [...exercisesInWorkout];
        let exercise = JSON.parse(args.target.getAttribute('exercise'))

        if (searchStringInArray(exercise, exercisesInWorkout) == -1)
        {
            arr.push(exercise)
            setExercisesInWorkout(arr)
            if (exercise.length != 0) {
                let data = JSON.parse(JSON.stringify(requestData));
                data.WorkoutContents.push({
                    ExerciseID: exercise.ID,
                    ExerciseName: exercise.name,
                    sets: -1,
                    reps: -1,
                    weight: -1.0,
                    minutes: '',
                    rank: exercisesInWorkout.length
                })
                setRequestData(data)
            }
        }
        else
        {
            console.log("Already in workout!")
        }

    }

    function postData()
    {
        if (workoutName != "") {
            requestData.WorkoutName = workoutName;
            console.log(requestData)
            fetch('http://localhost:4001/api/workout', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestData)
            }).then((res: Response) => {
                setExercisesInWorkout([])
                setSuccessText(["Workout Saved!", "green"])
            })
        }
        else
        {
            setSuccessText(["A workout needs a name!", "error"])
        }
    }

    function removeExercise(args)
    {
        let index = parseInt(args.target.id);
        let arr = [...exercisesInWorkout]
        arr.splice(index, 1);
        console.log("arr: " + arr.map((n) => {return n.name}))
        setExercisesInWorkout([...arr])
    }

    function updateWorkoutName(args)
    {
        setWorkoutName(args.target.value)
    }

    return(
        <>
            <NavigationBar />
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Catalog onClick={testClick}></Catalog>
                </Grid>
                <Grid item xs={6}>

                    <Box sx={{border:'hidden', marginTop : '10%'}}>
                        <TextField
                            name="WorkoutName"
                            required
                            fullWidth
                            id="WorkoutName"
                            label="Workout Name"
                            autoFocus
                            onChange={updateWorkoutName}
                        />
                        <Box sx={{marginTop:'3%', borderRadius:'5px', boxShadow:'2,1'}}>
                            <Panel addExercise={exercisesInWorkout} removeExercise={removeExercise} onData={prepareRequestData}></Panel>
                        </Box>
                        <Typography variant='subtitle1' color={successText[1]}>{successText[0]}</Typography   >
                            <Button variant='contained' onClick={postData} sx={{marginTop:'3%'}}>Save Workout</Button>

                    </Box>
                </Grid>
            </Grid>
            </Box>
        </>
    );
}