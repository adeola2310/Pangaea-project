import React, {useState} from 'react';
import './cart.css';
import back from '../../images/left-arrow.png'
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import Cancel from "../../images/cancel.png";
import formatter from "../../utils/currencyFormatter";


const GET__ALL_CURRENCY = gql`
{
   currency
}
`
const Cart = ({setOpenCart, carty, deleteCart }) => {


    const closeCartItems = () => {
        setOpenCart(false);
    }

    const increment = ()=>{

    }



    const decrement = () => {

    }

    const subTotal = () => {
        const subTotalValue = carty?.reduce((acc, curr) => {
            const grandTotal = acc + curr.price * curr.quantity;
            return grandTotal;
        }, 0);
        return formatter.format(subTotalValue);
    }


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
                                    <select className="currency-select">
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
                        carty?.length === 0  &&
                            <p> No Items added to cart yet!</p>
                    }


                    {
                        carty?.map((item, index) => (
                            <div className="cartItem-wrapper" key={index}>
                                <div className="cartItem-details">
                                    <div className="item-top">
                                        <h6> {item.title}</h6>
                                        <img src={Cancel} width="10" onClick={()=>deleteCart(index)} height="10" alt="" className="cancelItem"/>
                                    </div>
                                    <img src={item.image_url} alt="" width="40" height="40" className="img-small"/>
                                    <div className="quantity-price">
                                        <div className="quantity-select">
                                            <span className="counter-action">-</span>
                                            <span className="counter-action-value">{item.quantity}</span>
                                            <span className="counter-action">+</span>
                                        </div>
                                        <span>{formatter.format(item.price * item.quantity)}</span>
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
                            <span>{subTotal() || 0}</span>
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