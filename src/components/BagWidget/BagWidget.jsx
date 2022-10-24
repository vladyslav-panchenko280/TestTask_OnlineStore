import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";
import { Link } from "react-router-dom";
import BagWidgetItem from "../BagWidgetItem/BagWidgetItem";

class BagWidget extends React.PureComponent {
     static contextType = UserContext;

     constructor(props) {
          super(props);
          this.wrapperRef = React.createRef();
     }

     handleClickOutside = (event) => {
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.context.openedBagWidget && event.target !== document.querySelector(".header__shoppingBag > img")) {

               this.changeOpened();
          }
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
               const count = findObjectValues(el, "count")

               return (

                    <li key={this.context.uniqProductsArray.indexOf(el)}>
                         <BagWidgetItem id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} inStock={inStock} count={count} />
                    </li>
               )


          }))
     }


     changeOpened = () => {
          this.context.toggleBagWidget();
     }

     componentWillUnmount() {
          document.removeEventListener("mousedown", this.handleClickOutside);
          this.context.getUniqProds()
     }
     componentDidMount() {
          this.context.getUniqProds()
          document.addEventListener("mousedown", this.handleClickOutside);
     }

     checkout = () => {
          console.group();
          console.log('Products:');
          console.log(this.context.productCart);
          console.log('Total:');
          console.log(this.context.totalPrice);
          console.groupEnd();
     }

     render() {
          const { productCart, totalPrice, currentCurrencySymbol, getCountOfAllItems } = this.context;

          return (
               <div className="overlay">
                    <div className="bagWidget" ref={this.wrapperRef}>
                         <div className="bagWidget__container">
                              <p className="bagWidget__title">My bag <span>{getCountOfAllItems()} items</span></p>
                              <ul className='bagWidget__products'>
                                   {this.renderItems()}
                              </ul>
                              <p className="bagWidget__totalPrice"><span>Total:</span><span>{`${currentCurrencySymbol}${totalPrice}`}</span></p>
                              <div className="bagWidget__btnContainer">
                                   <Link to={`/cart`} onClick={this.changeOpened} className="bagWidget__secondaryBtn">VIEW BAG</Link>
                                   <button className="bagWidget__primaryBtn" onClick={this.checkout}>CHECKOUT</button>
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default BagWidget;