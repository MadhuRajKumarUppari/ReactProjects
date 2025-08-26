// import React from 'react'

// function PurchaseHistory() {
//   return (
//     <>
//         <h1> This is Purchase History Page</h1>
//     </>
//   )
// }

// export default PurchaseHistory


import React from "react";
import { useSelector } from "react-redux";
// import './PurchaseHistory.css'; // Import the CSS file

const PurchaseHistory = () => {
  const purchaseHistory = useSelector(state => state.purchaseHistory);

  return (
    <div className="purchase-history"> {/* Add the main container class */}
      <h2>Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No items purchased yet.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase, index) => (
            <li key={index}>
              <h4>Purchase - {index + 1}</h4>
              <p>Date & Time: {purchase.timestamp}</p>
              <p>Total Amount: ${purchase.total}</p>
              <p>Discount Applied: {purchase.discount}%</p>
              <ul className="items"> {/* Add class for item details */}
                {purchase.items.map((item, idx) => (
                  <li key={idx}>{item.name} - Quantity: {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>

    
  );

  
};

export default PurchaseHistory;
