import React, {useState} from 'react';
import './products.css';
import Header from "../../components/Header/Header";
import Card from "../../components/card/card";
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import Cart from "../../components/cart/cart";

const GET_ALL_PRODUCTS = gql`
    query($currency: Currency) {
       products{
        id
        title
        image_url
        price(currency: $currency)
      }
    }
`

const Products = ({cartList, setCartList}) => {
    const [openCart, setOpenCart] = useState(false);
    const [currency, setCurrency] = useState('NGN');

    const onAddItemToCart = (selected) => {
        setCartList({
            type: 'Add',
            payload: selected,
        });
        setOpenCart(!openCart);
    }


    const items = Object.keys(cartList).length;


    return (
        <>
            <Header
                numberOfItem={items}
                openCart={openCart}
                setOpenCart={setOpenCart}/>

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
                        <option> Sets</option>
                        <option>Skin care</option>
                    </select>
                </div>
            </div>

            <div className="products">
                <div className="products__list">
                    <Query query={GET_ALL_PRODUCTS} variables={{currency}}>
                        {
                            ({loading, data, error}) => {
                                if (loading) return <h4 className="loader">products loading...</h4>
                                return (
                                      data?.products?.map((details, index) => (
                                        <Card
                                            key={index}
                                            productDetails={details}
                                            currency={currency}
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
                        carty={cartList}
                        setCartList={setCartList}
                        currency={currency}
                        onSelectCurrency={setCurrency}
                    />}
                </div>

            </div>


        </>

    )
}

export default Products;