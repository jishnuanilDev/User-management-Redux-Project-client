import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adminLoginAction } from '../../features/services/adminServices'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit'


function AdminLogin () {
    const Navigate = useNavigate()
  const [loginCheck, setLoginCheck] = useState()



  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('') 


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      Navigate('/admin-panel'); 
    }
  }, [Navigate]);


  const handleAdminLoginHere = async e => {
    e.preventDefault();
    try {

      if (!email || !password) {
        return toast.error('Please enter both email and password.');
    }
    
const adminData = {email,password}
const result = await adminLoginAction(adminData);
if(result.adminToken){
  Navigate('/admin-panel')

}
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol>
          <MDBCard
            className=' my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '500px' }}
          >
            <MDBCardBody className=' p-5 w-100  d-flex flex-column'>
              <h2 className='fw-bold mb-2 text-center'>Admin Sign in</h2>

              <p className='text-danger text-center'>
                {loginCheck ? loginCheck : ''}
              </p>

              <form onSubmit={handleAdminLoginHere}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  name='email'
                  label='Email address'
                  type='email'
                  size='lg'
                  value={email}
                  onChange={e =>
                   setEmail(e.target.value)
                  }
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  name='password'
                  label='Password'
                  type='password'
                  size='lg'
                  value={password}
                  onChange={e =>
                  setPassword(e.target.value)
                  }
                />

                <MDBBtn className='w-100' size='lg'>
                  Login
                </MDBBtn>
              </form>
        
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AdminLogin
