import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "./App";
// Material UI Imports
import { TextField, Button, Typography, Box } from "@mui/material";

const SignupForm = () => {
  const { showSnackbar } = useContext(DataContext); // Get showSnackbar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const newUser = {
        ...data,
        role: "user",
      };
      await axios.post("http://localhost:3002/users", newUser);
      // alert("Signup successful!");
       showSnackbar(`Sign Up Success...`, "success");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
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
        Signup
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 2, message: "Min 2 characters" },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email",
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
          minLength: { value: 6, message: "Min 6 characters" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;




// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";


// const SignupForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const onSubmit = async (data) => {
//     try {
//       const newUser = {
//         ...data,
//         role: "user",
//       };
//       await axios.post("http://localhost:3002/users", newUser);
//       alert("Signup successful!");
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("Signup failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="form">
//       <h2>Signup</h2>

//       <input
//         placeholder="Name"
//         {...register("name", {
//           required: "Name is required",
//           minLength: { value: 2, message: "Min 2 characters" },
//         })}
//       />
//       {errors.name && <p>{errors.name.message}</p>}

//       <input
//         placeholder="Email"
//         type="email"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /\S+@\S+\.\S+/,
//             message: "Invalid email",
//           },
//         })}
//       />
//       {errors.email && <p>{errors.email.message}</p>}

//       <input
//         placeholder="Password"
//         type="password"
//         {...register("password", {
//           required: "Password is required",
//           minLength: { value: 6, message: "Min 6 characters" },
//         })}
//       />
//       {errors.password && <p>{errors.password.message}</p>}

//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignupForm;
