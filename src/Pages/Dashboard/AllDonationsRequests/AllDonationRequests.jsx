import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AllDonationRequests = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    // console.log(user);

    useEffect(() => {
        // Make sure to use the correct parameter name in the fetch URL
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserData(data);

            })
    }, [user.email, setUserData]);


    // ----------------get all donation requests------------------
    const { isPending, error, data: requests = [], refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests');
            return res.data;
        }
    })

    if (isPending) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }
    // console.log(requests);
    // ------------------for user status check-----------
    if (!userData) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>;
    }

    console.log(userData);


    // -------------------------------------------------------------

    // delete donation request
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/myRequest/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }





    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Recipient Name</th>
                        <th>Recipient Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Donar Info</th>
                        {
                            userData?.role === "volunteer" ? <>
                                <th>Update Status</th>
                            </> : <>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>View</th>
                            </>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        requests.map((request, index) => <tr key={request._id}>
                            <th>{index + 1}</th>
                            <td>{request.recipientName}</td>
                            <td>{request.upazila}, {request.district}</td>
                            <td>{request.date}</td>
                            <td>{request.time}</td>
                            <td>{request.donationStatus}</td>
                            <td>{request.donarName} <br /> {request.donarEmail}</td>

                            {
                                userData?.role === "volunteer" ? <>
                                    <td>
                                        <button className="btn">Update</button>
                                    </td>
                                </> : <>
                                    <td>
                                        <NavLink to={`/dashboard/updateDonationRequest/${request._id}`}><button className="btn btn-outline btn-warning">Edit</button></NavLink>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(request._id)} className="btn btn-outline btn-error">Delete</button>
                                    </td>
                                    <td>
                                        <NavLink to={`/dashboard/viewDonationDetails/${request._id}`}><button className="btn btn-outline btn-info">View</button></NavLink>
                                    </td>
                                </>
                            }

                        </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AllDonationRequests;