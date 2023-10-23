import { Outlet } from "react-router-dom";
import React from "react";

import { WorkoutProvider } from "../context/WorkoutContext";

const ContextLayout = () => {
    return (
        <WorkoutProvider>
            <Outlet />
        </WorkoutProvider>
    );
}

export default ContextLayout;