import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.8.101:3000/api";

const instance = axios.create({
  baseURL: BASE_URL
});

export default instance;
