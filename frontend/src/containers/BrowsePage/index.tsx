import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import Easy from '../../assets/Easy.png';
import Medium from '../../assets/Medium.png';
import Hard from '../../assets/Hard.png';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import NavigationBar from "../navigationBar";


/*I get some errors in this file, but it seems to work fine*/


// TODO remove, this demo shouldn't need to reset the theme.
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
            headers: {
                "Content-type": "text/html; charset=UTF-8"
            }
        })
            .then(async (response) =>
            {
                setNodes(await response.json());
                setLoading(false);
            });
    }

    if (isLoading)
    {
        return <div className="App">Loading...</div>;
    }
    return (
        <>
            <Album allExercises={nodes}></Album>
        </>
    )

}

function Difficulty(difficulty)
{
    let boxStyle = {width: '25%', position: 'relative', left:'10%', top: '5%'};

    if (difficulty.difficulty == 3) {
        return (
            <Box sx={boxStyle}>
                <img src={Hard} style={{width:'100%'}} alt={'hard'}></img>
            </Box>);
    }
    if (difficulty.difficulty == 2) {
        return (
            <Box sx={boxStyle}>
                <img src={Medium} style={{width:'100%'}} alt={'medium'}></img>
            </Box>);
    }
    else
    {
        return (
            <Box sx={boxStyle}>
                <img src={Easy} style={{width:'100%'}} alt={'easy'}></img>
            </Box>);
    }
}

function DifficultyFilter(props : {onFilter})
{
    const [difficulty, setDifficulty] = useState(0)
    function handleChange(a, choice) {
        setDifficulty(choice.props.value)
        console.log(choice.props.value)
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

    console.log(allExercises)
    let cards = [];
    const [catalog, setCatalog] = useState(allExercises.allExercises);

    for (let i = 0; i < catalog.length; i++)
    {
        cards.push(i) /*This tells us how many "cards" there should be on the page
                      *This number is equal to the amount of exercises*/
    }
    console.log(cards.length)

    function changeCatalog(newCatalog)
    {
        cards = []

        for (let i = 0; i < newCatalog.length; i++)
        {
            cards.push(i) /*This tells us how many "cards" there should be on the page
                      *This number is equal to the amount of exercises*/
        }

        setCatalog(newCatalog)
    }

    function getAllExercises(){
        fetch("http://localhost:4001/api/exercise", {
            method: "GET",
            headers: {
                "Content-type": "text/html; charset=UTF-8"
            }
        })
            .then(async (response) =>
            {
                changeCatalog(console.log(response));
            });
    }

    function handleFilter(difficultyLevel)
    {
        console.log("HANDLEFILTER");
        let filteredCatalog = [];

        if (difficultyLevel == 0)
        {
            getAllExercises()
        }

        else {
            for (let i = 0; i < catalog.length; i++) {
                if (catalog[i].difficulty == difficultyLevel) {
                    filteredCatalog.push(catalog[i])
                }
            }
            changeCatalog(filteredCatalog)
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <NavigationBar>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Xperta Workout Planner
                    </Typography>
                </Toolbar>
            </NavigationBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
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
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            By signing up now, you can access a huge catalog of
                            excercises.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" href="signup">Sign up now</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <DifficultyFilter onFilter={handleFilter}/>
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {catalog[card].name}
                                        </Typography>
                                        <Typography>
                                            {catalog[card].description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                        <Difficulty difficulty={catalog[card].difficulty}></Difficulty>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>

                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >

                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}