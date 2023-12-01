import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: myRequest = [], refetch,isPending, error } = useQuery({
        queryKey: ['myRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myRequest?email=${user.email}`);
            return res.data;
        }
    })
    return [myRequest, refetch, isPending, error]
};

export default useRequest;