import React, { useEffect, useState,useCallback } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { UseDispatch, useSelector } from 'react-redux';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './AdminPanel.css'
import { setUserToEdit } from '../../features/adminSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsersAdmin } from '../../features/services/adminServices';
import { fetchUsers } from '../../features/adminSlice';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../features/services/adminServices';
import { EditUser } from '../../features/services/adminServices';
import { deleteUserState } from '../../features/adminSlice';

function AdminPanel() {
    const Navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    const dispatch = useDispatch()
    const [change, setChange] = useState(false)
    const [prefix, setPrefix] = useState('')
    const {users} = useSelector((state)=> state.admin)

useEffect(()=>{
  const token = localStorage.getItem('adminToken');
  if(!token){
    Navigate('/admin');
  }





  const fetchData = async () => {
    try {
      const result = await getUsersAdmin();
      console.log('fertchdata,result:',result);
      dispatch(fetchUsers(result.users));
      setAllUsers(result.users)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  fetchData();
},[change])


useEffect(() => {
  console.log('prefix..',prefix);
  const regex = new RegExp(`^${prefix}`, "i")
  const filteredUser = users.filter((user) => regex.test(user.firstName))
  setAllUsers(filteredUser)
}, [prefix, dispatch])

const logoutAdmin = useCallback(() => {
  localStorage.removeItem('adminToken');
  Navigate('/admin');
}, [Navigate]);


const  handleEditUser = async (userId)=>{
  try {
dispatch(setUserToEdit(userId))
Navigate('/admin-userEdit')
      
    } catch (error) {
      toast.error('An error occured')
      console.error('An error occured in delete', error.message)
    }
  
}

const  handleDeleteUser = async (userId)=>{
  try {
    console.log('vanninda user id delete')
    setChange(true)

      const result = await deleteUser(userId);

        dispatch(deleteUserState(result))
        console.log('workign');
          // toast.success('User Deleted Successfully!')
      
     
    } catch (error) {
      toast.error('An error occured')
      console.error('An error occured in delete', error.message)
    }
  
}





  return (
    <div className='adminPanel'>
      
      <Navbar className="bg-body-tertiary mb-5">
      <h4 className='mx-3 mt-2'>Admin Panel</h4>
          <Container >
          
            <Navbar.Brand className='' href="#home">Home</Navbar.Brand>
            <Navbar.Brand className='' href="#home">Options</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">

            <MDBInputGroup className='mx-auto' style={{ maxWidth: '300px' }}> {/* Adjust maxWidth as needed */}
  <MDBInput label='Search' onChange={(e) => setPrefix(e.target.value)}/>
  <MDBBtn rippleColor='dark'>
    <MDBIcon icon='search' />
  </MDBBtn>
</MDBInputGroup>

            
              <Button onClick={logoutAdmin} className='mx-3 bg-danger'>Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="d-flex justify-content-end mb-2">
      <Button onClick={() => Navigate('/admin-addUser')} className='mx-3 bg-primary'>Add User +</Button>
    </div>
    {allUsers?<h3 className='text-center'>Users List </h3> : <h3 className='text-center'>Users not found </h3>}
    <MDBTable bordered borderColor="dark" className='' >

      <MDBTableHead>
        <tr>
          <th scope='col'>NO:</th>
          <th scope='col'>Firstname</th>
          <th scope='col'>Lastname</th>
          <th scope='col'>Email</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {allUsers.map((user)=>(
          <tr key={user._id}>
          <th scope='row'>1</th>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td className=''>
      <Button className='mx-3 bg-warning' onClick={()=>handleEditUser(user._id)}>Edit</Button>
      <Button className='bg-danger' onClick={()=>handleDeleteUser(user._id)}>Delete</Button>
    </td>
        
        </tr>
        ))}
    
     
      </MDBTableBody>
    </MDBTable>

    </div>
  )
}

export default AdminPanel
