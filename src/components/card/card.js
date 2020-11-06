import React, {useState} from 'react';
import './card.css';
import Cart from "../cart/cart";
import formatter from "../../utils/currencyFormatter";

const Card = ({productDetails}) => {
    const [cartHolder, setCartHolder] = useState(false);

    const addToCart = () => {
        console.log("here")
        setCartHolder(true);
    }


    return (
        <div className="card">
            <div className="card__content">
                <img src={productDetails.image_url} aria-hidden alt="product image" height="180" width="180"
                     className="product-image"/>
                <p className="card__content-name">{productDetails.title}</p>
                <span className="price"> From {formatter.format(productDetails.price)}</span>
                <button className="add-to-cart" onClick={() => addToCart()}>Add to Cart</button>
            </div>


            {
                cartHolder &&
                <Cart  />
            }
        </div>
    )
}

export default Card