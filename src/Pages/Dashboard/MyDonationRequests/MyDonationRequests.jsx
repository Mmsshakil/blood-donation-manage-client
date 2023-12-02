
import Swal from "sweetalert2";
import useRequest from "../../../hooks/useRequest";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";

const MyDonationRequests = () => {

    const [myRequest, refetch, isPending, error] = useRequest();
    console.log(myRequest);
    const axiosSecure = useAxiosSecure();

    // ----------------get all donation requests from one user------------------

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

    // const { recipientName, fullAddress, upazila, district, date, time, donationStatus } = requests;
    // -----------------------------------------------------------

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
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        myRequest.map((request, index) => <tr key={request._id}>
                            <th>{index + 1}</th>
                            <td>{request.recipientName}</td>
                            <td>{request.upazila}, {request.district}</td>
                            <td>{request.date}</td>
                            <td>{request.time}</td>
                            <td>{request.donationStatus}</td>
                            <td>{request.donarName} <br /> {request.donarEmail}</td>
                            <td>
                                <NavLink to={`/dashboard/updateDonationRequest/${request._id}`}><button className="btn btn-outline btn-warning">Edit</button></NavLink>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(request._id)} className="btn btn-outline btn-error">Delete</button>
                            </td>
                            <td>
                                <NavLink to={`/dashboard/viewDonationDetails/${request._id}`}><button className="btn btn-outline btn-info">View</button></NavLink>
                            </td>
                        </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyDonationRequests;