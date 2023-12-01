import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import AllDonationRequests from "../Pages/Dashboard/AllDonationsRequests/AllDonationRequests";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'searchDonor',
                element: <SearchDonor></SearchDonor>
            },
            {
                path: 'registration',
                element: <Registration></Registration>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'updateProfile/:id',
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
            },

            // admin routes
            {
                path: 'allUsers',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: 'allDonationRequests',
                element: <AllDonationRequests></AllDonationRequests>
            },

            // donor
            {
                path: 'myDonationRequests',
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: 'createDonationRequest',
                element: <CreateDonationRequest></CreateDonationRequest>
            }
        ]
    }
]);

