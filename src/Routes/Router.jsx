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
import UpdateDonationRequest from "../Pages/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import ViewDonationDetails from "../Pages/Dashboard/ViewDonationDetails/ViewDonationDetails";
import DonationRequests from "../Pages/Dashboard/DonationRequests/DonationRequests";
import Welcome from "../Pages/Dashboard/Welcome/Welcome";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/AddBlog/AddBlog";
import Blogs from "../Pages/Blogs/Blogs";
import Funding from "../Pages/Funding/Funding";

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
            },
            {
                path: 'donationRequests',
                element: <DonationRequests></DonationRequests>
            },
            {
                path: 'blogs',
                element: <Blogs></Blogs>
            },
            {
                path: 'funding',
                element: <PrivateRoute><Funding></Funding></PrivateRoute>
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
                path: 'welcome',
                element: <Welcome></Welcome>
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
            {
                path: 'updateDonationRequest/:id',
                element: <UpdateDonationRequest></UpdateDonationRequest>,
                loader: ({ params }) => fetch(`https://blood-donor-manage-server.vercel.app/requests/${params.id}`)
            },
            {
                path: 'viewDonationDetails/:id',
                element: <ViewDonationDetails></ViewDonationDetails>,
                loader: ({ params }) => fetch(`https://blood-donor-manage-server.vercel.app/requests/${params.id}`)
            },
            {
                path: 'contentManagement',
                element: <ContentManagement></ContentManagement>
            },
            {
                path: 'addBlog',
                element: <AddBlog></AddBlog>
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

