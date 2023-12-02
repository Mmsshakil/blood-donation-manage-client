import { NavLink } from "react-router-dom";
import logo from '../../../assets/logoOut.png'
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);


    const handleLogout = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {

                logOut()
                    .then(result => {
                        console.log('logout sucess', result);

                    })

                Swal.fire({
                    title: "Done!",
                    text: "Logout Successful",
                    icon: "success"
                });
            }
        });
    }

    const navOptions = <>
        <li><NavLink to='/donationRequests'>Donation Requests</NavLink></li>
        <li><NavLink>Blog</NavLink></li>
        {
            user ? <>
                <li><NavLink to='/dashboard/profile'>Dashboard</NavLink></li>
                <li><NavLink>Fundings</NavLink></li>
            </> : <>
                <li><NavLink to='/registration'>Registration</NavLink></li>
            </>
        }




    </>

    return (
        <>
            <div className="navbar  z-10 bg-opacity-30 bg-base-100 max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                            {navOptions}
                        </ul>
                    </div>
                    <NavLink to='/'> <img className="w-14" src={logo} alt="" /></NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <button onClick={handleLogout} className="btn">Log Out</button>
                        </> : <>
                            <NavLink to='/login'><button className="btn">Login</button></NavLink>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;