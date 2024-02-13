import axios from "axios";

const fetcher = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://resi-route-server.vercel.app",
});

export default fetcher;