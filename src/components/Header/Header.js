import React from 'react';
import './Header.css';
import Logo from '../../images/lumen.png'
const Header = ()=>{
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
        <span className="cart">Cart(0)</span>
    </div>
</div>
        </div>
    )
}

export default Header