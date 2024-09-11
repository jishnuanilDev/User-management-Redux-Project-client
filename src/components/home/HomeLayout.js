import React, { useEffect, useState } from 'react'
import './HomeLayout.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { fetchUserProfile } from '../../features/services/userServices';



function HomeLayout() {
  const [profileName,setProfileName] = useState()

  const Navigate = useNavigate();
    const numberOfCakes = useSelector((state)=>{
       return state.numberOfCakes
    })
    useEffect(() => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        Navigate("/");
      }
    }, [Navigate]);
    const dispatch = useDispatch();

    const logoutUser = useCallback(() => {
      localStorage.removeItem('userToken');
      Navigate('/');
  }, [Navigate]);

  useEffect(() => {
    const accessData = async () => {
      try {
        const result = await fetchUserProfile();
        const {firstName,lastName,email} = result.user
        setProfileName(firstName);
      } catch (error) {
        
        console.error('Error fetching user profile:', error);
      }
    };

    accessData();
  }, [dispatch]);
  const handleProfile = ()=>{
    console.log('Profile');
    Navigate('/user-profile')
  }
  return (
  
    <div >
       
        <Navbar className="bg-body-tertiary ">
          <Container>
            <Navbar.Brand className='' href="#home">Home</Navbar.Brand>
            <Navbar.Brand className='' href="#home">Options</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className=''>
                Signed in as: <a style={{fontWeight:500}} className='' href="#login">{profileName}</a>
              </Navbar.Text>
              <Button onClick={handleProfile} className='mx-3'>Profile</Button>
              <Button onClick={logoutUser} className='mx-3'>Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

  
          <div className='container-box mx-auto image-bg'>
           <h1 className='text-dark text-center'>Welcome to Homepage</h1>
  
          </div>

      
        </div>
  )
}

export default HomeLayout
