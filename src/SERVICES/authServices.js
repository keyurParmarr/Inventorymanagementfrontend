import axios from "axios";
import { toast } from "react-toastify";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
//register
export const registerUser = async (userData) => {
  try {
    const resp = await axios.post(
      `http://localhost:5000/api/user/register`,
      userData,
      {
        withCredentials: true,
      }
    );
    if (resp.statusText === "OK") {
      toast.success("Account Created");
    }
    return resp.data;
  } catch (error) {
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//login
export const loginUser = async (userData) => {
  try {
    const resp = await axios.post(
      `http://localhost:5000/api/user/login`,
      userData,
      {
        withCredentials: true,
      }
    );
    if (resp.statusText === "OK") {
      toast.success("Logged in Successfully");
    }
    return resp.data;
  } catch (error) {
    toast.error("Wrong Credentials");
    if (error) console.log(error);
    if (error.response.status === "400") {
      return toast.error("Wrong Credentials");
    } else {
      const message =
        (error.resp && error.resp.data && error.resp.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  }
};
//logout
export const logoutUser = async (userData) => {
  try {
    const resp = await axios.get(`http://localhost:5000/api/user/logout`);
    if (resp.statusText === "OK") {
      toast.success("Logged Out ");
    }
    return resp.data;
  } catch (error) {
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//forgotpassword
export const forgotPassword = async (userData) => {
  try {
    const resp = await axios.post(
      `http://localhost:5000/api/user/forgotpassword`,
      userData
    );
    toast.success(resp.data.message);
  } catch (error) {
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//resetpassword
export const resetPassword = async (userData, resetToken) => {
  try {
    const resp = await axios.put(
      `http://localhost:5000/api/user/resetpassword/${resetToken}`,
      userData
    );
    return resp.data;
  } catch (error) {
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//login status
export const getLoginStatus = async () => {
  try {
    const resp = await axios.get(`http://localhost:5000/api/user/loginstatus`);
    return resp.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//get userdata
export const getUserData = async () => {
  try {
    const resp = await axios.get(`http://localhost:5000/api/user/getuser`);
    return resp.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//Update user
export const updateProfile = async (formdata) => {
  try {
    const resp = await axios.patch(
      `http://localhost:5000/api/user/updateuser`,
      formdata
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
//change password
export const changePassword = async (formdata) => {
  try {
    const resp = await axios.patch(
      `http://localhost:5000/api/user/changepassword`,
      formdata
    );
    return resp.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.resp && error.resp.data && error.resp.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
