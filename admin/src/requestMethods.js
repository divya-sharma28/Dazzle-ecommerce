import axios from "axios";

const BASE_URL = "http://localhost:4000/dazzle/"
const TOKEN = (JSON.parse(localStorage.getItem("currentUser"))?.token);
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest= axios.create({
    baseURL: BASE_URL,
    headers:{access_token: `Bearer ${TOKEN}`}
});