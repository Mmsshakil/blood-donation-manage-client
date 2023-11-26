
const Contact = () => {
    return (
        <div className="flex flex-col md:flex-row my-10 justify-center items-center gap-8 md:gap-16 bg-slate-800 py-10">
            <div className="text-center ">
                <h1 className="text-5xl font-bold mb-4">Contact with Us</h1>
                <p className="text-xl font-bold mb-2">Blood Bank Comunity.</p>
                <p className="">12 / 22 Salimullah Road,<br /> Mohammadpur, Dhaka 1207</p>
                <div className="mt-2">
                    <p>Email: softhandshakil@gmail.com</p>
                    <p>Phone: +8809638910651</p>
                </div>
            </div>
            <div className="">
                <form className="">
                    <label className="label">
                        <span className="label-text">Enter Your Name</span>
                    </label>
                    <input className="p-3 rounded-md bg-slate-900" type="text" placeholder="Name" />
                    <label className="label mt-2">
                        <span className="label-text">Enter Your Email</span>
                    </label>
                    <input className="p-3 rounded-md bg-slate-900" type="text" placeholder="Email" />
                    <label className="label mt-2">
                        <span className="label-text">Enter Your Comment</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full bg-slate-900" placeholder="Comment..."></textarea>
                    <div className="mt-3">
                        <button className="btn btn-outline btn-accent">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;