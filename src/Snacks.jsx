import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './store';

function Snacks() {
    const snackProducts = useSelector(state => state.products.Snacks);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Snacks</h2>
            <ul>
                {snackProducts.map((product, index) => (
                    <li key={index}>
                        {product.name} - ${product.price.toFixed(2)}
                        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Snacks;
