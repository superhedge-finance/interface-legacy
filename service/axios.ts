import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.8.111:4000/api";

const instance = axios.create({
  baseURL: BASE_URL
});

export default instance;
