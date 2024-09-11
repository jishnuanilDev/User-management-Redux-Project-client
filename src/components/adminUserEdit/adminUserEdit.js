import React, { useEffect, useState } from 'react';
import { editUser } from '../../features/services/adminServices';
import { UseSelector, useSelector } from 'react-redux';
import { selectUserToEdit } from '../../features/adminSlice';
import { editUserPost } from '../../features/services/adminServices';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AdminUserEdit() {
    const Navigate = useNavigate()

    const [firstNameEdit,setFirstNameEdit] = useState();
    const [lastNameEdit,setLastNameEdit] = useState('')
    const [emailEdit,setEmailEdit] = useState('')

const userId = useSelector(state=>state.admin.userToEdit)

    useEffect( ()=>{
      
      
        const fetchData = async (usId) => {
            try {
                console.log('fet userID :',usId)
              const result = await editUser(usId);
              console.log('fertchdata,result:',result);
       if(result){
        setFirstNameEdit(result.user.firstName)
        setLastNameEdit(result.user.lastName)
        setEmailEdit(result.user.email)
       }
             
            } catch (error) {
              console.error("Error fetching users:", error);
            }
          };
          fetchData(userId);
    },[])

    const handleSubmitEdit = async (e)=>{
        e.preventDefault();
        const editUserData = {firstNameEdit,lastNameEdit,emailEdit}

const result  = await editUserPost(userId,editUserData);
if(result){
    Navigate('/admin-panel');
}

  

    }

  return (
    <form className='mx-auto' style={{maxWidth:'800px'}}>
        <h3 className='mt-5 text-center'>Edit User</h3>
      <MDBRow className='mb-4 mt-5 ' >
        <MDBCol>
          <MDBInput id='form6Example1' label='First name' name='firstName' type='text' value={firstNameEdit} onChange={(e)=>setFirstNameEdit(e.target.value)} />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form6Example2' label='Last name' name='lastName' type='text' value={lastNameEdit} onChange={(e)=>setLastNameEdit(e.target.value)} />
        </MDBCol>
      </MDBRow>

      <MDBInput wrapperClass='mb-4' id='form6Example3' label='Email Address' name='email' type='email' value={emailEdit} onChange={(e)=>setEmailEdit(e.target.value)} />


      <MDBBtn className='mb-4' block onClick={handleSubmitEdit}>
       Submit
      </MDBBtn>
    </form>
  );
}