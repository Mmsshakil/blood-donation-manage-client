import { useForm } from "react-hook-form";
import useDistrict from "../../hooks/useDistrict";
import useUpazila from "../../hooks/useUpazila";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Registration = () => {

    const [districts] = useDistrict();
    const [upazilas] = useUpazila();
    const { createUser } = useContext(AuthContext);

    const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;
    console.log(img_hosting_api);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col gap-7">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="w-full rounded-md shadow-2xl bg-base-100">

                    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col md:flex-row gap-5">
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="Email" className="input input-bordered" required />
                            </div>

                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input {...register("avatar")} type="file" className="file-input w-full file-input-bordered max-w-full" required />
                        </div>

                        {/* blood group */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>

                            <select
                                {...register("blodGroup")}
                                defaultValue={"A+"}
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


                        <div className="flex flex-col md:flex-row gap-5">
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="Password" className="input input-bordered" required />
                            </div>
                            {/* confirm password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPass")} type="password" placeholder="Confirm password" className="input input-bordered" required />
                            </div>
                        </div>


                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;