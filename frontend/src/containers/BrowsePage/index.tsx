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
}