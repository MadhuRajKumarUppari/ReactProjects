// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from './store';


// function NonVeg() {
//     const nonVeg = useSelector(state => state.products.NonVeg);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (status === '') {
//           dispatch(fetchProducts());
//         }
//       }, [status, dispatch]);

//     const list = nonVeg.map((product, index) => (
//         <li key={index}>
//             {product.name} - ${product.price.toFixed(2)}
//             <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
//         </li>
//     ));

//     return (
//         <>
//             <h2>NonVeg Items..</h2>
//             <ul>{list}</ul>
//         </>
//     );
// }

// export default NonVeg;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchProducts } from './store';

function NonVeg() {
    const nonVegProducts = useSelector(state => state.products.nonVeg);
    const status = useSelector(state => state.products.status);
    const dispatch = useDispatch();

    // Default static Non-Veg items (used if API is empty)
    const defaultNonVeg = [
        { name: 'Chicken', price: 220 },
        { name: 'Mutton', price: 650 },
        { name: 'Fish', price: 300 },
        { name: 'Prawns', price: 450 },
    ];

    useEffect(() => {
        if (status === '') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // If API gives products, use them; otherwise show defaultNonVeg
    const itemsToShow = nonVegProducts.length > 0 ? nonVegProducts : defaultNonVeg;

    return (
        <>
            <h2>Non-Veg Products</h2>
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

export default NonVeg;
