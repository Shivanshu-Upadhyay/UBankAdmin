import axios from "axios";
import baseUrl from '../components/config/baseUrl'
const auth = localStorage.getItem('admin')
const api = axios.create({
  baseURL:baseUrl,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${auth}`,
  },
});

// List of all the endpoints😎
export const bankDeposit = () => api.post("/settelment/bankDeposit");
export const localPayouts = (data) => api.post("/settelment/localPayouts",data);

