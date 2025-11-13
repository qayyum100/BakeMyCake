import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./App";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";


const ProductCard = ({ item }) => {
  const { showSnackbar } = useContext(DataContext); // Get showSnackbar
  const { currentUser, products, setProducts } = useContext(DataContext);
  const navigate = useNavigate();

  const isAdmin = currentUser?.role === "ADMIN";
  const isUser = currentUser?.role === "USER";

  // ✅ User Buy Logic using toast + updated user list
  const handleOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/users/${currentUser.id}`);
      const userData = res.data;
      const existingOrders = userData.orders || [];

      const newOrder = {
  orderId: `C${Date.now()}`,
  cakeName: item.name,
  quantity: 1,
  price: item.price,
  status: "processing",
  deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
                      };

     await axios.patch(`http://localhost:3002/users/${currentUser.id}`, {
     orders: [...existingOrders, newOrder],
                               });

     showSnackbar(`"${item.name}" added to Orders`, "success");
    } catch (err) {
      console.error("Error placing order:", err);
    
    }
      };

  // Admin Edit
  const handleEdit = () => {
    navigate(`/edit/${item.id}`);
             };

  // Admin Delete
    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cakes/${id}`);
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
     
    } catch (err) {
      
      console.error(err);
    }
     };

  //return
  return (
    <Card
      sx={{
        width: 280,
        margin: 2,
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        backgroundColor: "#fff7f0",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={item.image}
        alt={item.name}
        sx={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ px: 2, py: 1.5 }}>
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{ color: "#8d4a24", fontFamily: "cursive" }}
        >
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#5e3b1d", mt: 0.5 }}>
          ₹{item.price} — {item.category}
        </Typography>
      </CardContent>

      {/* ✅ User: Buy */}
      {isUser && (
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            size="small"
            variant="contained"
            onClick={handleOrder}
            sx={{
              backgroundColor: "#b5f2c5",
              color: "#2f4f2f",
              "&:hover": {
                backgroundColor: "#95e1a6",
              },
            }}
          >
            Buy
          </Button>
        </CardActions>
      )}

      {/* ✅ Admin: Edit + Delete */}
      {isAdmin && (
        <CardActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={handleEdit}
            sx={{
              backgroundColor: "#f2b5d4",
              color: "#4a2e2e",
              "&:hover": {
                backgroundColor: "#e9a3c1",
              },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleDelete(item.id)}
            sx={{
              backgroundColor: "#ffcccb",
              color: "#4a2e2e",
              "&:hover": {
                backgroundColor: "#fca5a5",
              },
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;




// import React, { useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
// } from "@mui/material";

// const ProductCard = ({ item }) => {
//   const { products, setProducts, currentUser } = useContext(DataContext);
//   const navigate = useNavigate();

//   const isAdmin = currentUser?.role === "ADMIN";
//   const isUser = currentUser?.role === "USER";

//   // ✅ User Buy Logic
//   const handleBuy = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3002/users/${currentUser.id}`);
//       const userData = res.data;
//       const existingOrders = userData.orders || [];

//       const newOrder = {
//         orderId: `C${Math.floor(1000 + Math.random() * 9000)}`,
//         cakeName: item.name,
//         quantity: 1,
//         price: item.price,
//         status: "processing",
//         deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
//           .toISOString()
//           .split("T")[0],
//       };

//       await axios.patch(`http://localhost:3002/users/${currentUser.id}`, {
//         orders: [...existingOrders, newOrder],
//       });

//       alert(`"${item.name}" added to your orders!`);
//     } catch (err) {
//       alert("Failed to add item to orders.");
//       console.error(err);
//     }
//   };

//   // ✅ Admin Edit Navigation
//   const handleEdit = () => {
//     navigate(`/edit/${item.id}`);
//   };

//   // ✅ Admin Delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/cakes/${id}`);
//       const updated = products.filter((p) => p.id !== id);
//       setProducts(updated);
//       alert("Deleted successfully");
//     } catch (err) {
//       alert("Failed to delete");
//       console.error(err);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         width: 280,
//         margin: 2,
//         borderRadius: "20px",
//         boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
//         backgroundColor: "#fff7f0",
//         transition: "transform 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.02)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="180"
//         image={item.image}
//         alt={item.name}
//         sx={{
//           borderTopLeftRadius: "20px",
//           borderTopRightRadius: "20px",
//           objectFit: "cover",
//         }}
//       />
//       <CardContent sx={{ px: 2, py: 1.5 }}>
//         <Typography
//           variant="h6"
//           fontWeight="600"
//           sx={{ color: "#8d4a24", fontFamily: "cursive" }}
//         >
//           {item.name}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#5e3b1d", mt: 0.5 }}>
//           ₹{item.price} — {item.category}
//         </Typography>
//       </CardContent>

//       {/* ✅ User: Buy */}
//       {isUser && (
//         <CardActions sx={{ justifyContent: "center", pb: 2 }}>
//           <Button
//             size="small"
//             variant="contained"
//             onClick={handleBuy}
//             sx={{
//               backgroundColor: "#b5f2c5",
//               color: "#2f4f2f",
//               "&:hover": {
//                 backgroundColor: "#95e1a6",
//               },
//             }}
//           >
//             Buy
//           </Button>
//         </CardActions>
//       )}

