import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import Header from "./Header";
import Hero from "./Hero";
import Main from "./Main";
import Footer from "./Footer";
import { BrowserRouter} from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import MUI components

//create context here by exporting in order to access globally

export const DataContext = createContext();

  


function App() {

  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const[isLoggedIn, setisLoggedIn] = useState(false);
  const[currentUser, setcurrentUser] = useState({});
  

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [products, setProducts] = useState([]);



 useEffect(() => {
    axios
      .get("http://localhost:3001/cakes")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // Whenever filters or products change, recalculate filteredProducts
  useEffect(() => {
    
    const result = products
      .filter((item) => {
        const matchCategory =
          categoryFilter.toLowerCase() === "all" ||
          item.category.toLowerCase() === categoryFilter.toLowerCase();
        const matchSearch = item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        else if (sortOrder === "desc") return b.price - a.price;
        else return 0;
      });

    setFilteredProducts(result); // Set state here
  }, [products, categoryFilter, searchTerm, sortOrder]);


// ------ cat count
  
const getCategoryCounts = () => {
  const counts = {};

  products.forEach((item) => {
    const cat = item.category.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  });

  counts["all"] = products.length;
  return counts;
};

const categoryCounts = getCategoryCounts();


const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" | "warning" | "info" | "success"
  });

  // Function to show Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Function to close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  
  return (
      
        <DataContext.Provider value={{
  isLoggedIn,
  setisLoggedIn,
  currentUser,
  setcurrentUser,
  products,
  setProducts,
  filteredProducts,
  showSnackbar
                                   }}>


      <div >
        
        
       
        <BrowserRouter>
        <Header
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categoryCounts={categoryCounts}
        />
        {/* Routes define which component to render based on URL */}
        <Hero />
      
<Main filteredProducts={filteredProducts}/>
        {/* Footer is always visible */}
       
 </BrowserRouter>
   <Footer />

   {/* Snackbar Component (renders at the root level) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500} // Auto-close after 3.5 sec
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>    
   
      </div>
     
       </DataContext.Provider>
 );
}

export default App;




 //  <BrowserRouter>
  
  //     <Header
  //   <div>
  //       categoryFilter={categoryFilter}
  //       setCategoryFilter={setCategoryFilter}
  //       searchTerm={searchTerm}
  //       setSearchTerm={setSearchTerm}
  //       sortOrder={sortOrder}
  //       setSortOrder={setSortOrder}
  //       categoryCounts={categoryCounts}
  //     />
  //     {/* <Hero /> */}
  //     {/* <Main filteredProducts={filteredProducts} /> */}
  //      <Routes>
  //       <Route
  //         path="/"
  //         element={
  //           <>
  //             <Hero />
  //             <Main filteredProducts={filteredProducts} />
  //           </>
  //         }
  //       />
  //       <Route path="./AboutUS" element={<AboutUs />} />
  //       <Route path="./ContactUs" element={<ContactUs />} />
  //     </Routes>
  //     <Footer />
  //   </div>
  //   </BrowserRouter>





// edits 1


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Hero from "./Hero";
// import Main from "./Main";
// import Footer from "./Footer";
// import Header from "./Header";

// function App() {
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]); //to store the fetched products (cakes in this case)

//   // useEffect(() => {
//   //   fetch("http://localhost:3000/cakes")
//   //      .then((res) => res.json())
//   //     .then((data) => setProducts(data))
//   //     .catch((err) => console.error("Fetch error:", err));
//   // }, []);
// //npx json-server --watch src/data/cakes.json --port 3001

//   useEffect(() => {
//     axios.get("http://localhost:3001/cakes")
//       .then((res) => setProducts(res.data))
//       .catch((error) => console.error("Fetch error:", error));
//   }, []);
  
// //both categoryFilter and searchTerm are used to filter the products
// //so when we change categoryFilter or searchTerm, we will re-filter the products
//   const filteredProducts = products.filter((item) => {
//     const matchCategory =
//       categoryFilter.toLowerCase() === "all" ||
//       item.category.toLowerCase() === categoryFilter.toLowerCase();
//     const matchSearch = item.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   return (
//     <div>
//       <Header
//         categoryFilter={categoryFilter}
//         setCategoryFilter={setCategoryFilter}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//       />
//       <Hero />
//       <Main filteredProducts={filteredProducts} />
//       <Footer />
//     </div>
//   );
// }

// export default App;


















// // https://chatgpt.com/c/6867b502-dbdc-8011-8872-9e329fdd9ee7

