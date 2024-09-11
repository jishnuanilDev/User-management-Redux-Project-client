import React, { useEffect, useState } from 'react';
import { userprofileState } from '../../features/userSlice';
import { fetchUserProfile } from '../../features/services/userServices';
import { fetchProfile } from '../../features/userSlice';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardImage } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import { editUserProfile } from '../../features/services/userServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserHomeProfile() {
  
    const [firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[email,setEmail] = useState('');
    const[selectedPhoto,setSelectedPhoto] = useState('')

    const Navigate = useNavigate()

const dispatch = useDispatch();
  
    useEffect(() => {
      const accessData = async () => {
        try {
          const result = await fetchUserProfile();
          const {firstName,lastName,email} = result.user
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);

        } catch (error) {
          
          console.error('Error fetching user profile:', error);
        }
      };
  
      accessData();
    }, [dispatch]);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file);
        // Perform additional actions if needed (e.g., preview the selected photo)
      };
    
const handleSubmitProfile = async (e)=>{
    e.preventDefault();
    const profileUserData = {firstName,lastName,email,selectedPhoto}
const result = await editUserProfile(profileUserData)
if(result){
  toast.success('Successfully updated');
}
}
      return (
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={handleSubmitProfile}>
                  <MDBCardImage
                  src={selectedPhoto? URL.createObjectURL(selectedPhoto):'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                 <label htmlFor="photo-upload" className="btn btn-primary">
            Change Photo
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
             
              onChange={handlePhotoChange}
            />
          </label>
          {/* Delete Photo Button */}
          <MDBBtn outline className="ms-1" >Delete Photo</MDBBtn>
                    <div className="mb-4">
                      <label htmlFor="avatar" className="form-label" style={{marginLeft:'25px'}}>
                        Profile Picture
                      </label>
                    
                    </div>
                    <MDBInput
                      type="text"
                      label="First Name"
                      name="firstName"
                 value={firstName}
                 onChange={(e)=>setFirstName(e.target.value)}
                      required
                    /> <br />
                    <MDBInput
                      type="text"
                      label="Last Name"
                      name="lastName"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                      required
                    />
                    <br />
                    <MDBInput
                      type="email"
                      label="Email"
                      name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                      required
                    />
                    <br />
               
                    <div className="text-center mt-4">
                      <MDBBtn type="submit">Submit</MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
}