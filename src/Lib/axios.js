import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://skill-stack-server.vercel.app",
    headers: {
        "Content-Type" : "application/json"
    }
});


export default axiosInstance;