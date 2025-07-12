import { Routes, Route } from "react-router-dom";
import Home from "../User_Based_Login/Home.jsx";
import UserRegistration from "../User_Based_Login/UserRegistration.jsx";
import UserLogin from "../User_Based_Login/UserLogin.jsx";
import ErrorPage from "../CommonPage/Error_Page.jsx";
import UserDashboard_Route from "../UserDashboard/UserDashboard_Route.jsx";
// import SKillfinder from "../test/Skillfinder.jsx";
import Skillfinder from "../test/skillfinder.jsx"; // Ensure this path is correct
import SwapInboxPage from "../test/SwapInboxPage.jsx"; // Ensure this path is correct
import Hero from "../Home/Hero.jsx"; // Ensure this path is correct
export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorPage />} />

            <Route path="/userregistration" element={<UserRegistration />} />
            <Route path="/userlogin" element={<UserLogin />} />

            <Route path="/home" element={<Home />} />
            <Route path="/UserDashboard_Route/*" element={<UserDashboard_Route />} />

            <Route path="/Skillfinder" element={<Skillfinder />} />
            <Route path="/SwapInboxPage" element={<SwapInboxPage />} />

            <Route path="/Hero" element={<Hero />} />

        </Routes>
    );
}

export default AppRouter;