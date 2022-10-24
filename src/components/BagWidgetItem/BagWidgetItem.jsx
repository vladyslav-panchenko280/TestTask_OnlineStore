import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";
import Prices from '../Prices/Prices';
import AttributesComponent from '../ProductAttributes/AttributesComponent';

class BagWidgetItem extends React.PureComponent {
     static contextType = UserContext;

     state = {
          attributes: this.props.selectedAttributes,
          count: this.context.getCountOfItem(this.props.id),
     }

     componentDidMount() {
          this.context.calculateTotalPrice()
     }

     getAttributes = (value) => {
          const removeFromBag = this.state.attributes.filter(el => el.id !== value.id);
          this.setState({ attributes: [...removeFromBag, value] });
     }

     increaseCount = () => {

          if (this.state.count) {
               this.setState({ count: this.state.count + 1 });
               this.context.addProductToCart({ id: this.props.id, name: this.props.name, gallery: this.props.gallery, brand: this.props.brand, inStock: this.props.inStock, attributes: this.props.attributes, prices: this.props.prices, count: this.props.count })


               this.props.prices.map(el => {
                    const amount = findObjectValues(el, 'amount');
                    const label = findObjectValues(el, 'label');

                    return label === this.context.currentCurrency ? this.context.sumOperation(amount
                         , "+") : false
               })

               this.context.getUniqProds()

               console.log(this.context.uniqProductsArray)
          }
     }

     decreaseCount = () => {

          if (this.state.count > 0) {
               this.setState({ count: this.state.count - 1 });
               this.context.removeProductFromCart(this.props.id, this.state.attributes);

               this.props.prices.map(el => {
                    const amount = findObjectValues(el, 'amount');
                    const label = findObjectValues(el, 'label');

                    return label === this.context.currentCurrency ? this.context.sumOperation(amount
                         , "-") : false
               })
               this.context.getUniqProds()
          }
     }

     render() {
          const { name, brand, prices, attributes, gallery } = this.props;


          return (
               <div className='bagWidgetItem'>
                    <div className='bagWidgetItem__info'>
                         <p className="bagWidgetItem__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="bagWidgetItem__price">
                              <Prices prices={prices} />
                         </div>
                         <AttributesComponent className={"bagWidgetItem__attributes"} selectedAttributes={this.props.selectedAttributes} isDisabled={true} attributes={attributes} layoutSize={'small'} />
                    </div>
                    <div className='bagWidgetItem__galleryAndCount'>
                         <div className='bagWidgetItem__countWrapper'>
                              <div>
                                   <span onClick={() => {
                                        this.context.calculateTotalPrice()
                                        this.increaseCount()
                                   }} >+</span>
                              </div>
                              <p>{this.state.count}</p>
                              <div>
                                   <span onClick={() => {
                                        this.context.calculateTotalPrice()
                                        this.decreaseCount()
                                   }}>-</span>
                              </div>
                         </div>
                         <div className='bagWidgetItem__gallery'>
                              <img src={gallery[0]} alt={name} />
                         </div>
                    </div>
               </div>

          )
     }
}

export default BagWidgetItem;
