// import { configureStore, createSlice } from "@reduxjs/toolkit";

// // Product slice
// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     Veg: [
//       { name: 'Tomato', price: 200.12 },
//       { name: 'Potato', price: 100.25 },
//       { name: 'Carrot', price: 75.25 },
//     ],
//     NonVeg: [
//       { name: 'Chicken', price: 800.45 },
//       { name: 'Mutton', price: 1000.23 },
//       { name: 'Fish', price: 200.23 }
//     ],
//   },
//   reducers: {}
// });

// // Cart slice
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.find(item => item.name === action.payload.name);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     }
//   }
// });

// // Configure a single store with both reducers
// const store = configureStore({
//   reducer: {
//     products: productsSlice.reducer,
//     cart: cartSlice.reducer,
//   }
// });

// export default store;
// export const { addToCart } = cartSlice.actions;


import { configureStore, createSlice } from "@reduxjs/toolkit";

// Product slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'Tomato', price: 80.12 },
      { name: 'Potato', price: 30.25 },
      { name: 'Carrot', price: 55.25 },
      { name: 'LadiesFinger', price: 35.25 },
      { name: 'Brinjal', price: 40.25 },
    ],
    NonVeg: [
      { name: 'Chicken', price: 250.45 },
      { name: 'Mutton', price: 800.23 },
      { name: 'Fish', price: 400.23 },
      { name: 'Mutton Pickle', price: 600.23 },
      { name: 'Egg', price: 6.23 },
    ],
    Snacks: [
      { name: 'Lays', price: 20 },
      { name: 'Kurkure', price: 10 },
      { name: 'Bingo', price: 30 },
      { name: 'Biscuits', price: 25 },
    ]
  },
  reducers: {}
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter(cartItem => cartItem.name !== item.name);
      }
    },
    removeFromCart: (state, action) => state.filter(item => item.name !== action.payload.name),
    clearCart: () => []
  }
});

// Purchase history slice
const purchaseHistorySlice = createSlice({
  name: 'purchaseHistory',
  initialState: [],
  reducers: {
    addPurchase: (state, action) => {
      state.push(action.payload);
    }
  }
});

// Configure store
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    purchaseHistory: purchaseHistorySlice.reducer,
  }
});

export default store;
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const { addPurchase } = purchaseHistorySlice.actions;
