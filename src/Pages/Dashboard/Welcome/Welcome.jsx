import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import MyDonationRequests from "../MyDonationRequests/MyDonationRequests";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaPeopleGroup, FaMoneyCheckDollar } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";


const Welcome = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const axiosSecure = useAxiosSecure();


    const { data: stats, isPending, error } = useQuery({
        queryKey: ['adminStatistic'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStatistic');
            return res.data;
        }
    })

    useEffect(() => {
        // Make sure to use the correct parameter name in the fetch URL
        fetch(`https://blood-donor-manage-server.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserData(data);

            })
    }, [user.email, setUserData]);


    // ----------------------loading problem fix by this------------------------------
    if (!userData || isPending || error) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>;
    }


    const { role } = userData;
    console.log(role);

    //---------------------------------------------------------------------------------





    return (
        <div>
            <div className="text-center ">
                <h2 className="text-xl font-bold">Saving lives, one drop at a time! <br /> Welcome, {user.displayName} </h2>
                <div className="divider divider-success w-3/4 mx-auto"></div>
            </div>
            {
                userData?.role === 'donor' ? <>
                    <div className="flex flex-col items-center gap-3">
                        <MyDonationRequests></MyDonationRequests>
                        <Link className="btn btn-outline btn-success" to='/dashboard/myDonationRequests'>View My All Request</Link>
                    </div>
                </> : <>
                    <div className="stats shadow flex flex-col lg:flex-row justify-center items-center">

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaPeopleGroup className="inline-block w-8 h-8 stroke-current"></FaPeopleGroup>
                            </div>
                            <div className="stat-title text-lg font-extrabold">Total Users</div>
                            <div className="stat-value">{stats.users}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaMoneyCheckDollar className="inline-block w-8 h-8 stroke-current"></FaMoneyCheckDollar>
                            </div>
                            <div className="stat-title text-lg font-extrabold">Total Funding</div>
                            <div className="stat-value">$0.00</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <MdBloodtype className="inline-block w-8 h-8 stroke-current"></MdBloodtype>
                            </div>
                            <div className="stat-title text-lg font-extrabold">Total Blood Donation Request</div>
                            <div className="stat-value">{stats.requests}</div>
                        </div>

                    </div>
                </>
            }

        </div>
    );
};

export default Welcome;