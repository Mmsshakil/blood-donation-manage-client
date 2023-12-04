import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ViewDonationDetails = () => {
    const { user } = useContext(AuthContext);
    const requestDetails = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(requestDetails);
    const { _id, requesterName, requesterEmail, recipientName, hospitalName, fullAddress, upazila, district, date, time, requestMessage, donationStatus, donarName, donarEmail } = requestDetails;

    const handleBloodDonate = () => {

        const updateInfo = {
            donarName: user.displayName,
            donarEmail: user.email,
            donationStatus: 'inprogress'
        }


        Swal.fire({
            title: "Donar Details",
            text: `Name:${user.displayName} Email:${user.email}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.put(`/donationConfirm/${_id}`, updateInfo)
                    .then(res => {
                        console.log('donation confirmed to the data base', res);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Done!",
                                text: "Your donattion confirmed",
                                icon: "success"
                            });
                            // window.location.reload();
                            navigate(location?.state ? location.state : '/dashboard/profile');
                        }
                    })

            }
        });
    }


    return (
        <div className="text-center">
            <div className="divider divider-success font-bold text-2xl px-5">Donation Request Details</div>
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow  card  rounded-box  text-left p-5 md:p-10 space-y-0">
                    <h1 className="text-lg font-bold ">Requester Details -</h1>
                    <p><span className="font-bold">Name : </span>{requesterName}</p>
                    <p><span className="font-bold">Email : </span>{requesterEmail}</p>
                    {/* donar details */}
                    {
                        requestDetails?.donationStatus === 'inprogress' || requestDetails?.donationStatus === 'done' ? <>
                            <h1 className="text-lg font-bold mb-5">Donar Details -</h1>
                            <p><span className="font-bold">Name : </span>{donarName}</p>
                            <p><span className="font-bold">Email : </span>{donarEmail}</p>
                        </> : <>

                        </>
                    }
                </div>
                <div className="divider lg:divider-horizontal divider-info"></div>
                <div className="grid flex-grow  card  rounded-box text-left p-5 md:p-10 space-y-2">
                    <h1 className="text-lg font-bold mb-5">Recipient Details -</h1>
                    <p><span className="font-bold">Name : </span>{recipientName}</p>
                    <p><span className="font-bold">Upazila : </span>{upazila}, <span className="font-bold">District : </span>{district} </p>
                    <p><span className="font-bold">Full Address : </span>{fullAddress}</p>
                    <p><span className="font-bold">Hospital Name : </span>{hospitalName}</p>
                    <p><span className="font-bold">Date : </span>{date}, <span className="font-bold">Time : </span>{time}</p>
                    <p><span className="font-bold">Request Message : </span>{requestMessage}</p>
                </div>
            </div>

            {
                 requestDetails?.donationStatus === 'done' ? <>
                    <button onClick={handleBloodDonate} className="btn btn-wide my-5 btn-outline btn-success" disabled>Donate</button>
                </> : <>
                    <button onClick={handleBloodDonate} className="btn btn-wide my-5 btn-outline btn-success">Donate</button>
                </>
            }


        </div>
    );
};

export default ViewDonationDetails;