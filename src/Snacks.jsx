// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from './store';

// function Snacks() {
//     const snackProducts = useSelector(state => state.products.Snacks);
//     const dispatch = useDispatch();

//     return (
//         <div>
//             <h2>Snacks</h2>
//             <ul>
//                 {snackProducts.map((product, index) => (
//                     <li key={index}>
//                         {product.name} - ${product.price.toFixed(2)}
//                         <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Snacks;


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, fetchProducts } from './store';

function Snacks() {
    const snackProducts = useSelector(state => state.products.snacks || []); // lowercase & safe fallback
    const status = useSelector(state => state.products.status);
    const dispatch = useDispatch();

    // Default static snacks (used if API doesn't return snacks)
    const defaultSnacks = [
        { name: 'Samosa', price: 20 },
        { name: 'Chips', price: 15 },
        { name: 'Sandwich', price: 50 },
        { name: 'Burger', price: 80 },
    ];

    useEffect(() => {
        if (status === '') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // If API gives snacks, use them; otherwise fallback to defaultSnacks
    const itemsToShow = snackProducts.length > 0 ? snackProducts : defaultSnacks;

    return (
        <div>
            <h2>Snacks</h2>
            <ul>
                {itemsToShow.map((product, index) => (
                    <li key={index}>
                        {product.name} - ₹{product.price.toFixed(2)}
                        <button 
                            onClick={() => dispatch(addToCart(product))}
                            style={{ marginLeft: "10px" }}
                        >
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Snacks;
