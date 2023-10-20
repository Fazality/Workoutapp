import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from "./containers/Layout";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import Dashboard from "./containers/Dashboard";
import Missing from "./containers/Missing";
import RequireAuth from "./components/RequireAuth";
import AdminPage from "./containers/AdminPage";
import OtherPage from "./containers/OtherPage";
import FAQPage from "./containers/FAQPage";
import Browse from "./containers/BrowsePage";
import ProfilePage from "./containers/ProfilePage";
import WorkoutPage from './containers/WorkoutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        <Route element={<RequireAuth allowedRoles={[1, 2, 3]}/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/workout" element={<WorkoutPage />} />

        </Route>
        <Route element={<RequireAuth allowedRoles={[2, 3]}/>}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  );
}