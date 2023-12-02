import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DonationRequests = () => {

    const axiosSecure = useAxiosSecure();

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
    console.log(requests);
    // -------------------------------------------------------------

    // const pendingRequests = requests.filter(request => request.donationStatus === 'pending');



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
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        requests.filter(request => request.donationStatus === 'pending').map((request, index) => <tr key={request._id}>
                            <th>{index + 1}</th>
                            <td>{request.recipientName}</td>
                            <td>{request.upazila}, {request.district}</td>
                            <td>{request.date}</td>
                            <td>{request.time}</td>
                            <td>{request.donationStatus}</td>
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

export default DonationRequests;