import React from 'react';
import CartProduct from '../../components/CartProduct/CartProduct';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";

class Cart extends React.PureComponent {
     static contextType = UserContext;

     componentDidMount() {
          this.context.getUniqProds();
     }

     componentWillUnmount() {
          this.context.getUniqProds()
     }

     renderItems = () => {
         return (this.context.uniqProductsArray.map(el => {
               const id = findObjectValues(el, 'id');
               const name = findObjectValues(el, 'name');
               const brand = findObjectValues(el, 'brand');
               const prices = findObjectValues(el, 'prices');
               const attributes = findObjectValues(el, 'attributes');
               const gallery = findObjectValues(el, 'gallery');
               const inStock = findObjectValues(el, 'inStock');
               const selectedAttributes = findObjectValues(el, 'selectedAttributes');
               const count = findObjectValues(el, 'count');

               return (
                    <li key={this.context.uniqProductsArray.indexOf(el)}>
                         <CartProduct id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} inStock={inStock} count={count} />
                    </li>
               )
          }))
     }

     checkout = () => {
               console.group();
               console.log('Products:');
               console.log(this.context.productCart);
               console.log('Total:');
               console.log(this.context.totalPrice);
               console.groupEnd();
     }

     renderButton = () => {
          return (
               this.context.productCart.length === 0 ?
               <button className='cart__orderBtn' disabled>ORDER</button> :
               <button className='cart__orderBtn' onClick={this.checkout}>ORDER</button>
          )
     }

     render() {
          const { tax } = this.context;

          return (
               <section className='cart'>
                    <div>
                         <h2>Cart</h2>
                         <ul className='cart__products'>{this.renderItems()}</ul>
                         <div className='cart__footer'>
                              <div className='cart__footerKeys'>
                                   <p>Tax { tax }%:</p>
                                   <p>Quantity:</p>
                                   <p>Total:</p>
                              </div>
                              <div className='cart__footerValues'>
                                   <p>{(this.context.totalPrice * (tax / 100)).toFixed(2)}{this.context.currentCurrencySymbol}</p>
                                   <p>{this.context.productCart.length}</p>
                                   <p>{this.context.totalPrice}{this.context.currentCurrencySymbol}</p>
                              </div>
                         </div>
                         {this.renderButton()}
                    </div>
               </section>
          )
     }
}

export default Cart;