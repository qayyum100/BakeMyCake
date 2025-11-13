import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./App";
// Material UI Imports
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const { setisLoggedIn, setcurrentUser } = useContext(DataContext);
  const navigate = useNavigate();
  const { showSnackbar } = useContext(DataContext); // Get showSnackbar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      const users = response.data;

      const resultUser = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!resultUser) {
        alert("Invalid email or password");
        return;
      }
      
      setisLoggedIn(true);
      setcurrentUser(resultUser);
      
      alert(`Welcome back, ${resultUser.name}! Role: ${resultUser.role}`);
      showSnackbar(`Logged-in Successfully...`, "success");
      if (resultUser.role === "ADMIN") {
        navigate("/adminhome");
      } else if (resultUser.role === "USER") {
        navigate("/userhome");
      }
    } catch (error) {
       showSnackbar(`Login Failure...`, "failure");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        {...register("password", {
          required: "Password is required",
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default Login;



// import { useForm } from "react-hook-form";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// // we need to import these two for to destructuring properties
// import { useContext } from "react";
// import { DataContext } from "./App";

// const Login = () => {
//   // Destructuring context values from DataContext
//   const { setisLoggedIn, setcurrentUser } = useContext(DataContext);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.get("http://localhost:3002/users");
//       const users = response.data; //data + status

//       const resultUser = users.find(
//         (u) => u.email === data.email && u.password === data.password
//       );

//       if (!resultUser) {
//         alert("Invalid email or password");
//         return; // stop execution if login fails
//       }

//       // Set global login state and user
//       setisLoggedIn(true);
//       setcurrentUser(resultUser);

//       alert(`Welcome back, ${resultUser.name}! Role: ${resultUser.role}`);

//       // Navigate based on role
//       if (resultUser.role === "ADMIN") {
       
//         navigate("/adminhome");
//       } else if (resultUser.role === "USER") {
     
//         navigate("/userhome");
//       }

//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="form">
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         type="email"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /\S+@\S+\.\S+/,
//             message: "Invalid email format",
//           },
//         })}
//       />
//       {errors.email && <p>{errors.email.message}</p>}

//       <input
//         placeholder="Password"
//         type="password"
//         {...register("password", {
//           required: "Password is required",
//         })}
//       />
//       {errors.password && <p>{errors.password.message}</p>}

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// import React, { createContext, useContext } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import UserHome from "./UserHome"
// import {DataContext} from "./App"
// const Login = () => {
// //we need to destructuring the properties from global context that we defined in App.js
//   const{isLoggedin,setisLoggedin,currentUser,setcurrentUser} = useContext(DataContext);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.get("http://localhost:3002/");
//       const users = response.data;

//       const resultUser = users.find(
//         (u) => u.email === data.email && u.password === data.password
//       );

//       if (resultUser) {
//         alert(`Welcome back, ${resultUser.name}! Role: ${resultUser.role}`);
        
//       } else {
//         alert("Invalid email or password");
//       }
// //if login is success, store the resultUser as currentUser
//       if(resultUser.role==="ADMIN"){
//         navigate("/adminhome");}

      
//       if(resultUser.role==="USER"){
//         navigate("/userhome");}

//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="form">
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         type="email"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /\S+@\S+\.\S+/,
//             message: "Invalid email format",
//           },
//         })}
//       />
//       {errors.email && <p>{errors.email.message}</p>}

//       <input
//         placeholder="Password"
//         type="password"
//         {...register("password", {
//           required: "Password is required",
//         })}
//       />
//       {errors.password && <p>{errors.password.message}</p>}

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// error : https://chatgpt.com/share/687a7629-4d78-8011-9f16-55e4269ede1f