import React from "react";
import ProductList from "./ProductList";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./Login"
import Signup from "./SignUp"
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";
import { useContext } from "react";
import Order from "./Order";

//to protect the route, we are importing this line
import { DataContext } from "./App";
import Edit from "./Edit";

function Main({ filteredProducts }) {

  const { isLoggedIn } = useContext(DataContext); //use beore return - declaration

  const ProtectedRoutes= ()=>{
    return isLoggedIn === true ? <Outlet/> : <Navigate to = "/login"/>;
  }

    

  return (
    <div>
    {/* const { setisLoggedIn } = useContext(DataContext); */}

     <Routes>
            <Route
              path="/"
              element={
                  <ProductList /> }
            />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/edit" element={<Edit/>} />
            
            {/* protected routes starts here */}
            {/* protectedRoutes is a function, not a React component (capital letter required). */}
            
            
            <Route element = {<ProtectedRoutes/>}>

            <Route element={<ProtectedRoutes />}>
  <Route path="/userhome" element={<UserHome />} />
  <Route path="/adminhome" element={<AdminHome />} />
  <Route path="/orders" element={<Order />} />
  <Route path="/edit/:id" element={<Edit />} />
  </Route>

            
            
            </Route>
           
             <Route path="/logout" element={
                  <ProductList filteredProducts={filteredProducts} /> } />
      </Routes>

    
</div>
  );
   
}

export default Main;








    // {/*  <main> */}
    // {/* */}
    // {/*  </main> */}



















    //https://chatgpt.com/share/687a6c28-e17c-8011-9045-0cb66147f4a8