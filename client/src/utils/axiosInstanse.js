import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
let TOKEN = "";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

const setAccesToken = (accesToken) => {
  TOKEN = accesToken;
};

userRequest.interceptors.request.use(async (req) => {
  if (!req.headers["Authorization"]) {
    req.headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  return req;
});

export { userRequest, publicRequest, setAccesToken };
