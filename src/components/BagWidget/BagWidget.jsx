import React from "react";
import UserContext from "../../UserContext";
import BagWidgetItem from "../BagWidgetItem/BagWidgetItem";
import { Link } from "react-router-dom";

class BagWidget extends React.PureComponent {
     static contextType = UserContext;

     constructor(props) {
          super(props);
          this.wrapperRef = React.createRef();
     }

     componentWillUnmount() {
          document.removeEventListener("mousedown", this.handleClickOutside);
     }
     componentDidMount() {
          document.addEventListener("mousedown", this.handleClickOutside);
     }

     handleClickOutside = (event) => {
          const { wrapperRef, changeOpened } = this;
          const { openedBagWidget } = this.context;

          if (wrapperRef && !wrapperRef.current.contains(event.target) && openedBagWidget && event.target !== document.querySelector(".header__shoppingBag > img")) {

               changeOpened();
          }
     }

     renderItems = () => {
          const { productCart, getCountOfItem } = this.context;

          const arr = [...productCart].map(([key, el]) => {
               const {id, name, brand, prices, attributes, gallery, inStock, selectedAttributes} = el[0];

               const count = getCountOfItem(key);

               return (

                    <li key={`${id}-${key}`}>
                         <BagWidgetItem id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} inStock={inStock} count={count} />
                    </li>
               )
          });

          return arr

     }


     changeOpened = () => {
          const { toggleBagWidget } = this.context;

          toggleBagWidget();
     }

     checkout = () => {
          const { productCart, totalPrice, tax } = this.context;

          let taxOfTotal = (totalPrice * (tax / 100));
          let totalWithTax = totalPrice + taxOfTotal;

          console.group();
          console.log("Products:");
          console.log(productCart);
          console.log("Total:");
          console.log(totalWithTax.toFixed(2));
          console.groupEnd();
     }

     renderButton = () => {
          const { checkout } = this;
          const { productCart } = this.context;

          return (
               productCart.size !== 0 ?
                    <button className="bagWidget__primaryBtn" onClick={checkout}>CHECKOUT</button> :
                    <button className="bagWidget__primaryBtn" disabled>CHECKOUT</button>
          )
     }

     render() {
          const { totalPrice, currentCurrencySymbol, countInCart, tax } = this.context;
          const { wrapperRef, renderItems, changeOpened, renderButton } = this;

          let taxOfTotal = (totalPrice * (tax / 100));
          let totalWithTax = totalPrice + taxOfTotal;

          return (
               <div className="overlay">
                    <div className="bagWidget" ref={wrapperRef}>
                         <div className="bagWidget__container">
                              <p className="bagWidget__title">My bag <span>{countInCart} items</span></p>
                              <ul className="bagWidget__products">
                                   {renderItems()}
                              </ul>
                              <p className="bagWidget__totalPrice"><span>Total:</span><span>{`${currentCurrencySymbol}${totalWithTax.toFixed(2)}`}</span></p>
                              <div className="bagWidget__btnContainer">
                                   <Link to={"/cart"} onClick={changeOpened} className="bagWidget__secondaryBtn">VIEW BAG</Link>
                                   {renderButton()}
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default BagWidget;