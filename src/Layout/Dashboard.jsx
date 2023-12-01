import { NavLink, Outlet } from "react-router-dom";
import { IoPeople, IoPerson, IoHome } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdManageSearch, MdOutlineManageAccounts, MdBloodtype } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {

    // ----------for admin, donor, volunter check ------------
    const { user } = useContext(AuthContext);
    // console.log(user.email);
    const [userData, setUserData] = useState();


    useEffect(() => {
        // Make sure to use the correct parameter name in the fetch URL
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserData(data);

            })
    }, [user.email, setUserData]);

    // ----------------------loading problem fix by this------------------------------
    if (!userData) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>;
    }

    // console.log(userData);

    // -----------------------------------------------------
    // const isAdmin = true;

    return (
        <div className="flex flex-col md:flex-row md:mt-10">
            <div className="w-auto p-0 lg:p-6 min-h-full lg:min-h-screen bg-slate-800 ">
                <ul className="menu space-y-5">
                    <li className="font-bold"><NavLink to='/'><IoHome className="text-2xl"></IoHome>Home</NavLink></li>
                    <li className="font-bold"><NavLink to='/dashboard/profile'><IoPerson className="text-2xl"></IoPerson>Profile</NavLink></li>
                    <div className="divider divider-info"></div>

                    {
                        userData?.role === 'admin'  ? <>
                            {/* admin */}
                            <li className="font-bold"><NavLink to='/dashboard/allUsers'><IoPeople className="text-2xl"></IoPeople>All Users</NavLink></li>
                            {/* admin + volunter */}
                            <li className="font-bold"><NavLink to='/dashboard/allDonationRequests'><FaHandshakeSimple className="text-2xl"></FaHandshakeSimple>All Blood Donation Request</NavLink></li>
                            <li className="font-bold"><NavLink to='/dashboard/content-management'><MdManageSearch className="text-2xl"></MdManageSearch>Content Management</NavLink></li>
                        </> : <>

                            {/* Donor */}
                            <li className="font-bold"><NavLink to='/dashboard/myDonationRequests'><MdOutlineManageAccounts className="text-2xl"></MdOutlineManageAccounts>My Donation Requests</NavLink></li>
                            <li className="font-bold"><NavLink to='/dashboard/createDonationRequest'><MdBloodtype className="text-2xl"></MdBloodtype>Create Donation Request</NavLink></li>

                        </>
                    }




                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;