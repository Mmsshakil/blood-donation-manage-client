import axios from "axios";



export const axiosSecure = axios.create({
    baseURL: 'https://blood-donor-manage-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;





// import axios from "axios";

// const axiosSecure = axios.create({
//     baseURL: 'https://blood-donor-manage-server.vercel.app'
// })
// const useAxiosSecure = () => {

//     return axiosSecure;
// };

// export default useAxiosSecure;