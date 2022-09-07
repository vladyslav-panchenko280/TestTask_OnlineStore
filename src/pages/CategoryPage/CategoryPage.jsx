import React from "react";
import UserContext from "../../UserContext";
import { Query } from "@apollo/client/react/components";
import { FETCH_CATEGORY_PRODUCTS } from "../../requests/FETCH_CATEGORY_PRODUCTS";
import { findObjectValues } from "../../functions/findObjectValues";
import { Link } from 'react-router-dom';
import shoppingBag from './shoppingBag.svg';

class CategoryPage extends React.Component {
     static contextType = UserContext;

     render() {
          const { currentCategory, currentCurrency, setProductId, addProductToCart } = this.context;
          return (
               <section className="categoryPage">
                    <div>
                         <h2>{currentCategory}</h2>
                         <ul className="categoryPage__products">

                              <Query query={FETCH_CATEGORY_PRODUCTS}>
                                   {({ loading, error, data }) => {
                                        if (loading) return null;
                                        if (error) return console.log(error);

                                        const categories = findObjectValues(data, 'categories');

                                        return categories.map(el => {
                                             const name = findObjectValues(el, 'name');
                                             const products = findObjectValues(el, 'products');
                                             return name === currentCategory ?
                                                  products.map(prod => {
                                                       const id = findObjectValues(prod, 'id');
                                                       const inStock = findObjectValues(prod, 'inStock');
                                                       const gallery = findObjectValues(prod, 'gallery');
                                                       const name = findObjectValues(prod, 'name');
                                                       const prices = findObjectValues(prod, 'prices');
                                                       const brand = findObjectValues(prod, 'brand');
                                                       const attributes = findObjectValues(prod, 'attributes');

                                                       return (
                                                            <li key={id}>
                                                                 <Link to={`/${currentCategory}/${id}`}
                                                                      onClick={() => setProductId(id)}>
                                                                      <div className="categoryPage__productWrapper">
                                                                           <div className="categoryPage__imgWrapper">
                                                                                {inStock ? false : <div>OUT OF STOCK</div>}
                                                                                <img src={gallery[0]} alt="Prod pic" />
                                                                                <button className="categoryPage__purchaseBtn"
                                                                                     onClick={(event) => {
                                                                                          event.preventDefault();
                                                                                          inStock ? addProductToCart({ id: id, name: name, gallery: gallery, brand: brand, inStock: inStock, attributes: attributes, prices: prices }) : event.preventDefault()
                                                                                     }}>
                                                                                     <img src={shoppingBag} alt="Shopping bag" />
                                                                                </button>
                                                                           </div>
                                                                           <p className="categoryPage__productName">{name}</p>
                                                                           <p className="categoryPage__productPrice">{prices.map(el => {
                                                                                const amount = findObjectValues(el, 'amount');
                                                                                const label = findObjectValues(el, 'label');
                                                                                const symbol = findObjectValues(el, 'symbol');

                                                                                return label === currentCurrency ? `${amount}${symbol}` : false
                                                                           })}</p>
                                                                      </div>
                                                                 </Link>
                                                            </li>
                                                       )
                                                  })
                                                  : false
                                        })
                                   }}
                              </Query>
                         </ul>
                    </div>
               </section>
          )
     }
}

export default CategoryPage;