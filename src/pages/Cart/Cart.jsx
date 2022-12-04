import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import UserContext from "../../UserContext";

class Cart extends React.PureComponent {
     static contextType = UserContext;

     state = {
          productCart: this.context.productCart
     }

     componentDidUpdate() {
          const { calculateTotalPrice } = this.context;

          calculateTotalPrice();
     }

     renderItems = () => {
          const { getCountOfItem } = this.context;
          const { productCart } = this.state;

          const arr = [...productCart].map(([key, el]) => {

               const {id, name, brand, prices, attributes, gallery, inStock, selectedAttributes} = el[0];

               const count = getCountOfItem(key);

               return (

                    <li key={`${id}-${key}`}>
                         <CartProduct id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} inStock={inStock} count={count} />
                    </li>
               )
          });

          return arr
     }

     checkout = () => {
          const { productCart, totalPrice } = this.context;

          console.group();
          console.log("Products:");
          console.log(productCart);
          console.log("Total:");
          console.log(totalPrice);
          console.groupEnd();
     }

     renderButton = () => {
          const { productCart } = this.context;
          const { checkout } = this;

          return (
               productCart.size === 0 ?
                    <button className="cart__orderBtn" disabled>ORDER</button> :
                    <button className="cart__orderBtn" onClick={checkout}>ORDER</button>
          )
     }

     render() {
          const { tax, totalPrice, currentCurrencySymbol, countInCart } = this.context;
          const { renderItems, renderButton } = this;

          let taxOfTotal = (totalPrice * (tax / 100));
          let totalWithTax = totalPrice + taxOfTotal;

          return (
               <section className="cart">
                    <div>
                         <h2>Cart</h2>
                         <ul className="cart__products">{renderItems()}</ul>
                         <div className="cart__footer">
                              <div className="cart__footerKeys">
                                   <p>Tax {tax}%:</p>
                                   <p>Quantity:</p>
                                   <p>Total:</p>
                              </div>
                              <div className="cart__footerValues">
                                   <p>{taxOfTotal.toFixed(2)}{currentCurrencySymbol}</p>
                                   <p>{countInCart}</p>
                                   <p>{totalWithTax.toFixed(2)}{currentCurrencySymbol}</p>
                              </div>
                         </div>
                         {renderButton()}
                    </div>
               </section>
          )
     }
}

export default Cart;