import React from "react";
import Badge from '@mui/material/Badge';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

interface WorkoutCalendarProps {
  onDateSelect: (date: Date | null) => void;
  plannedDates: string[];
}

function HighlightedDay(props: PickersDayProps<Date> & { plannedDates: string[] }) {
  const { plannedDates, day, ...other } = props;
  
 const localISOTime = new Date(day.getTime() - day.getTimezoneOffset() * 60000)
   .toISOString()
   .split("T")[0];

 const today = new Date();
 today.setHours(0, 0, 0, 0); // Reset time to ensure accurate date comparison

 const isSelected = plannedDates.includes(localISOTime);
 const isPast = day < today;

 let style = {};
  if (isSelected && isPast) {
    style = { backgroundColor: "#d9d9d9", borderRadius: "50%" }; // greyish for past selected days
  } else if (isSelected) {
    style = { backgroundColor: "#aee1e1", borderRadius: "50%" }; // blueish for upcoming selected days
  } else if (isPast) {
    style = { color: "#a0a0a0" }; // greyish color for text of past days
  }

  return (
    <PickersDay 
      {...other} 
      day={day} 
      style={style}
    />
  );
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ onDateSelect, plannedDates }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar 
        onChange={onDateSelect}
        slots={{
          day: HighlightedDay,
        }}
        slotProps={{
          day: { plannedDates, },
        }}
      />
    </LocalizationProvider>
  );
};

export default WorkoutCalendar;
