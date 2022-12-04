import React from "react";
import UserContext from "../../UserContext";
import Prices from "../Prices/Prices";
import AttributesComponent from "../ProductAttributes/AttributesComponent";
import { getSpecialKey } from "../../functions/getSpecialKey";

class BagWidgetItem extends React.PureComponent {
     static contextType = UserContext;

     state = {
          attributes: this.props.selectedAttributes,
          count: this.props.count,
     }

     componentDidMount() {
          const { calculateTotalPrice } = this.context;

          calculateTotalPrice();
     }

     increaseCount = () => {
          const { count } = this.state;
          const { addProductToCart, getCountOfItem, currentCurrency, sumOperation, getCountOfAllItems } = this.context;
          const { id, name, brand, gallery, attributes, prices, inStock, selectedAttributes } = this.props;

          if (count) {

               addProductToCart({ id: id, name: name, brand: brand, gallery: gallery, attributes: attributes, prices: prices, inStock: inStock, selectedAttributes: selectedAttributes });

               let key = getSpecialKey(id, selectedAttributes);

               this.setState({ count: getCountOfItem(key) });

               prices.map(el => {
                    const { amount } = el;
                    const { label } = el.currency;

                    return label === currentCurrency ? sumOperation(amount, "+") : false
               });

               getCountOfAllItems();

          }
     }

     decreaseCount = () => {
          const { count } = this.state;
          const { removeProductFromCart, getCountOfItem, currentCurrency, sumOperation, getCountOfAllItems } = this.context;
          const { id, prices, selectedAttributes } = this.props;


          if (count > 0) {

               const key = getSpecialKey(id, selectedAttributes)

               removeProductFromCart(key);

               this.setState({ count: getCountOfItem(key) });

               prices.map(el => {
                    const { amount } = el;
                    const { label } = el.currency;

                    return label === currentCurrency ? sumOperation(amount
                         , "-") : false
               });

               getCountOfAllItems();
          }

     }

     render() {
          const { name, brand, prices, attributes, gallery, id, selectedAttributes } = this.props;
          const { increaseCount, decreaseCount } = this;
          const { calculateTotalPrice } = this.context;
          const { count } = this.state;

          return (
               <div className="bagWidgetItem">
                    <div className="bagWidgetItem__info">
                         <p className="bagWidgetItem__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="bagWidgetItem__price">
                              <Prices prices={prices} />
                         </div>
                         {
                              attributes.length ?
                                   <AttributesComponent className={"bagWidgetItem__attributes"} selectedAttributes={selectedAttributes} isDisabled={true} attributes={attributes} layoutSize={"small"} productId={id} /> :
                                   false
                         }
                    </div>
                    <div className="bagWidgetItem__galleryAndCount">
                         <div className="bagWidgetItem__countWrapper">
                              <div>
                                   <span onClick={() => {
                                        calculateTotalPrice()
                                        increaseCount()
                                   }} >+</span>
                              </div>
                              <p>{count}</p>
                              <div>
                                   <span onClick={() => {
                                        calculateTotalPrice()
                                        decreaseCount()
                                   }}>-</span>
                              </div>
                         </div>
                         <div className="bagWidgetItem__gallery">
                              <img src={gallery[0]} alt={name} />
                         </div>
                    </div>
               </div>

          )
     }
}

export default BagWidgetItem;
