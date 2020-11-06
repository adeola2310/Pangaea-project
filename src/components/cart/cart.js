import React, {useState} from 'react';
import './cart.css';
import back from '../../images/left-arrow.png'
import CartItem from "../cart-item/cartItem";
import { Query } from 'react-apollo';
import { gql} from 'apollo-boost';


const GET__ALL_CURRENCY = gql`
{
   currency
}
`


const Cart = () => {

    const [closeCart, setCloseCart] = useState(true);

    const closeCartItems = ()=>{
        setCloseCart(false);
    }




    return (
        <>
            {
                closeCart &&
                <div className="cart__wrapper" id="showCart">
                    <div className="right-cart">
                        <div className="cart-top">
                            <img src={back} alt="back" height="20" width="20" onClick={()=>closeCartItems()}/>
                            <h5 className="cart-title">Your cart</h5>
                            <p></p>
                        </div>
                        <div className="currency-row">
                            <Query query={GET__ALL_CURRENCY}>
                                {
                                    ({loading, data})=>{
                                        return(
                                            <select className="currency-select">
                                                {
                                                    data?.currency && data?.currency.map((curr, index)=>(
                                                        <option value={curr}>{curr}</option>
                                                    ))
                                                }
                                            </select>




                                        )
                                    }
                                }
                            </Query>

                        </div>
                        <div className="item-row">
                            <CartItem/>
                            <CartItem/>
                            <CartItem/>
                        </div>
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span>600</span>
                            </div>
                            <div className="footer-details">
                                <button
                                    className="purchase">make this a subscription save</button>
                                <button
                                    className="checkout"> proceed to checkout</button>

                            </div>
                        </div>
                    </div>
                </div>

            }
            </>
    )
}
export default Cart