import React from 'react';
import './products.css';
import Header from "../../components/Header/Header";
import Card from "../../components/card/card";
import { Query } from 'react-apollo';
import { gql} from 'apollo-boost';

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

    // const getItems = ()=>{
    //     const cart = data?.products
    // }
    return(
   <>
       <Header/>

       <div className="filter__Space">
           <div className="pro">
               <h4> All Products</h4>
               <span className="about"> A 360 look at Lumin</span>
           </div>
           <div className="filter">
               <select className="product-filter">
                   <option>value</option>
                   <option>value</option>
                   <option>value</option>
               </select>
           </div>
       </div>

       <div className="products">
          <div className="products__list">
             <Query query={GET_ALL_PRODUCTS}>
                {
                   ({loading, data, error})=>{
                       console.log("allll", data);
                      if(loading) return <h4 className="loader">products loading...</h4>
                       return (
                           data?.products && data?.products?.map((details, index)=>(
                               <Card
                                   key={index}
                                   productDetails={details}
                               />
                           ))
                       )
                   }
                }

             </Query>
          </div>

       </div>
       </>

    )
}

export default Products;