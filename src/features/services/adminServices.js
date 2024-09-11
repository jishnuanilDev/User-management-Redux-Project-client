import { loginUser, logoutUser } from "../userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const adminLoginAction = async (adminData) => {
    try {
     
      const response = await axios.post("http://localhost:5000/admin/signIn", adminData);
      if (response.data) {
        localStorage.setItem("adminToken", response.data.adminToken);
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


  export const getUsersAdmin = async () => {
    try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await axios.get('http://localhost:5000/admin/getUsers', {
            headers: {
                'authorization': `${adminToken}`
            }
        });
        console.log('response fetch,result:',response.data)

        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};


export const editUser = async (userId) => {
  try {
    console.log('ActionCreator EditUSer:',userId)
      const adminToken = localStorage.getItem('adminToken')
    const response =   await axios.get(`http://localhost:5000/admin/editUser/${userId}`,{
          headers: {
          'Authorization': `${adminToken}`
      }}
      );
   return response.data
  } catch (error) {
      if (error.response) {
          toast.error(error.response.data.info);
      } else {
          toast.error('An unexpected error occurred. Please try again later.');
      }
  }
};


export const editUserPost = async (userId,editUserData) => {
  try {
    console.log('ActionCreator EditUSerdata:',editUserData)
 
      const adminToken = localStorage.getItem('adminToken')
    const response =   await axios.post(`http://localhost:5000/admin/editUser/${userId}`,editUserData,{
          headers: {
          'Authorization': `${adminToken}`
      }}
      );
      console.log('ORGG:',response.data)
   return response.data
  } catch (error) {
      if (error.response) {
          toast.error(error.response.data.info);
      } else {
          toast.error('An unexpected error occurred. Please try again later.');
      }
  }
};



export const deleteUser = async (userId) => {
  try {
      const adminToken = localStorage.getItem('adminToken')
    await axios.delete(`http://localhost:5000/admin/deleteUser/${userId}`,{
          headers: {
          'Authorization': `${adminToken}`
      }}
      );
      return userId;
  } catch (error) {
      if (error.response) {
          toast.error(error.response.data.info);
      } else {
          toast.error('An unexpected error occurred. Please try again later.');
      }
  }
};


