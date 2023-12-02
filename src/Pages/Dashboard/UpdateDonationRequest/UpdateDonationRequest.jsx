import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import useDistrict from "../../../hooks/useDistrict";
import useUpazila from "../../../hooks/useUpazila";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateDonationRequest = () => {


    const { user } = useContext(AuthContext);
    // console.log(user);
    const [districts] = useDistrict();
    const [upazilas] = useUpazila();
    const axiosPublic = useAxiosPublic();
    const requestDetails = useLoaderData();
    // console.log(requestDetails);
    const { _id, recipientName, hospitalName, fullAddress, upazila, district, date, time, requestMessage } = requestDetails;




    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const updateInfo = {
            recipientName: data.recipientName,
            hospitalName: data.hospitalName,
            district: data.district,
            upazila: data.upazila,
            fullAddress: data.fullAddress,
            date: data.date,
            time: data.time,
            requestMessage: data.requestMessage
        }
        // /request/:id
        // console.log(updateInfo);
        axiosPublic.put(`/request/${_id}`, updateInfo)
            .then(res => {
                console.log('request updated to the data base', res);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation Request Update Successful",
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
                <input {...register("recipientName")} type="text" placeholder="Recipient Name" defaultValue={recipientName} className="input input-bordered w-full mb-4" required />

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
                        // defaultValue={upazila}
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
                <input {...register("hospitalName")} type="text" placeholder="Hospital Name" defaultValue={hospitalName} className="input input-bordered w-full mb-4" required />

                {/* recipient full address */}
                <label className="label">
                    <span className="label-text">Full Address</span>
                </label>
                <input {...register("fullAddress")} type="text" placeholder="Full Address" defaultValue={fullAddress} className="input input-bordered w-full mb-4" required />

                {/* donation date */}
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input {...register("date")} type="date" defaultValue={date} className="input input-bordered w-full mb-4" required />

                {/* donation date */}
                <label className="label">
                    <span className="label-text">Time</span>
                </label>
                <input {...register("time")} type="time" defaultValue={time} className="input input-bordered w-full mb-4" required />

                {/* request message */}
                <label className="label">
                    <span className="label-text">Request Message</span>
                </label>
                <input {...register("requestMessage")} type="text" placeholder="Request Message" defaultValue={requestMessage} className="input input-bordered w-full mb-4" required />

                <div className="form-control mt-6">
                    <button className="btn btn-primary" >Update Request</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDonationRequest;