import React from "react";
import UserContext from "../../UserContext";
import { Query } from "@apollo/client/react/components";
import { FETCH_CATEGORY_PRODUCTS } from "../../requests/FETCH_CATEGORY_PRODUCTS";
import { findObjectValues } from "../../functions/findObjectValues";
import { Link } from 'react-router-dom';
import shoppingBag from './shoppingBag.svg';
import Prices from "../../components/Prices/Prices";

class CategoryPage extends React.PureComponent {
     static contextType = UserContext;

     renderPrice = (prices) => {
          return prices.map(el => {
               const amount = findObjectValues(el, 'amount');
               const label = findObjectValues(el, 'label');
               const symbol = findObjectValues(el, 'symbol');

               return label === this.context.currentCurrency ? `${amount}${symbol}` : false
          })
     }

     renderProducts = products => {
          return products.map(prod => {
               const id = findObjectValues(prod, 'id');
               const inStock = findObjectValues(prod, 'inStock');
               const gallery = findObjectValues(prod, 'gallery');
               const name = findObjectValues(prod, 'name');
               const prices = findObjectValues(prod, 'prices');
               const brand = findObjectValues(prod, 'brand');
               const attributes = findObjectValues(prod, 'attributes');

               return (
                    <li key={id}>
                         <Link to={`/${this.context.currentCategory}/${id}`}
                              onClick={() => this.context.setProductId(id)}>
                              <div className="categoryPage__productWrapper">
                                   <div className="categoryPage__imgWrapper">
                                        {inStock ? false : <div>OUT OF STOCK</div>}
                                        <img src={gallery[0]} alt="Prod pic" />
                                        <button className="categoryPage__purchaseBtn"
                                        onClick={(event) => {
                                             event.preventDefault();
                                             inStock ? this.context.addProductToCart({ id: id, name: name, gallery: gallery, brand: brand, inStock: inStock, attributes: attributes, prices: prices, selectedAttributes: undefined }) : event.preventDefault()
                                        }}
                                        >
                                             <img src={shoppingBag} alt="Shopping bag" />
                                        </button>
                                   </div>
                                   <p className="categoryPage__productName">{name}</p>
                                   <Prices class={"categoryPage__productPrice"} prices={prices} />
                              </div>
                         </Link>
                    </li>
               )
          })
     }

     renderByCategory = categories => {
          return categories.map(el => {
               const name = findObjectValues(el, 'name');
               const products = findObjectValues(el, 'products');
               return name === this.context.currentCategory ?
                    this.renderProducts(products)
                    : false
          })
     }

     render() {
          return (
               <section className="categoryPage">
                    <div>
                         <h2>{this.context.currentCategory}</h2>
                         <ul className="categoryPage__products">

                              <Query query={FETCH_CATEGORY_PRODUCTS}>
                                   {({ loading, error, data }) => {
                                        if (loading) return null;
                                        if (error) return console.log(error);

                                        const categories = findObjectValues(data, 'categories');

                                        return this.renderByCategory(categories)
                                   }}
                              </Query>
                         </ul>
                    </div>
               </section>
          )
     }
}

export default CategoryPage;