
import { useForm } from "react-hook-form";
import useDistrict from "../../hooks/useDistrict";
import useUpazila from "../../hooks/useUpazila";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";

const SearchDonor = () => {

    const [districts] = useDistrict();
    const [upazilas] = useUpazila();

    // const { user } = useContext(AuthContext);
    // console.log(user);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    };


    return (
        <div className="mt-11 p-10 bg-slate-700 text-white">
            <form className="flex flex-col gap-4 w-full md:w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                {/* blood group */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold "> Group: </h1>
                    <select

                        {...register('blodGroup')}
                        className="select select-bordered w-full bg-gray-900">
                        <option disabled selected>Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>


                {/* districs */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold ">District: </h1>
                    <select
                        {...register("district")}
                        className="select select-bordered w-full bg-gray-900">

                        <option disabled selected>Select District</option>
                        {
                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                        }
                    </select>
                </div>

                {/* upazilas */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold ">Upazila: </h1>
                    <select
                        {...register("upazila")}
                        className="select select-bordered w-full bg-gray-900">

                        <option disabled selected>Select Upazila</option>
                        {
                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                        }
                    </select>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold ">Email: </h1>
                    <input {...register("email")} className="w-full p-3 rounded-md bg-gray-900" placeholder="Enter your mail" type="email" name="" id="" required />
                </div>

                <button className="btn">
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default SearchDonor;