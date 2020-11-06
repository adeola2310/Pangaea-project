import React, {useState} from 'react';
import './products.css';
import Header from "../../components/Header/Header";
import Card from "../../components/card/card";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cart from "../../components/cart/cart";
import Logo from "../../images/lumen.png";

const GET_ALL_PRODUCTS = gql`
{
   products{
    id
    title
    image_url
    price(currency: USD)
  }
}
`

const Products = ()=>{
    const [cartItems, setCartItems] = useState([]);
    const [openCart, setOpenCart] = useState(false);


    const onAddItemToCart = (selected) =>{
        let tempCartItem = [...cartItems];
        if(tempCartItem.length > 0){
            tempCartItem.map(item => {
                if(item.id === selected.id){
                    item.quantity =  item.quantity + 1
                }else{
                    tempCartItem.push({...selected, quantity:  1});
                }
            })
        }else{
            tempCartItem.push({...selected, quantity:  1});
        }

        setCartItems(tempCartItem)
        setOpenCart(!openCart);

    }

    const removeCartItem = index => {
        let tempCartItem = [...cartItems];
        tempCartItem.splice(index, 1)
        setCartItems(tempCartItem);
    };

    return(
   <>
       <Header cartDetails={cartItems}/>

       <div className="filter__Space">
           <div className="pro">
               <h4> All Products</h4>
               <span className="about"> A 360 look at Lumin</span>
           </div>
           <div className="filter">
               <select className="product-filter">
                   <option>Filter by</option>
                   <option> All products</option>
                   <option> New products</option>
                   <option> Sets </option>
                   <option>Skin care</option>
               </select>
           </div>
       </div>

       <div className="products">
          <div className="products__list">
             <Query query={GET_ALL_PRODUCTS}>
                {
                   ({loading, data, error})=>{
                      if(loading) return <h4 className="loader">products loading...</h4>
                       return (
                           data?.products && data?.products?.map((details, index)=>(
                               <Card
                                   key={index}
                                   productDetails={details}
                                   addToCart={onAddItemToCart}
                                   openCart={openCart}
                                   setOpenCart={setOpenCart}
                               />
                           ))
                       )
                   }
                }

             </Query>
              {openCart &&
              <Cart
                  setOpenCart={setOpenCart}
                  openCart={openCart}
                  carty={cartItems}
                  deleteCart={removeCartItem}
              />}
          </div>

       </div>





       </>

    )
}

export default Products;