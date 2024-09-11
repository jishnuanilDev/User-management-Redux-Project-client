import React, { useEffect, useState } from "react";
import "./UserLogin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../../features/services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProfile } from "../../features/userSlice";
import { fetchUserProfile } from "../../features/services/userServices";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";


function UserLogin() {
  const [loginCheck, setLoginCheck] = useState();

  const[email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
        Navigate('/user-homepage');
    }
}, [Navigate])

  const handleLoginHere = async (e) => {
    e.preventDefault();
    try {
  
      if (!email || !password) {
        return toast.error('Please enter both email and password.')
    }
    const userData = { email, password }
    const result = await userLoginAction(userData);
    if (result.userToken) {
      Navigate('/user-homepage');
      const result = await fetchUserProfile()
      console.log('after taking user from request:',result)
      dispatch(fetchProfile(result.user))
  }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol>
          <MDBCard
            className=" my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className=" p-5 w-100  d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              <p className="text-danger text-center">
                {loginCheck ? loginCheck : ""}
              </p>

              <form onSubmit={handleLoginHere}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  label="Email address"
                  type="email"
                  size="lg"
                  onChange={(e) =>
                  setEmail(e.target.value)
                  }
                  value={email}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="password"
                  label="Password"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) =>
                  setPassword(e.target.value)
                  }
                />

                <MDBBtn className="w-100" size="lg">
                  Login
                </MDBBtn>
              </form>

              <button
                onClick={() => Navigate("/sign-up")}
                className="createAccount mt-2"
              >
                Dont have an account?
              </button>

              <hr className="my-4" />

              <MDBBtn
                className="mb-2 w-100"
                size="lg"
                style={{ backgroundColor: "#dd4b39" }}
              >
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with google
              </MDBBtn>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#3b5998" }}
              >
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Sign in with facebook
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserLogin;
