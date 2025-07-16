import axios from "axios";

const eduMarketAPI = axios.create({
  baseURL: "https://65459186fe036a2fa9546e52.mockapi.io/api/v1/",
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default eduMarketAPI;
