// // Cart.jsx
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from "./store";


// const Cart = () => {
//   const cartItems = useSelector(state => state.cart);
//   const dispatch = useDispatch();

//   return (
//       <>
//           <h2>Shopping Cart</h2>
//           {cartItems.length === 0 ? (
//               <p>Your cart is empty</p>
//           ) : (
//               cartItems.map(item => (
//                   <li key={item.name}>
//                       <p>{item.name} - Quantity: {item.quantity}
//                       <button onClick={() => dispatch(incrementQuantity(item))}>     +</button>
//                       <button onClick={() => dispatch(decrementQuantity(item))}>    -</button>
//                       <button onClick={() => dispatch(removeFromCart(item))}>Remove</button></p>
//                   </li>
//               ))
//           )}
//           <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
//       </>
//   );
// };

// export default Cart;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart, addPurchase } from "./store";

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0); // Percentage-based discount
  const [couponDiscount, setCouponDiscount] = useState(0); // Coupon discount
  const [couponCode, setCouponCode] = useState(""); // Coupon code
  const [appliedCoupon, setAppliedCoupon] = useState(false); // Track coupon application

  // Function to calculate prices with discounts
  const calculatePrices = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const percentageDiscount = total * (discount / 100);
    const couponDiscountAmount = total * (couponDiscount / 100);
    const netAmount = total - percentageDiscount - couponDiscountAmount;

    return { total, percentageDiscount, couponDiscountAmount, netAmount };
  };

  const { total, percentageDiscount, couponDiscountAmount, netAmount } = calculatePrices();

  const handleApplyCoupon = () => {
    if (couponCode === "MRK10") {
      setCouponDiscount(10);
      setAppliedCoupon(true);
    } else if (couponCode === "MRK20") {
      setCouponDiscount(20);
      setAppliedCoupon(true);
    } else if (couponCode === "MRK30") {
      setCouponDiscount(30);
      setAppliedCoupon(true);
    } else {
      alert("Invalid Coupon Code");
      setCouponDiscount(0);
      setAppliedCoupon(false);
    }
  };

  const handlePurchase = () => {
    const purchaseData = {
      items: cartItems,
      total: netAmount.toFixed(2),
      discount: discount + couponDiscount,
      timestamp: new Date().toLocaleString()
    };
    dispatch(addPurchase(purchaseData));
    alert(`Thank you for your purchase! Total: $${netAmount.toFixed(2)}`);
    dispatch(clearCart());
    setDiscount(0);
    setCouponDiscount(0);
    setCouponCode("");
    setAppliedCoupon(false);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div>
                    <button onClick={() => dispatch(decrementQuantity(item))}>-</button>
                    <span style={{ margin: "0 10px" }}>Quantity: {item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
                    <button onClick={() => dispatch(removeFromCart(item))} style={{ marginLeft: "10px" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total Amount for All Products: ${total.toFixed(2)}</h3>

          {/* Percentage Discount Buttons */}
          <div>
            <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscount(30)}>Apply 30% Discount</button>
          </div>

          {/* Coupon Code Input and Application */}
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="coupon-input"
          />
          <button onClick={handleApplyCoupon} className="apply-button">Apply Coupon</button>

          {/* Display Discount Details */}
          {discount > 0 && <p>Percentage Discount Applied: -${percentageDiscount.toFixed(2)} ({discount}%)</p>}
          {appliedCoupon && <p>Coupon Discount Applied: -${couponDiscountAmount.toFixed(2)} ({couponDiscount}%)</p>}

          <h3>Customer To Pay: ${netAmount.toFixed(2)}</h3>

          <button
            onClick={handlePurchase}
            style={{
              color: "white",
              backgroundColor: "green",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Purchase
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            style={{
              color: "white",
              backgroundColor: "red",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "10px"
            }}
          >
            Clear Cart
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
