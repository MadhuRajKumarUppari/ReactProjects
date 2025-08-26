// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from './store';


// function Veg() {
//     const vegProducts = useSelector(state => state.products.veg);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (statuss === '') {
//           dispatch(fetchProducts());
//         }
//       }, [statuss, dispatch]);

//     const items = vegProducts.map((product, index) => (
//         <li key={index}>
//             {product.name} - ${product.price.toFixed(2)}
//             <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
//         </li>
//     ));

//     return (
//         <>
//             <h2>Veg products</h2>
//             <ul>{items}</ul>
//         </>
//     );
// }

// export default Veg;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchProducts } from './store';

function Veg() {
    const vegProducts = useSelector(state => state.products.veg);
    const status = useSelector(state => state.products.status);
    const dispatch = useDispatch();

    // Default static items (will be shown if API is not yet loaded)
    const defaultVeg = [
        { name: 'Tomato', price: 40 },
        { name: 'Potato', price: 30 },
        { name: 'Carrot', price: 50 },
        { name: 'Onion', price: 45 },
    ];

    useEffect(() => {
        if (status === '') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // If API gives products, use them, otherwise fallback to defaultVeg
    const itemsToShow = vegProducts.length > 0 ? vegProducts : defaultVeg;

    return (
        <>
            <h2>Veg Products</h2>
            <ul>
                {itemsToShow.map((product, index) => (
                    <li key={index}>
                        {product.name} - ₹{product.price.toFixed(2)}
                        <button 
                            onClick={() => dispatch(addToCart(product))}
                            style={{ marginLeft: "10px" }}
                        >
                            Add to cart
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Veg;
