import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://blood-donor-manage-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;