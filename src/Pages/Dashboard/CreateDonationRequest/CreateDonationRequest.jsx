import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useDistrict from "../../../hooks/useDistrict";
import useUpazila from "../../../hooks/useUpazila";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {

    const { user } = useContext(AuthContext);
    // console.log(user);
    const [districts] = useDistrict();
    const [upazilas] = useUpazila();
    // console.log(districts);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

    // ----------------------------------------------
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

    console.log(userData);
    //---------------------------------------------------------------------------------





    const onSubmit = (data) => {
        // console.log(data);

        const donationRequestInfo = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: data.recipientName,
            district: data.district,
            upazila: data.upazila,
            hospitalName: data.hospitalName,
            fullAddress: data.fullAddress,
            date: data.date,
            time: data.time,
            requestMessage: data.requestMessage,
            donationStatus: 'pending'
        };
        console.log(donationRequestInfo);

        axiosPublic.post('/donationRequests', donationRequestInfo)
            .then(res => {
                console.log('donation request added to the data base');
                if (res.data.insertedId) {
                    console.log(res);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // window.location.reload();
                }
            })


    };

    return (
        <div>
            <div className="text-center text-base md:text-xl mt-10 md:mt-0">
                <h1><span className="text-green-600 font-bold">Requester Name:</span> {user.displayName}</h1>
                <h1><span className="text-green-600 font-bold">Requester Email:</span> {user.email}</h1>
            </div>
            <form className="p-5 w-full md:w-2/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                {/* recipient name */}
                <label className="label">
                    <span className="label-text">Recipient Name</span>
                </label>
                <input {...register("recipientName")} type="text" placeholder="Recipient Name" className="input input-bordered w-full mb-4" required />

                {/* district */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Disctrict</span>
                    </label>
                    <select
                        {...register("district")}
                        // defaultValue={"Comilla"}
                        // {...register("district")}
                        className="select select-bordered w-full max-w-full">

                        {/* <option disabled selected>Select District</option> */}
                        {
                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>
                </div>

                {/* upazila */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upazila</span>
                    </label>
                    <select
                        {...register("upazila")}
                        // defaultValue={"Debidwar"}
                        // {...register("district")}
                        className="select select-bordered w-full max-w-full">

                        {/* <option disabled selected>Select Upazila</option> */}
                        {
                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>
                </div>

                {/* recipient hospital name */}
                <label className="label">
                    <span className="label-text">Hospital Name</span>
                </label>
                <input {...register("hospitalName")} type="text" placeholder="Hospital Name" className="input input-bordered w-full mb-4" required />

                {/* recipient full address */}
                <label className="label">
                    <span className="label-text">Full Address</span>
                </label>
                <input {...register("fullAddress")} type="text" placeholder="Full Address" className="input input-bordered w-full mb-4" required />

                {/* donation date */}
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input {...register("date")} type="date" className="input input-bordered w-full mb-4" required />

                {/* donation date */}
                <label className="label">
                    <span className="label-text">Time</span>
                </label>
                <input {...register("time")} type="time" className="input input-bordered w-full mb-4" required />

                {/* request message */}
                <label className="label">
                    <span className="label-text">Request Message</span>
                </label>
                <input {...register("requestMessage")} type="text" placeholder="Request Message" className="input input-bordered w-full mb-4" required />

                <div className="form-control mt-6">
                    {
                        userData?.status === 'active' ? <>
                            <input className="btn btn-primary" type="submit" value="Donation Request" />
                        </> : <>
                            <button className="btn btn-primary" disabled>Donation Request</button>
                        </>
                    }
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;