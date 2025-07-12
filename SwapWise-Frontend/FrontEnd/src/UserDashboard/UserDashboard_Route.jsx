
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";
import UserDashboard from "./UserDashboard.jsx";
import Home from "../User_Based_Login/Home.jsx";
import ErrorPage from "../CommonPage/Error_Page.jsx";
import ManageSkills from "./Pages/ManageSkills.jsx";
import Profile from "./Pages/Profile.jsx";

export const UserDashboard_Route = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Static token logic: Skip token validation for now
        const token = "static-token"; // Static token for testing purposes
        if (!token) {
            navigate("/userlogin"); // Redirect to login if no token
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/ManageSkills" element={<ManageSkills />} />
            <Route path="/Profile" element={<Profile />} />


        </Routes>
    );
};

export default UserDashboard_Route;