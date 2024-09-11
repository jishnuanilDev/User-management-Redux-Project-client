import React, { useEffect, useState } from 'react';
import { editUser } from '../../features/services/adminServices';
import { UseSelector, useSelector } from 'react-redux';
import { selectUserToEdit } from '../../features/adminSlice';
import { editUserPost } from '../../features/services/adminServices';
import { userSignUpAction } from '../../features/services/userServices';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AdminAddUser() {
    const Navigate = useNavigate()
    const [user,setUser] = useState({})
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields.");
          } else if (password !== confirmPassword) {
            return toast.error("Passwords do not match.");
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error("Email is not valid");
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              password
            )
          ) {
            return toast.info(
              "Password minimum 8 characters Need ,Password should contain an upper case , lower case , digit and an special character"
            );
          }
    
          const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          };
          const result = await userSignUpAction(userData);
          if(result){
            alert("Added new user successfully");
            Navigate("/admin-panel");
          }
     
      
        } catch (err) {
          console.error(err);
        }
      };

  return (
    <form className='mx-auto' style={{maxWidth:'800px'}}>
        <h3 className='mt-5 text-center'>Add User</h3>
      <MDBRow className='mb-4 mt-5 ' >
        <MDBCol>
          <MDBInput id='form6Example1' label='First name' name='firstName' type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form6Example2' label='Last name' name='lastName' type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </MDBCol>
      </MDBRow>

      <MDBInput wrapperClass='mb-4' id='form6Example3' label='Email Address' name='email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <MDBInput wrapperClass='mb-4' id='form6Example3' label='Password' name='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <MDBInput wrapperClass='mb-4' id='form6Example3' label='Confirm Password' name='confirmPassword' type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />


      <MDBBtn className='mb-4' type='submit' block onClick={handleSubmit} >
       Submit
      </MDBBtn>
    </form>
  );
}