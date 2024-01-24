import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://resi-route-server.vercel.app",
});

export default fetcher;