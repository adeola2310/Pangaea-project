import React, {useState} from 'react';
import './cartItem.css';
import Image from '../../images/perf.png';
import Cancel from '../../images/cancel.png'


const CartItem = () => {
  const [quantity, setQuantity] = useState(1);


  const increment =()=>{
      setQuantity(quantity  +1);
  }

  const decrement =()=>{
      if (quantity === 0) {
          // to remove the cart item
          setQuantity(2);
      } else {
          setQuantity(quantity - 1);
      }
  }
    const closeItem = ()=> {
        var closebtns = document.getElementsByClassName("cartItem-details");
        var i;

        /* Loop through the elements, and hide the parent, when clicked on */
        for (i = 0; i < closebtns.length; i++) {
            closebtns[i].addEventListener("click", function () {
                this.parentElement.style.display = 'none';
                alert('this item is deleted')
            });
        }
        if(closebtns === 0){
            return (
                <p> You dont have any item here</p>
            )
        }
    }





    return (
        <div className="cartItem-wrapper">
            <div className="cartItem-details">
                <div className="item-top">
                    <h6> Asset Maanagement</h6>
                    <img src={Cancel} width="10" height="10" onClick={()=>closeItem()} className="cancelItem"/>
                </div>
                <img src={Image} alt="product-image" width="40" height="40" className="img-small"/>
                <div className="quantity-price">
                    <div className="quantity-select">
                        <span className="counter-action" onClick={()=>decrement()}>-</span>
                        <span className="counter-action-value">{quantity}</span>
                        <span className="counter-action" onClick={()=>increment()}>+</span>
                    </div>
                    <span>600</span>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;