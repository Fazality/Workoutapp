import NavigationBar from "../navigationBar";
import * as React from "react";
import Exercises from "./ExerciseCatalog";
import Typography from "@mui/material/Typography";

export default function BrowsePage(){
    return(
        <>
            <NavigationBar></NavigationBar>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Exercises
            </Typography>
            <Exercises></Exercises>
        </>
    )
<<<<<<< HEAD
=======

}

function Difficulty(difficulty)
{
    let boxStyle = {width: '25%', position: 'relative', left:'20%', top: '0%'};

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
        cards.push(i) /*This tells us how many "cards" there should be on the page
                      *This number is equal to the amount of exercises*/
    }

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


    function handleFilter(difficultyLevel)
    {
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

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >

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
                                            <Typography gutterBottom color='primary' sx={{position:'relative', left:'15%'}}>DIFFICULTY: </Typography>
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
>>>>>>> origin/dev
}