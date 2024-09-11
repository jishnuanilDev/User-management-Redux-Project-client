import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../features/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { userSignUpAction } from "../../features/services/userServices";
import "./UserSignUp.css";
import { useEffect } from "react";

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

function UserSignUp() {
  const [errorData, setErrorData] = useState();
  const [signUp, setSignUp] = useState();

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      Navigate("/user-homepage");
    }
  }, [Navigate]);

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
        alert("sign-up success");
        Navigate("/");
     
      }
 
  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <p className="text-danger text-center">
                {errorData ? "User already exists" : ""}
              </p>
              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="firstName"
                  label="First Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="lastName"
                  label="Last Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="password"
                  label="Password"
                  id="formControlLg"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <MDBIcon
                      icon={showPassword ? "eye-slash" : "eye"}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  }
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="ConfirmPassword"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <MDBBtn type="submit" className="w-100" size="lg">
                  Sign Up
                </MDBBtn>
              </form>
              <button
                onClick={() => Navigate("/")}
                className="createAccount mt-2"
              >
                Back to login
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

export default UserSignUp;