//       {/* ✅ Admin: Edit + Delete */}
//       {isAdmin && (
//         <CardActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
//           <Button
//             size="small"
//             variant="contained"
//             sx={{
//               backgroundColor: "#f2b5d4",
//               color: "#4a2e2e",
//               "&:hover": {
//                 backgroundColor: "#e9a3c1",
//               },
//             }}
//             onClick={handleEdit}
//           >
//             Edit
//           </Button>
//           <Button
//             size="small"
//             variant="contained"
//             sx={{
//               backgroundColor: "#ffcccb",
//               color: "#4a2e2e",
//               "&:hover": {
//                 backgroundColor: "#fca5a5",
//               },
//             }}
//             onClick={() => handleDelete(item.id)}
//           >
//             Delete
//           </Button>
//         </CardActions>
//       )}
//     </Card>
//   );
// };

// export default ProductCard;





// import React, { useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";


// import {
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";

// const ProductCard = ({ item }) => {
//   const { products, setProducts, currentUser } = useContext(DataContext);
//   const navigate = useNavigate();

//   const isAdmin = currentUser?.role === "ADMIN";

//   const handleEdit = () => {
//     navigate(`/edit/${item.id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/cakes/${id}`);
//       const updated = products.filter((item) => item.id !== id);
//       setProducts(updated);
//       alert("Deleted successfully");
//     } catch (err) {
//       alert("Failed to delete");
//     }
//   };

//   return (
//     <Card
//       sx={{
//         width: 280,
//         margin: 2,
//         borderRadius: "20px",
//         boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
//         backgroundColor: "#fff7f0", // pastel peach
//         transition: "transform 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.02)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="180"
//         image={item.image}
//         alt={item.name}
//         sx={{
//           borderTopLeftRadius: "20px",
//           borderTopRightRadius: "20px",
//           objectFit: "cover",
//         }}
//       />
//       <CardContent sx={{ px: 2, py: 1.5 }}>
//         <Typography
//           variant="h6"
//           fontWeight="600"
//           sx={{ color: "#8d4a24", fontFamily: "cursive" }}
//         >
//           {item.name}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#5e3b1d", mt: 0.5 }}>
//           ₹{item.price} — {item.category}
//         </Typography>
//       </CardContent>

//       {isAdmin && (
//         <CardActions
//           sx={{
//             justifyContent: "center",
//             pb: 2,
//             gap: 1,
//           }}
//         >
//           <Button
//             size="small"
//             variant="contained"
//             sx={{
//               backgroundColor: "#f2b5d4", // soft pink
//               color: "#4a2e2e",
//               "&:hover": {
//                 backgroundColor: "#e9a3c1",
//               },
//             }}
//             onClick={handleEdit}
//           >
//             Edit
//           </Button>
//           <Button
//             size="small"
//             variant="contained"
//             sx={{
//               backgroundColor: "#ffcccb",
//               color: "#4a2e2e",
//               "&:hover": {
//                 backgroundColor: "#fca5a5",
//               },
//             }}
//             onClick={() => handleDelete(item.id)}
//           >
//             Delete
//           </Button>
//         </CardActions>
//       )}
//     </Card>
//   );
// };

// export default ProductCard;


// import React, { useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";


// const ProductCard = ({ item }) => {

//   const { products, setProducts } = useContext(DataContext);
//   const navigate = useNavigate();
//   const { currentUser } = useContext(DataContext);

//   const isAdmin = currentUser?.role === "ADMIN";

//   const handleEdit = () => {
//     navigate(`/edit/${item.id}`);
//   };

// const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:3001/cakes/${id}`);
//     const updated = products.filter((item) => item.id !== id);
//     setProducts(updated);
//     alert("Deleted successfully");
//   } catch (err) {
//     alert("Failed to delete");
//   }
// };

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         padding: "15px",
//         marginBottom: "15px",
//         borderRadius: "10px",
//         width: "300px",
//       }}
//     >
//       <img
//         src={item.image}
//         alt={item.name}
//         style={{
//           width: "100%",
//           height: "200px",
//           objectFit: "cover",
//           borderRadius: "8px",
//         }}
//       />
//       <h3>{item.name}</h3>
//       <p>Price: ₹{item.price}</p>
//       <p>Category: {item.category}</p>

//       {isAdmin && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "10px",
//             marginTop: "10px",
//           }}
//         >
//           <button
//             onClick={handleEdit}
//             style={{
//               padding: "6px 12px",
//               backgroundColor: "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(item.id)}
//             style={{
//               padding: "6px 12px",
//               backgroundColor: "red",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;


// import React from "react";

// function ProductCard({ item }) {
//   const getRatingColor = (rating) => {
//     if (rating >= 4.5) return "green";
//     if (rating >= 4.0) return "orange";
//     return "red";
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid #eee",
//         borderRadius: "8px",
//         padding: "10px",
//         margin: "10px",
//         width: "220px",
//         textAlign: "center",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)"
//       }}
//     >
//       <img
//         src={`/${item.image}`}
//         alt={item.name}
//         style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
//       />
//       <h4>{item.name}</h4>
//       <p>₹{item.price} | {item.weight}kg</p>

//       {/* Conditional Rating Display */}
//       {item.rating && (
//         <p style={{ color: getRatingColor(item.rating), fontWeight: "bold" }}>
//           * {item.rating}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ProductCard;


//https://chatgpt.com/share/687e5cd7-75b8-8011-987c-1f7e08c3080e