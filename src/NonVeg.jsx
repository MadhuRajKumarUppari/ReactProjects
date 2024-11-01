import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';


function NonVeg() {
    const nonVeg = useSelector(state => state.products.NonVeg);
    const dispatch = useDispatch();

    const list = nonVeg.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
        </li>
    ));

    return (
        <>
            <h2>NonVeg Items..</h2>
            <ul>{list}</ul>
        </>
    );
}

export default NonVeg;
