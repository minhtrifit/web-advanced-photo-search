import axios from "axios";

export const axiosUnsplash = axios.create({
  baseURL: "https://api.unsplash.com/search",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});
