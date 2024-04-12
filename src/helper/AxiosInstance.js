import axios from "axios";

let axiosInstance = axios.create({
    baseURL:"//13.202.32.233:7532/"
})

export default axiosInstance;