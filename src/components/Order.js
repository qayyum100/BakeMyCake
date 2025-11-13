import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./App";
import axios from "axios";

const Order = () => {
  const { currentUser } = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/users")
      .then((res) => {
        if (currentUser.role === "ADMIN") {
          // Admin can see all orders
          const allOrders = res.data.flatMap(user =>
            (user.orders || []).map(order => ({
              ...order,
              customerName: user.name,
              customerEmail: user.email
            }))
          );
          setOrders(allOrders);
        } else {
          // Normal user sees only their orders
          const user = res.data.find((u) => u.email === currentUser.email);
          if (user && user.orders) {
            setOrders(user.orders);
          } else {
            setOrders([]);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch orders", err));
  }, [currentUser]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {currentUser.role === "ADMIN"
          ? "Customers Orders Stats"
          : `${currentUser.name}'s Orders`}
      </h2>

      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {currentUser.role === "admin" && <th>Customer Name</th>}
              <th>Order ID</th>
              <th>Cake Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                {currentUser.role === "admin" && (
                  <td>{order.customerName}</td>
                )}
                <td>{order.orderId}</td>
                <td>{order.cakeName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>{order.status}</td>
                <td>{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;





// // Order.js
// import React, { useContext, useEffect, useState } from "react";
// import { DataContext } from "./App";
// import axios from "axios";

// const Order = () => {
//   const { currentUser } = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch user data again from backend to get updated orders (optional)
//     axios.get("http://localhost:3002/users")
//       .then((res) => {
//         const user = res.data.find((u) => u.email === currentUser.email);
//         if (user && user.orders) {
//           setOrders(user.orders);
//         } else {
//           setOrders([]);
//         }
//       })
//       .catch((err) => console.error("Failed to fetch orders", err));
//   }, [currentUser]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>{currentUser.name}'s Orders</h2>
//       {orders.length === 0 ? (
//         <p>You don't have any orders yet.</p>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Cake Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={index}>
//                 <td>{order.orderId}</td>
//                 <td>{order.cakeName}</td>
//                 <td>{order.quantity}</td>
//                 <td>₹{order.price}</td>
//                 <td>{order.status}</td>
//                 <td>{order.deliveryDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Order;
