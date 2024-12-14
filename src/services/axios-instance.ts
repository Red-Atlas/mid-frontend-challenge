import axios from "axios";

const baseURL = "https://fake-api-listings.vercel.app";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
