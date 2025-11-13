import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./App";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  IconButton,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

function Header({
  categoryFilter,
  setCategoryFilter,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  categoryCounts,
}) {
  const { isLoggedIn, setisLoggedIn, currentUser, setcurrentUser, showSnackbar } = useContext(DataContext);
  const navigate = useNavigate();

  const categories = [
    "all", "cakes", "cookies", "brownies", "cheese cakes",
    "cup cakes", "chocolates", "muffins"
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setisLoggedIn(false);
      setcurrentUser({});
      showSnackbar(`Logged-Out...`, "success");
      navigate("/");
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <AppBar position="fixed" sx={{ bgcolor: "#fff3e0", borderBottom: "2px solid #ffe0b2", zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h5" sx={{ color: "#fb8c00", fontWeight: "bold" }}>
            🧁 Diary Delights
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => navigate("/")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
              Home
            </Button>
            <Button variant="outlined" onClick={() => navigate("/aboutUs")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
              About
            </Button>
            <Button variant="outlined" onClick={() => navigate("/contactUs")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
              Contact
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            {isLoggedIn ? (
              <>
                <Typography variant="body1" sx={{ color: "#6d4c41", fontWeight: "bold" }}>
                  Hi, {currentUser.role}
                </Typography>
                <Button variant="outlined" onClick={() => navigate("/orders")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
                  Orders
                </Button>
                <Button variant="outlined" onClick={() => navigate("/userhome")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
                  {currentUser.role} Home
                </Button>
                <Button variant="outlined" onClick={handleLogout} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={() => navigate("/signup")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
                  Signup
                </Button>
                <Button variant="outlined" onClick={() => navigate("/login")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
                  Login
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Offset for AppBar */}
      <Toolbar />

      {/* Fixed Filtering and Sorting Toolbar */}
      <Box
        sx={{
          position: "fixed",
          top: 64, // Height of AppBar
          width: "100%",
          bgcolor: "#fffefc",
          zIndex: 1200,
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ maxWidth: 500, mx: "auto", position: "relative" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search cakes, cookies, brownies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          {searchTerm && (
            <IconButton
              size="small"
              onClick={() => setSearchTerm("")}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#f44336"
              }}
              aria-label="Clear"
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>

        {/* Category Filters */}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={`${cat} (${categoryCounts[cat] || 0})`}
              onClick={() => setCategoryFilter(cat)}
              color={categoryFilter === cat ? "warning" : "default"}
              variant={categoryFilter === cat ? "filled" : "outlined"}
              sx={{ textTransform: "capitalize" }}
            />
          ))}
        </Stack>

        {/* Sort Options */}
        <RadioGroup
          row
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ mt: 1 }}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Price: Low to High" />
          <FormControlLabel value="desc" control={<Radio />} label="Price: High to Low" />
          <FormControlLabel value="" control={<Radio />} label="Default" />
        </RadioGroup>
      </Box>

      {/* Offset for fixed filters */}
      <Box sx={{ height: '220px' }} /> {/* Prevent content overlap below filters */}

    </>
  );
}

export default Header;



// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Stack,
//   TextField,
//   IconButton,
//   Chip,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Paper,
// } from "@mui/material";
// import ClearIcon from '@mui/icons-material/Clear';

// function Header({
//   categoryFilter,
//   setCategoryFilter,
//   searchTerm,
//   setSearchTerm,
//   sortOrder,
//   setSortOrder,
//   categoryCounts,
// }) {
//   const { isLoggedIn, setisLoggedIn, currentUser, setcurrentUser, showSnackbar } = useContext(DataContext);
//   const navigate = useNavigate();

//   const categories = [
//     "all", "cakes", "cookies", "brownies", "cheese cakes",
//     "cup cakes", "chocolates", "muffins"
//   ];

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       setisLoggedIn(false);
//       setcurrentUser({});
//       showSnackbar(`Logged-Out...`, "success");
//       navigate("/");
//     }
//   };

//   return (
//     <>
//       {/* Fixed Header */}
//       <AppBar position="fixed" sx={{ bgcolor: "#fff3e0", borderBottom: "2px solid #ffe0b2", zIndex: 1300 }}>
//         <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//           <Typography variant="h5" sx={{ color: "#fb8c00", fontWeight: "bold" }}>
//             🧁 Diary Delights
//           </Typography>

//           <Stack direction="row" spacing={1}>
//             <Button variant="outlined" onClick={() => navigate("/")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//               Home
//             </Button>
//             <Button variant="outlined" onClick={() => navigate("/aboutUs")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//               About
//             </Button>
//             <Button variant="outlined" onClick={() => navigate("/contactUs")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//               Contact
//             </Button>
//           </Stack>

//           <Stack direction="row" spacing={1} alignItems="center">
//             {isLoggedIn ? (
//               <>
//                 <Typography variant="body1" sx={{ color: "#6d4c41", fontWeight: "bold" }}>
//                   Hi, {currentUser.role}
//                 </Typography>
//                 <Button variant="outlined" onClick={() => navigate("/orders")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//                   Orders
//                 </Button>
//                 <Button variant="outlined" onClick={() => navigate("/userhome")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//                   {currentUser.role} Home
//                 </Button>
//                 <Button variant="outlined" onClick={handleLogout} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button variant="outlined" onClick={() => navigate("/signup")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//                   Signup
//                 </Button>
//                 <Button variant="outlined" onClick={() => navigate("/login")} sx={{ color: "#ff7043", borderColor: "#ffcc80" }}>
//                   Login
//                 </Button>
//               </>
//             )}
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       {/* Toolbar offset */}
//       <Toolbar />

//       {/* Content below the fixed header */}
//       <Box sx={{ p: 2 }}>
//         {/* Search Field */}
//         <Box sx={{ position: "relative", maxWidth: 500 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search cakes, cookies, brownies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             size="small"
//           />
//           {searchTerm && (
//             <IconButton
//               size="small"
//               onClick={() => setSearchTerm("")}
//               sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#f44336" }}
//               aria-label="Clear"
//             >
//               <ClearIcon />
//             </IconButton>
//           )}
//         </Box>

//         {/* Category Chips */}
//         <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={`${cat} (${categoryCounts[cat] || 0})`}
//               onClick={() => setCategoryFilter(cat)}
//               color={categoryFilter === cat ? "warning" : "default"}
//               variant={categoryFilter === cat ? "filled" : "outlined"}
//               sx={{ textTransform: "capitalize" }}
//             />
//           ))}
//         </Stack>

//         {/* Sort Options */}
//         <Paper variant="outlined" sx={{ mt: 2, p: 1 }}>
//           <RadioGroup
//             row
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <FormControlLabel value="asc" control={<Radio />} label="Price: Low to High" />
//             <FormControlLabel value="desc" control={<Radio />} label="Price: High to Low" />
//             <FormControlLabel value="" control={<Radio />} label="Default" />
//           </RadioGroup>
//         </Paper>
//       </Box>
//     </>
//   );
// }

// export default Header;



// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";

// function Header({
//   categoryFilter,
//   setCategoryFilter,
//   searchTerm,
//   setSearchTerm,
//   sortOrder,
//   setSortOrder,
//   categoryCounts,
// }) {
//   const { isLoggedIn, setisLoggedIn, currentUser, setcurrentUser } = useContext(DataContext);
//   const navigate = useNavigate();
//   const { showSnackbar } = useContext(DataContext); // Get showSnackbar
//   const categories = [
//     "all", "cakes", "cookies", "brownies", "cheese cakes",
//     "cup cakes", "chocolates", "muffins"
//   ];

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       setisLoggedIn(false);
//       setcurrentUser({});
//       showSnackbar(`Logged-Out...`, "success");
//       navigate("/");
//     }
//   };

//   const buttonStyle = {
//     backgroundColor: "#fff",
//     border: "1px solid #ffcc80",
//     borderRadius: "5px",
//     padding: "6px 12px",
//     margin: "0 5px",
//     cursor: "pointer",
//     color: "#ff7043",
//     fontWeight: "bold",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
//   };

//   return (
//     <header style={{
//       backgroundColor: "#fff3e0",
//       padding: "15px 25px",
//       borderBottom: "2px solid #ffe0b2",
//       fontFamily: "'Segoe UI', sans-serif"
//     }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h1 style={{
//           color: "#fb8c00",
//           fontSize: "2rem",
//           margin: 0
//         }}>
//           🧁 Diary Delights
//         </h1>

//         <nav style={{ display: "flex", gap: "10px" }}>
//           <button style={buttonStyle} onClick={() => navigate("/")}>Home</button>
//           <button style={buttonStyle} onClick={() => navigate("/aboutUs")}>About</button>
//           <button style={buttonStyle} onClick={() => navigate("/contactUs")}>Contact</button>
//         </nav>

//         <div>
//           {isLoggedIn ? (
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <span style={{ color: "#6d4c41", fontWeight: "bold" }}>Hi, {currentUser.role}</span>
//               <button style={buttonStyle} onClick={() => navigate("/orders")}>Orders</button>
//               <button style={buttonStyle} onClick={() => navigate("/userhome")}>{currentUser.role} Home</button>
//               <button style={buttonStyle} onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <>
//               <button style={buttonStyle} onClick={() => navigate("/signup")}>Signup</button>
//               <button style={buttonStyle} onClick={() => navigate("/login")}>Login</button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Search */}
//       <div style={{ marginTop: "20px", position: "relative", maxWidth: "500px" }}>
//         <input
//           type="text"
//           placeholder="Search cakes, cookies, brownies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px 40px 10px 15px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             fontSize: "16px"
//           }}
//         />
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm("")}
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               border: "none",
//               background: "transparent",
//               fontSize: "20px",
//               color: "#f44336",
//               cursor: "pointer"
//             }}
//             aria-label="Clear search"
//           >
//             ×
//           </button>
//         )}
//       </div>

//       {/* Category Filters */}
//       <div style={{ marginTop: "15px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategoryFilter(cat)}
//             style={{
//               padding: "6px 12px",
//               borderRadius: "20px",
//               backgroundColor: categoryFilter === cat ? "#ffcc80" : "#f0f0f0",
//               color: categoryFilter === cat ? "#5d4037" : "#555",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "bold",
//               textTransform: "capitalize"
//             }}
//           >
//             {cat} ({categoryCounts[cat] || 0})
//           </button>
//         ))}
//       </div>

//       {/* Sorting Options */}
//       <div style={{ marginTop: "15px" }}>
//         <label style={{ marginRight: "15px" }}>
//           <input
//             type="radio"
//             value="asc"
//             checked={sortOrder === "asc"}
//             onChange={(e) => setSortOrder(e.target.value)}
//           /> Price: Low to High
//         </label>
//         <label style={{ marginRight: "15px" }}>
//           <input
//             type="radio"
//             value="desc"
//             checked={sortOrder === "desc"}
//             onChange={(e) => setSortOrder(e.target.value)}
//           /> Price: High to Low
//         </label>
//         <label>
//           <input
//             type="radio"
//             value=""
//             checked={sortOrder === ""}
//             onChange={(e) => setSortOrder(e.target.value)}
//           /> Default
//         </label>
//       </div>
//     </header>
//   );
// }

// export default Header;















// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./App";

// function Header({
//   categoryFilter,
//   setCategoryFilter,
//   searchTerm,
//   setSearchTerm,
//   sortOrder,
//   setSortOrder,
//   categoryCounts
// }) {
//   const { isLoggedIn, setisLoggedIn, currentUser, setcurrentUser } = useContext(DataContext);
//   const navigate = useNavigate();

//   const categories = [
//     "all", "cakes", "cookies", "brownies", "cheese cakes",
//     "cup cakes", "chocolates", "muffins"
//   ];

//   const handleLogout = () => {
//     if(window.confirm("Are you sure to log out?")){
//     setisLoggedIn(false);
//     setcurrentUser({});
//     navigate("/");}
//   };

//   const buttonStyle = {
//     background: "none",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "5px 10px",
//     margin: "0 5px",
//     cursor: "pointer",
//     textDecoration: "none",
//     color: "#0077cc"
//   };

//   return (
//     <div>
//       <header style={{ backgroundColor: "#fff8e1", padding: "10px 20px" }}>
//         <h1 style={{ color: "#ff7b00" }}>BakeMyCake</h1>
//         <nav className="navbar">
//           <div className="nav-left">
//             <button style={buttonStyle} onClick={() => navigate("/")}>Home</button>
//             <button style={buttonStyle} onClick={() => navigate("/aboutUs")}>About</button>
//             <button style={buttonStyle} onClick={() => navigate("/contactUs")}>Contact</button>
//           </div>

//           {isLoggedIn ? (
//             <div className="nav-right">
//               Hi, {currentUser.role}
//               <button onClick={() => navigate("/orders")}>Orders</button>
//               <button style={buttonStyle} onClick={() => navigate("/userhome")}>{currentUser.role} Home</button>
//               <button onClick={handleLogout} style={buttonStyle}>Logout</button>
//             </div>
//           ) : (
//             <div className="nav-right">
//               <button style={buttonStyle} onClick={() => navigate("/signup")}>Signup</button>
//               <button style={buttonStyle} onClick={() => navigate("/login")}>Login</button>
//             </div>
//           )}
//         </nav>



//       {/* {x} */}
//       <div style={{ position: "relative", maxWidth: "600px", marginBottom: "15px" , marginTop:"15px"}}>
//         <input
//           type="text"
//           placeholder="Search cakes, cookies, brownies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             padding: "8px 30px 8px 8px",
//             width: "100%",
//             border: "1px solid #ccc",
//             borderRadius: "5px"
//           }}
//         />
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm("")}
//             style={{
//               border:"bordor-radius",
//               position: "absolute",
//               right: "-105px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "#f0004",
//               cursor: "pointer",
//               fontSize: "22px",
//               color: "red"
//             }}
//             aria-label="Clear search"
//           >
//             ×
//           </button>
//         )}
//       </div>

//       {/* Category filter buttons */}
//       <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap" }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategoryFilter(cat)}
//             style={{
//               margin: "5px",
//               padding: "8px 14px",
//               backgroundColor: categoryFilter.toLowerCase() === cat ? "#ffb703" : "#e0e0e0",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               textTransform: "capitalize"
//             }}
//           >
//             {cat} ({categoryCounts[cat] || 0})
//           </button>
//         ))}
//       </div>

//       {/* Sorting radio buttons */}
//       <div style={{ margin: "10px 0" }}>
//         <label style={{ marginRight: "10px" }}>
//           <input
//             type="radio"
//             value="asc"
//             checked={sortOrder === "asc"}
//             onChange={(e) => setSortOrder(e.target.value)}
//           />{" "}
//           Price: Low to High
//         </label>
//         <label style={{ marginRight: "10px" }}>
//           <input
//             type="radio"
//             value="desc"
//             checked={sortOrder === "desc"}
//             onChange={(e) => setSortOrder(e.target.value)}
//           />{" "}
//           Price: High to Low
//         </label>
//         <label>
//           <input
//             type="radio"
//             value=""
//             checked={sortOrder === ""}
//             onChange={(e) => setSortOrder(e.target.value)}
//           />{" "}
//           Default
//         </label>
//       </div>
//     </header>

//     </div>
//   );
// }

// export default Header;


// https://chatgpt.com/share/68823eab-7de4-8011-9b4d-b454ca076d1a