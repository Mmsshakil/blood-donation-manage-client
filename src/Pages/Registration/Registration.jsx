import { useForm } from "react-hook-form";
import useDistrict from "../../hooks/useDistrict";
import useUpazila from "../../hooks/useUpazila";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {

    const [districts] = useDistrict();
    const [upazilas] = useUpazila();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    // for password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z0-9@#$%^&+=!]).{8,}$/;
    // error showing
    const [registerError, setRegisterError] = useState('');

    // -----------image hosting ------------------------------
    const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;
    // console.log(img_hosting_api);

    // ----------------------------------------------------------
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        console.log(data);

        // password check
        // reset error
        setRegisterError('');

        if (!passwordPattern.test(data.password)) {
            setRegisterError('Password must be contain atleast 6 characters capital letter & special character');
            // console.log('password wrong');
            return;
        }
        // -----------------------------------------------------------



        // upload image in the imgbb server ang get the img url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const imageUrl = res.data.data.display_url;
            // now sent user data to database and create user on firebase
            createUser(data.email, data.password)
                .then(result => {
                    console.log(result.user);


                    updateProfile(result.user, {
                        displayName: data.name,
                        photoURL: imageUrl
                    })
                        .then(res => {
                            console.log(res);
                            // --------------------------------------
                            // create user entry in the database
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                blodGroup: data.blodGroup,
                                district: data.district,
                                upazila: data.upazila,
                                password: data.password,
                                photoURL: imageUrl
                            }

                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log('user added to the data base');
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Registration Successful",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        // window.location.reload();
                                    }
                                })

                            // --------------------------------------

                        })
                        .catch(error => {
                            console.log(error.message);
                        })

                })

                .catch(() => {
                    swal("Already have an account!", "Please login", "error");
                    navigate(location?.state ? location.state : '/login');
                })

        }

        // ---------------------------------------------------------






    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col gap-7">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="w-full rounded-md shadow-2xl bg-base-100">

                    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col justify-center w-full md:flex-row gap-5">
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="Email" className="input input-bordered w-full" required />
                            </div>

                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name")} type="text" placeholder="Name" className="input input-bordered w-full" required />
                            </div>
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


                        <div className="flex flex-col w-full justify-center md:flex-row gap-5">
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="Password" className="input input-bordered w-full" required />
                            </div>

                            {/* confirm password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPass")} type="password" placeholder="Confirm password" className="input input-bordered w-full" required />
                            </div>
                        </div>

                        {
                            registerError && <p className="text-red-600 text-sm mb-3 text-center mt-2">{registerError}</p>
                        }


                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                    <p className="text-center my-5">Already have an account? Please <Link className="text-blue-600 font-bold" to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;