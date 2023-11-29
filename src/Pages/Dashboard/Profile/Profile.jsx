import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { NavLink } from "react-router-dom";


const Profile = () => {

    const { user } = useContext(AuthContext);
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
    //---------------------------------------------------------------------------------

    console.log(userData);
    const { name, email, blodGroup, upazila, district, _id } = userData;

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 md:gap-10 mb-5">
            {/* image */}
            <div>
                <img className="max-w-sm rounded-md" src={userData.photoURL} alt="" />
            </div>

            <div>
                <div className="text-lg mb-5 space-y-3">
                    <h1>Name: {name}</h1>
                    <p>Email: {email}</p>
                    <p>Blood Group: {blodGroup}</p>
                    <p>Address: {upazila} , {district}</p>
                </div>
                <NavLink to={`/dashboard/updateProfile/${_id}`} className="btn btn-outline btn-info">Update</NavLink>
                {/* <NavLink to='/dashboard/updateProfile' className="btn">Update</NavLink> */}
            </div>
        </div>
    );
};

export default Profile;