import React from 'react';
import './Header.css';
import Logo from '../../images/lumen.png'

const Header = ({ numberOfItem, setOpenCart, openCart}) => {



    return (
        <div className="nav">
            <div className="nav__details">
                <img src={Logo} alt="logo" className="logo"/>
                <ul className="nav__details--lists">
                    <li className="list">Shop</li>
                    <li className="list">Help</li>
                    <li className="list">Blog</li>
                </ul>
                <div className="nav__details--cart">
                    <span className="cart">Account</span>
                    <span className="cart" onClick={()=>setOpenCart(!openCart)}>Cart({numberOfItem})</span>
                </div>
            </div>


        </div>
    )
}

export default Header