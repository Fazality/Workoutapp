// you need to install the following dependencies:
//npm install @mui/x-date-pickers
//npm install date-fns

import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {Accordion, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Card, CardContent } from "@mui/material/";
import NavigationBar from "../navigationBar";
import { createTheme } from "@mui/material/styles";
import enGB from 'date-fns/locale/en-GB'
import dayjs from 'dayjs';
import {useEffect} from "react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProfilePage() {
  const [showWorkoutInfo, setShowWorkoutInfo] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [workoutData, setWorkoutData] = React.useState({});

  const handleDateClick = (date) => {
    setSelectedDate(dayjs(date).format('YYYY-MM-DD'))
  }

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate]);

  return (
    <>
      <ThemeProvider theme={defaultTheme} />
      <CssBaseline />
      <NavigationBar></NavigationBar>
      <main style={{ display: "flex", marginTop: "5%" }}>
        <div style={{ width: "50%", paddingLeft: "1rem" }}>
          {/* Calendar component */}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <DateCalendar onChange={handleDateClick} />
          </LocalizationProvider>
        </div>

        <div style={{ flex: 1 }}>
          <Card
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent style={{ flex: 1 }}>
              <Typography variant="h5">Workout Information</Typography>
              <div id="workout-info">
                <Typography>
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
