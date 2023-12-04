import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllDonationRequests = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const axiosPublic = useAxiosPublic();
    const done = "done";
    const cancel = "canceled";
    // console.log(user);

    useEffect(() => {
        // Make sure to use the correct parameter name in the fetch URL
        fetch(`https://blood-donor-manage-server.vercel.app/users/${user.email}`)
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

    // update donation status done or cancel
    const handleStatus = (id, status) => {
        console.log(id);
        const updateInfo = {
            donationStatus: status
        }

        axiosPublic.put(`/statusUpdate/${id}`, updateInfo)
            .then(res => {
                console.log('request status updated to the data base', res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation Request Done Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();

                }
            })

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
                        <th>Cancel / Done</th>
                        <th>Donar Info</th>
                        {
                            userData?.role === "volunteer" ? <>

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
                            {
                                request?.donationStatus === "inprogress" ? <>
                                    <td> <div className="flex flex-col gap-1 items-center">
                                        <button onClick={() => handleStatus(request._id, done)} className="btn btn-sm btn-success">Done</button>
                                        <button onClick={() => handleStatus(request._id, cancel)} className="btn btn-sm btn-error">Cancel</button>
                                    </div> </td>
                                </> : <>
                                    <td>. . . . .</td>
                                </>
                            }

                            {
                                request?.donationStatus === "inprogress" ? <>
                                    <td>{request.donarName} <br /> {request.donarEmail}</td>
                                </> : <>
                                    <td>. . . . . </td>
                                </>
                            }

                            {
                                userData?.role === "volunteer" ? <>

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