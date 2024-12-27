import axios from "axios";
const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
export const axiosClient = axios.create({
 baseURL: "http://localhost:8000",
 withCredentials:true,   
 headers: {
  "X-CSRF-TOKEN": csrfToken,
},
})