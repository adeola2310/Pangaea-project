import React from 'react';
import './card.css';
import formatCurrency from "../../utils/currencyFormatter";

const Card = ({productDetails, currency, addToCart}) => {


    const onAdd = () => {
        addToCart(productDetails);
    }

    return (
        <div className="card">
            <div className="card__content">
                <img src={productDetails.image_url} aria-hidden alt="product image" height="180" width="180"
                     className="product-image"/>
                <p className="card__content-name">{productDetails.title}</p>
                <span className="price"> From {formatCurrency(productDetails.price, currency)}</span>
                <button className="add-to-cart" onClick={() => onAdd()}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Card