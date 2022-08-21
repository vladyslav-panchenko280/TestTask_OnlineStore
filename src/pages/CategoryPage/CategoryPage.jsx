import React from "react";
import UserContext from "../../UserContext";
import { Query } from "@apollo/client/react/components";
import { FETCH_CATEGORY_PRODUCTS } from "../../requests/FETCH_CATEGORY_PRODUCTS";
import { Link } from 'react-router-dom';
import shoppingBag from './shoppingBag.svg'

class CategoryPage extends React.Component {
     static contextType = UserContext;

     render() {
          const { currentCategory, currentCurrency, setProductId } = this.context
          return (
               <section className="categoryPage">
                    <ul className="categoryPage__products">
                         <Query query={FETCH_CATEGORY_PRODUCTS}>
                              {({ loading, error, data }) => {
                                   if (loading) return null;
                                   if (error) return console.log(error);

                                   const objData = Object.entries(data);
                                   return objData.map(([key, value]) => {
                                        return value.map(el => {
                                             return el.name === currentCategory ?
                                                  el.products.map(prod => {
                                                       return (
                                                            <li key={prod.id}>
                                                                 <Link to={prod.id}
                                                                 onClick={() => setProductId(prod.id)}>
                                                                      <div className="categoryPage__productWrapper">
                                                                           <div className="categoryPage__imgWrapper">
                                                                                {prod.inStock ? <div>OUT OF STOCK</div> : false}
                                                                                <img src={prod.gallery[0]} alt="" />
                                                                                <button className="categoryPage__purchaseBtn"
                                                                                onClick={(event) => {
                                                                                     event.preventDefault()
                                                                                }}>
                                                                                     <img src={shoppingBag} alt="" />
                                                                                </button>
                                                                           </div>
                                                                           <p className="categoryPage__productName">{prod.name}</p>
                                                                           <p className="categoryPage__productPrice">{prod.prices.map(el => {
                                                                                return el.currency.label === currentCurrency ? `${el.amount}${el.currency.symbol}` : false
                                                                           })}</p>
                                                                      </div>
                                                                 </Link>
                                                            </li>
                                                       )
                                                  })
                                                  : false
                                        })
                                   })
                              }}
                         </Query>
                    </ul>
               </section>
          )
     }
}

export default CategoryPage;