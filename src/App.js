
// import React from "react";

// import store from "./redux/store";
// import { Provider } from "react-redux";
// import Usage from "./redux/Usage";
// import './App.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserHomePage from './Pages/UserHomePage';
import UserLoginPage from './Pages/UserLoginPage';
import UserSignUpPage from './Pages/UserSignUpPage';
import { Provider } from 'react-redux';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminPanelPage from './Pages/AdminPanelPage';
import AdminUserEditPage from './Pages/AdminUserEditPage';
import AdminAddUserPage from './Pages/AdminAddUserPage';
import UserHomeProfilePage from './Pages/UserHomeProfilePage';
import store from './store/store';
function App() {
  return (
   
   <>
     <ToastContainer />
     <Provider store={store}>
        <Router>
          <Routes>
          {/* AdminAddUserPage */}
            <Route element={<UserLoginPage />} path="/" />
            <Route element={<UserSignUpPage />} path="/sign-up" />
            <Route element={<UserHomePage />} path="/user-homepage" />
            <Route element={<AdminLoginPage />} path="/admin" />
            <Route element={<AdminPanelPage />} path="/admin-panel" />
            <Route element={<AdminUserEditPage />} path="/admin-userEdit" />
            <Route element={<AdminAddUserPage />} path="/admin-addUser" />
            <Route element={<UserHomeProfilePage />} path="/user-profile" />
          </Routes>
         
        </Router>
        </Provider>
        </>

  );
}

export default App;




