import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";




const ContentManagement = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();



    const { isPending, error, data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
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
    console.log(blogs);

    // delete blog
    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/blogs/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Blog has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }



    return (
        <div className="flex flex-col gap-5  px-5">
            <div className="flex justify-end items-end">
                <NavLink to='/dashboard/addBlog'><button className="btn btn-outline btn-warning">Add Blog</button></NavLink>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto gap-8 lg:gap-14">
                {
                    blogs?.map(blog => <div
                        key={blog._id}
                        className="card card-compact w-80 bg-base-100 shadow-xl">
                        <figure><img className="h-56 w-full" src={blog.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto">{blog.title}</h2>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Publish</button>
                                <button onClick={() => handleDelete(blog._id)} className="btn btn-primary">Delete</button>
                            </div>
                        </div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default ContentManagement;