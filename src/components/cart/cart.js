import React, {useEffect, useState} from 'react';
import './cart.css';
import back from '../../images/left-arrow.png'
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import Cancel from "../../images/cancel.png";
import formatCurrency from "../../utils/currencyFormatter";


const GET__ALL_CURRENCY = gql`
{
   currency
}
`
const Cart = ({setOpenCart, currency, onSelectCurrency, carty, setCartList}) => {


    const [subtotal, setSubtotal] = useState(0);

    const closeCartItems = () => {
        setOpenCart(false);
    }

    const keys = Object.keys(carty);



    const increment = (id, quantity) => {
        setCartList({
            type: 'QuantityChange',
            id,
            quantity: quantity + 1,
        });
    }
    const deleteCartItem = (id) => {
        setCartList({type: 'Delete', id})
    }
    const decrement = (id, quantity) => {
        if (quantity === 1) {
            return setCartList({type: "Delete", id})
        }
        setCartList({
            type: 'QuantityChange',
            id,
            quantity: quantity - 1,
        });
    }
    const updateCurrency = (selectedCurrency) => {
        onSelectCurrency(selectedCurrency.target.value);
    }


    useEffect(
        () => {
            function subtotalCalculation() {
                const subtotal = keys.reduce((total, currentKey) => {
                    return (total =
                        total +
                        carty[currentKey].product.price *
                        carty[currentKey].quantity);
                }, 0);
                setSubtotal(subtotal);
            }

            subtotalCalculation();
        },
        [carty]
    );

    return (

        <div className="cart__wrapper" id="showCart">
            <div className="right-cart">
                <div className="cart-top">
                    <img src={back} alt="back" height="20" width="20" onClick={() => closeCartItems()}/>
                    <h5 className="cart-title">Your cart</h5>
                    <p></p>
                </div>
                <div className="currency-row">
                    <Query query={GET__ALL_CURRENCY}>
                        {
                            ({loading, data}) => {
                                return (
                                    <select className="currency-select" onChange={updateCurrency} value={currency}>
                                        {
                                            data?.currency && data?.currency.map((curr, index) => (
                                                <option key={index} value={curr}>{curr}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                        }
                    </Query>

                </div>
                <div className="item-row">
                    {
                        keys?.length === 0 &&
                        <p> You dont have any item in your cart!</p>
                    }


                    {
                        keys?.map((key, index) => (
                            <div className="cartItem-wrapper" key={index}>
                                <div className="cartItem-details">
                                    <div className="item-top">
                                        <h6> {carty[key].product.title}</h6>
                                        <img src={Cancel} width="10" onClick={() => deleteCartItem(key)} height="10"
                                             alt="" className="cancelItem"/>
                                    </div>
                                    <img src={carty[key].product.image_url} alt="" width="40" height="40"
                                         className="img-small"/>
                                    <div className="quantity-price">
                                        <div className="quantity-select">
                                            <span className="counter-action"
                                                  onClick={() => decrement(key, carty[key].quantity)}>-</span>
                                            <span className="counter-action-value">{carty[key].quantity}</span>
                                            <span className="counter-action"
                                                  onClick={() => increment(key, carty[key].quantity)}>+</span>
                                        </div>
                                        <span>{formatCurrency((carty[key].product.price * carty[key].quantity), currency)}</span>
                                        <p></p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>


                    <div className="cart-footer">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div className="footer-details">
                            <button
                                className="purchase">make this a subscription save
                            </button>
                            <button
                                className="checkout"> proceed to checkout
                            </button>

                        </div>
                    </div>

            </div>
        </div>


    )
}
export default Cart