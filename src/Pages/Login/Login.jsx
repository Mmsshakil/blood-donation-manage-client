import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const onSubmit = (data) => {
        console.log(data);

        signIn(data.email, data.password)
            .then(result => {
                console.log('login sucess', result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })

    };

    return (
        <div className="w-3/4 lg:w-1/2 mx-auto my-14 space-y-4">
            <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                {/* email */}
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input {...register("email")} type="email" placeholder="Email" className="input input-bordered w-full mb-4" required />

                {/* password */}
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input {...register("password")} type="password" placeholder="Password" className="input input-bordered w-full mb-4" required />

                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Login" />
                </div>
            </form>
            <p className="text-center mt-3">Do not have an account? Please <Link className="text-blue-600 font-bold" to='/registration'>Register</Link></p>
        </div>
    );
};

export default Login;