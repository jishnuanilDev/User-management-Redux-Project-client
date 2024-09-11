import { loginUser, logoutUser } from "../userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const userLoginAction = async (userData) => {
  try {
    const response = await axios.post("http://localhost:5000/sign-in", userData);
    if (response.data) {
      localStorage.setItem("userToken", response.data.userToken);
    }
console.log('resss:',response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.info);
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};



export const userSignUpAction = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/sign-up', userData);
        if (response.data) {
            return response.data
        }
      
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
    }
};


export const fetchUserProfile = async () => {
console.log('for taking user from from request');
  try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/profile',{
          headers:{
              'authorization':`${userToken}`
          }
      });

      return response.data;
  } catch (error) {
      if (error.response) {
          toast.error(error.response.data.info);
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
  }
};


export const editUserProfile = async (userData) => {
  try {

    console.log('User edit ',userData);
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:5000/edit-userProfile',userData, {
                  headers: { 'authorization':`${userToken}` },
                  
              });
console.log('return info :',response.data)
return response.data
  } catch (error) {
      if (error.response) {
          toast.error(error.response.data.info);
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
  }
};



