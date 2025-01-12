import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext); // Move inside the hook
  const navigate = useNavigate(); // Move inside the hook

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // console.log("error caught in interceptor", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          // console.log("need to logout the user");
          logOut()
            .then(() => {
              // console.log("logged out user");
              navigate("/login");
            })
            .catch((err) => {
              // console.log(err)
            });
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]); // Add dependencies to useEffect

  return axiosInstance;
};

export default useAxiosSecure;
