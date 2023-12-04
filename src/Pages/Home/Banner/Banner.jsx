import { NavLink } from "react-router-dom";



const Banner = () => {
    return (
        <div className="hero min-h-[60vh] md:min-h-[84vh]" style={{ backgroundImage: 'url(https://i.ibb.co/D4xdgXS/health-still-life-with-copy-space.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className=" flex flex-col lg:flex-row gap-20">
                    <div className="max-w-md p-10 bg-opacity-40 bg-slate-500 rounded-md" >
                        <h1 className="mb-5 text-5xl font-bold text-black">Donate <span className="text-red-600">blood,</span><br /> Save <span className="text-green-500">lives</span></h1>
                        <p className="mb-5 text-white">Blood donation saves lives by providing a vital lifeline for those in need, embodying the simple yet profound act of compassion and generosity.</p>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                        <NavLink to='/registration' >
                            <button className=" border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Join as a donor</button>
                        </NavLink>
                        <NavLink to='/searchDonor' >
                            <button className=" border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Search Donors</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;