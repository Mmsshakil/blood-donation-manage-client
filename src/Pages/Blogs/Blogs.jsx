import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Blogs = () => {

    const axiosSecure = useAxiosSecure();



    const { isPending, error, data: blogs = [] } = useQuery({
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


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="divider divider-info text-2xl font-bold">All Blogs</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 ">
                {
                    blogs?.map(blog => <div
                        key={blog._id}
                        className="card card-compact w-80 bg-base-100 shadow-xl">
                        {
                            blog?.blogStatus === "published" ? <>
                                <figure><img className="h-56 w-full" src={blog.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2><span className="text-lg font-bold">Title : </span>{blog.title}</h2>
                                    <p><span className="text-lg font-bold">Content : </span>{blog.content}</p>
                                </div>
                            </> : <>
                            </>
                        }

                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;