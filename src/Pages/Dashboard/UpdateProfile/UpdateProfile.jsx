import { useForm } from "react-hook-form";
import useDistrict from "../../../hooks/useDistrict";
import useUpazila from "../../../hooks/useUpazila";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {

    const [districts] = useDistrict();
    const [upazilas] = useUpazila();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // --------------------------------------------------------------
    // ---------get current user data and set  as default value-------

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();


    useEffect(() => {
        // Make sure to use the correct parameter name in the fetch URL
        fetch(`https://blood-donor-manage-server.vercel.app/users/${user.email}`)
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
    // console.log('current user datas', userData);
    const { name, blodGroup, _id, district } = userData;
    // ---------------------------------------------------------------
    // -----------------------------------------------------------------





    // -----------image hosting ------------------------------
    const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;
    // console.log(img_hosting_api);

    const onSubmit = async (data) => {
        console.log(data)
        // image upload
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        console.log(res);

        if (res.data.success) {
            const imageUrl = res.data.data.display_url;
            console.log(imageUrl);
            const userInfo = {
                name: data.name,
                blodGroup: data.blodGroup,
                district: data.district,
                upazila: data.upazila,
                photoURL: imageUrl
            }
            console.log(userInfo);

            axiosPublic.put(`/user/${_id}`, userInfo)
                .then(res => {
                    console.log('user updated to the data base', res);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User update Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // window.location.reload();
                        navigate(location?.state ? location.state : '/dashboard/profile');
                    }
                })


        }



    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col gap-7">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Profile!</h1>
                </div>
                <div className="w-full rounded-md shadow-2xl bg-base-100">

                    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>

                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input defaultValue={name} {...register("name")} type="text" placeholder="Name" className="input input-bordered w-full" required />
                        </div>

                        {/* image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input {...register("image")} type="file" className="file-input w-full file-input-bordered max-w-full" required />
                        </div>

                        {/* blood group */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>

                            <select
                                {...register("blodGroup")}
                                defaultValue={blodGroup}
                                // {...register('blodGroup')}
                                className="select select-bordered w-full max-w-full">
                                {/* <option disabled selected>Select Blood Group</option> */}
                                <option selected value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* district */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Disctrict</span>
                            </label>
                            <select
                                {...register("district")}
                                // defaultValue={`district`}
                                // {...register("district")}
                                className="select select-bordered w-full max-w-full">

                                <option disabled selected>Select District</option>
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

                                <option disabled selected>Select Upazila</option>
                                {
                                    upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Update Profile" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;