
import useRequest from "../../../hooks/useRequest";

const MyDonationRequests = () => {

    const [myRequest, refetch, isPending, error] = useRequest();
    console.log(myRequest);

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

    // ----------------------------------------------------------------------------


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
                            <td>donar info</td>
                            <td>
                                <button className="btn">Edit</button>
                            </td>
                            <td>
                                <button className="btn">Delete</button>
                            </td>
                            <td>
                                <button className="btn">View</button>
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