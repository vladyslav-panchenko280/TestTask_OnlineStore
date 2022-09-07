import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";
import { TextAttr } from '../ProductAttributes/TextAttr';
import { SwatchAttr } from '../ProductAttributes/SwatchAttr';

class BagWidgetItem extends React.Component {
     static contextType = UserContext;

     state = {
          attributes: [],
          count: this.props.productCount,
     }

     componentDidMount() {
          return this.context.calculateTotalPrice()
     }

     getAttributes = (value) => {
          const removeFromBag = this.state.attributes.filter(el => el.id !== value.id);
          this.setState({ attributes: [...removeFromBag, value] });
     }

     renderAttributes = (type, id, name, items, selectedAttributes = null) => {
          switch (type) {
               case "text": {
                    return <TextAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={'small'} />
               }
               case "swatch": {
                    return <SwatchAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={'small'} />
               }
               default: {
                    return false
               }
          }
     }

     increaseCount = () => {

          if (this.state.count < 10) {
               this.setState({ count: this.state.count + 1 });
               return this.context.addProductToCart({ id: this.props.id, name: this.props.name, gallery: this.props.gallery, brand: this.props.brand, inStock: this.props.inStock, attributes: this.props.attributes, prices: this.props.prices, count: this.props.productCount })
          }
     }

     decreaseCount = () => {

          if (this.state.count > 1) {
               this.setState({ count: this.state.count - 1 });
               return this.context.removeProductFromCart(this.props.id)
          }
     }

     render() {
          const { name, brand, prices, attributes, gallery, selectedAttributes } = this.props;

          return (

               <div className='bagWidgetItem'>
                    <div className='bagWidgetItem__info'>
                         <p className="bagWidgetItem__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="bagWidgetItem__price">
                              <span>
                                   {prices.map(el => {
                                        const amount = findObjectValues(el, 'amount');
                                        const label = findObjectValues(el, 'label');
                                        const symbol = findObjectValues(el, 'symbol');


                                        return label === this.context.currentCurrency ? `${symbol}${amount}` : false
                                   })}
                              </span>
                         </div>
                         <div className="bagWidgetItem__attributes">
                              {attributes.map(el => {
                                   const id = findObjectValues(el, 'id');
                                   const type = findObjectValues(el, 'type');
                                   const name = findObjectValues(el, 'name');
                                   const items = findObjectValues(el, 'items');

                                   return this.renderAttributes(type, id, name, items, selectedAttributes);
                              })}
                         </div>
                    </div>
                    <div className='bagWidgetItem__galleryAndCount'>
                         <div className='bagWidgetItem__countWrapper'>
                              <span onClick={() => {
                                   this.context.calculateTotalPrice()
                                   this.increaseCount()
                              }} >+</span>
                              <p>{this.state.count}</p>
                              <span onClick={() => {
                                   this.context.calculateTotalPrice()
                                   this.decreaseCount()
                              }}>-</span>
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
