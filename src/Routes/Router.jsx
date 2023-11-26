import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import SearchDonor from "../Pages/SearchDonor/SearchDonor";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: 'searchDonor',
                element: <SearchDonor></SearchDonor>
            }
        ]
    },
]);

