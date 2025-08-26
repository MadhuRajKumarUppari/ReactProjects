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


import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
      try {
          const response = await axios.get(`http://localhost:8989/api/v1/getproducts`); 
          const products = response.data;

          // Filtering the items based on thier category
          const veg = products.filter(item => item.category === 'veg');
          const nonVeg = products.filter(item => item.category === 'nonveg');
          return { veg, nonVeg };
      } catch (error) {
          throw Error("Failed to fetch products");
      }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
      veg: [],
      nonVeg: [],
      status: '',
      error: null
  },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchProducts.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.veg = action.payload.veg || [];
              state.nonVeg = action.payload.nonVeg || [];
          })
          .addCase(fetchProducts.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
  },
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
