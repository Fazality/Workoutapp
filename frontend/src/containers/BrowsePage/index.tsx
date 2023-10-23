import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import ExerciseCard from './ExerciseCard';

import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import NavigationBar from "../navigationBar";


const defaultTheme = createTheme();

export default function Exercises()
{

    const [nodes, setNodes] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllExercises();
    }, []);

    const getAllExercises = () => {
      fetch("http://localhost:4001/api/exercise", {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
      })
      .then(response => {
        if (!response.ok) { throw new Error(response.statusText) }
        return response.json();
      })
      .then(data => {
        setNodes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    if (isLoading) { return <div className="App">Loading...</div>; }
    return (
        <>
            <Album allExercises={nodes}></Album>
        </>
    )

}


function DifficultyFilter(props : {onFilter})
{
    const [difficulty, setDifficulty] = useState(0)
    function handleChange(a, choice) {
        setDifficulty(choice.props.value)
        props.onFilter(choice.props.value)
    }

    return(

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Intermediate</MenuItem>
                    <MenuItem value={3}>Advanced</MenuItem>
                </Select>
            </FormControl>

    )
}

function Album(allExercises) {

    let cards = [];
    const [exerciseCatalog, setExerciseCatalog] = useState(allExercises.allExercises)
    const [catalog, setCatalog] = useState(exerciseCatalog);

    for (let i = 0; i < catalog.length; i++)
    {
        cards.push(i) /*This tells us how many "cards" there should be on the page *This number is equal to the amount of exercises*/
    }
    function changeCatalog(newCatalog)
    {
        cards = []
        for (let i = 0; i < newCatalog.length; i++)
        {
            cards.push(i) /*This tells us how many "cards" there should be on the page *This number is equal to the amount of exercises*/
        }
        setCatalog(newCatalog)
    }
    function handleFilter(difficultyLevel) {
        let filteredCatalog = [];
        if (difficultyLevel == 0)
        {
            filteredCatalog = exerciseCatalog
        }
        else {
            for (let i = 0; i < exerciseCatalog.length; i++) {
                if (exerciseCatalog[i].difficulty == difficultyLevel) {
                    filteredCatalog.push(exerciseCatalog[i])
                }
            }
        }
        changeCatalog(filteredCatalog)
    }

    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <NavigationBar />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Exercises
              </Typography>

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              ></Stack>
            </Container>
          </Box>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <DifficultyFilter onFilter={handleFilter} />
              </Grid>
            </Grid>
          </Container>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {catalog.map((exercise, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <ExerciseCard
                    id={exercise.ID}
                    name={exercise.name}
                    description={exercise.description}
                    difficulty={exercise.difficulty}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom></Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          ></Typography>
        </Box>
      </ThemeProvider>
    );
}