import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import JoditEditor from 'jodit-react';
import { useRef, useState } from "react";

const AddBlog = ({ placeholder }) => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

    const editor = useRef(null);
    const [content, setContent] = useState('');
    console.log(content);
    const convertToPlainText = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || '';
    };



    const imgBBKey = import.meta.env.VITE_IMGBB_KEY;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;





    const onSubmit = async (data) => {
        const plainText = convertToPlainText(content);
        console.log(plainText);
        console.log(data);

        // upload image in the imgbb server ang get the img url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });


        if (res.data.success) {
            const imageUrl = res.data.data.display_url;

            const blogInfo = {
                title: data.title,
                content: plainText,
                image: imageUrl,
                blogStatus: 'draft'
            };

            console.log(blogInfo);
            axiosPublic.post('/blogs', blogInfo)
                .then(res => {
                    console.log('blog added to the data base');
                    if (res.data.insertedId) {
                        console.log(res);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Blog Added Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // window.location.reload();
                    }
                })
        }


    };

    return (
        <div className="hero ">
            <div className="w-full rounded-md shadow-2xl bg-base-100">

                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input {...register("title")} type="text" placeholder="Title" className="input input-bordered w-full" required />
                    </div>


                    {/* image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input {...register("image")} type="file" className="file-input w-full file-input-bordered max-w-full" required />
                    </div>

                    {/* content */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Content</span>
                        </label>
                        {/* <input {...register("content")} type="text" placeholder="Content" className="input input-bordered w-full" required /> */}

                        <JoditEditor
                            // {...register("content")}
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                        />



                    </div>


                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Create" />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddBlog;