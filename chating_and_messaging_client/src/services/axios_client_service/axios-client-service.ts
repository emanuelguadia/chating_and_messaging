import axios from 'axios';
//Created specific instance of axios.
const axiosClient = axios.create(
    // {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     }
    // },
);
export default axiosClient;


