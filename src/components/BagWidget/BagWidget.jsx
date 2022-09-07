import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";
import { Link } from "react-router-dom";
import BagWidgetItem from "../BagWidgetItem/BagWidgetItem";

class BagWidget extends React.Component {
     static contextType = UserContext;

     componentDidMount() {
          this.context.getUniqProds(this.context.productCart)
     }

     render() {
          const { uniqProductsArray, productCart, totalPrice } = this.context;

          return (
               <div className="overlay">
                    <div className="bagWidget">
                         <div className="bagWidget__container">
                              <p className="bagWidget__title">My bag <span>{productCart.length} items</span></p>
                              <ul className='bagWidget__products'>
                                   {uniqProductsArray.map(el => {
                                        const id = findObjectValues(el, 'id');
                                        const name = findObjectValues(el, 'name');
                                        const brand = findObjectValues(el, 'brand');
                                        const prices = findObjectValues(el, 'prices');
                                        const attributes = findObjectValues(el, 'attributes');
                                        const gallery = findObjectValues(el, 'gallery');
                                        const inStock = findObjectValues(el, 'inStock');
                                        const selectedAttributes = findObjectValues(el, 'selectedAttributes');
                                        const productCount = findObjectValues(el, 'count');

                                        return (
                                             <li key={id}>
                                                  <BagWidgetItem id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} uniqProductsArray={uniqProductsArray} inStock={inStock} productCount={productCount} />
                                             </li>
                                        )
                                   })}
                              </ul>
                              <p className="bagWidget__totalPrice"><span>Total:</span><span>{totalPrice}</span></p>
                              <div className="bagWidget__btnContainer">
                                   <Link to={`/cart`} onClick={this.context.toggleBagWidget} className="bagWidget__secondaryBtn">VIEW BAG</Link>
                                   <button className="bagWidget__primaryBtn" onClick={() => {
                                        console.group();
                                        console.log('Products:');
                                        console.log(this.context.productCart);
                                        console.log('Total:');
                                        console.log(this.context.totalPrice);
                                        console.groupEnd();
                                   }}>CHECKOUT</button>
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default BagWidget;