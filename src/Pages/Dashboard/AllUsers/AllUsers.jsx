import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { isPending, error, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
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

    // make admin from donor
    const handleMakeAdmin = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }

    // make donor from admin
    const handleMakeDonor = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/donor/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Donor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }

    // make volunteer from donor
    const handleMakeVolunteer = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/volunteer/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Volunteer Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }


    // make status blocked from active
    const handleStatusBlock = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/block/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Blocked Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }

    // make status active from blocked
    const handleStatusActive = (user) => {
        // console.log(user);
        axiosSecure.patch(`/users/active/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Active Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }




    return (
        <div>
            {/* <h2>all users here: {users.length}</h2> */}
            <div className="overflow-x-auto justify-center">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>

                            <th></th>
                            <th>Avatar</th>
                            <th>Name & Email</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Volunteer / Donor</th>
                            <th>Admin / Donor</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr key={user._id}>

                                <td>
                                    {index + 1}
                                </td>

                                {/* avatar */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {user.name}
                                    <br />
                                    <span className=" ">{user.email}</span>
                                </td>

                                <td>
                                    {user.status}
                                </td>

                                <td>
                                    {
                                        user.status === 'active' ? <>
                                            <button onClick={() => handleStatusBlock(user)} className="btn btn-outline">Block User</button>
                                        </> : <>
                                            <button onClick={() => handleStatusActive(user)} className="btn btn-outline btn-warning">Active User</button>
                                        </>
                                    }
                                </td>

                                <td>
                                    {
                                        user.role === 'donor' ? <>
                                            <button onClick={() => handleMakeVolunteer(user)} className="btn btn-outline btn-success">Make Volunteer</button>
                                        </> : <>
                                            <button onClick={() => handleMakeDonor(user)} className="btn btn-outline btn-primary">Make Donor</button>
                                        </>
                                    }

                                </td>
                                <td>
                                    {
                                        user.role === 'admin' ? <>
                                            <button onClick={() => handleMakeDonor(user)} className="btn btn-outline btn-primary">Make Donor</button>
                                        </> : <>
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline btn-error ">Make Admin</button>
                                        </>
                                    }
                                </td>
                            </tr>
                            )
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};
export default AllUsers;