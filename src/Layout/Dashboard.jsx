import { NavLink, Outlet } from "react-router-dom";
import { IoPeople, IoPerson, IoHome } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdManageSearch, MdOutlineManageAccounts, MdBloodtype } from "react-icons/md";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row md:mt-10">
            <div className="w-auto p-0 lg:p-6 min-h-screen bg-slate-800 ">
                <ul className="menu space-y-5">
                    <li className="font-bold"><NavLink to='/'><IoHome className="text-2xl"></IoHome>Home</NavLink></li>
                    <li className="font-bold"><NavLink to='/dashboard/profile'><IoPerson className="text-2xl"></IoPerson>Profile</NavLink></li>
                    <div className="divider divider-info"></div>

                    {/* admin */}
                    <li className="font-bold"><NavLink to='/dashboard/all-users'><IoPeople className="text-2xl"></IoPeople>All Users</NavLink></li>
                    {/* admin + volunter */}
                    <li className="font-bold"><NavLink to='/dashboard/all-blood-donation-request'><FaHandshakeSimple className="text-2xl"></FaHandshakeSimple>All Blood Donation Request</NavLink></li>
                    <li className="font-bold"><NavLink to='/dashboard/content-management'><MdManageSearch className="text-2xl"></MdManageSearch>Content Management</NavLink></li>

                    {/* Donor */}
                    <li className="font-bold"><NavLink to='/dashboard/my-donation-requests'><MdOutlineManageAccounts className="text-2xl"></MdOutlineManageAccounts>My Donation Requests</NavLink></li>
                    <li className="font-bold"><NavLink to='/dashboard/create-donation-request'><MdBloodtype className="text-2xl"></MdBloodtype>Create Donation Request</NavLink></li>


                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;