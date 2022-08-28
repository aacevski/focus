import axios from "axios";
import { API_URL } from "../constants/urls";

const fetcher = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': "application/json"
    }
});

fetcher.interceptors.response.use((response) => {
    return response.data;
})

export default fetcher;