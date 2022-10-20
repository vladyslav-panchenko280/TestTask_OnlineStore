import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";
import { TextAttr } from '../ProductAttributes/TextAttr';
import { SwatchAttr } from '../ProductAttributes/SwatchAttr';
import leftScroll from './leftScroll.svg';
import rightScroll from './rightScroll.svg';

class CartProduct extends React.PureComponent {
     static contextType = UserContext;

     state = {
          attributes: [],
          galleryPhotoIndex: 0,
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
                    return <TextAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={'big'} />
               }
               case "swatch": {
                    return <SwatchAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={'big'} />
               }
               default: {
                    return false
               }
          }
     }

     scrollToRight = (gallery) => {
          this.setState({ galleryPhotoIndex: this.state.galleryPhotoIndex + 1 });
          if (this.state.galleryPhotoIndex > gallery.length - 2) {
               this.setState({ galleryPhotoIndex: 0 })
          }

     }

     scrollToLeft = (gallery) => {
          if (this.state.galleryPhotoIndex <= 0) this.setState({ galleryPhotoIndex: gallery.length - 1 });
          if (this.state.galleryPhotoIndex !== 0 && this.state.galleryPhotoIndex > 0) {
               this.setState({ galleryPhotoIndex: this.state.galleryPhotoIndex - 1 });
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

               <div className='cartProduct'>
                    <div className='cartProduct__info'>
                         <p className="cartProduct__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="productPage__price">
                              <p>Price:</p>
                              <span>
                                   {prices.map(el => {
                                        const amount = findObjectValues(el, 'amount');
                                        const label = findObjectValues(el, 'label');
                                        const symbol = findObjectValues(el, 'symbol');

                                        return label === this.context.currentCurrency ? `${symbol}${amount}` : false
                                   })}
                              </span>
                         </div>
                         <div className="productPage__attributes">
                              {attributes.map(el => {
                                   const id = findObjectValues(el, 'id');
                                   const type = findObjectValues(el, 'type');
                                   const name = findObjectValues(el, 'name');
                                   const items = findObjectValues(el, 'items');

                                   return this.renderAttributes(type, id, name, items, selectedAttributes);
                              })}
                         </div>
                    </div>
                    <div className='cartProduct__galleryAndCount'>
                         <div className='cartProduct__countWrapper'>
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
                         <div className='cartProduct__gallery'>
                              <img src={gallery[this.state.galleryPhotoIndex]} alt={name} />
                              {
                                   (gallery.length > 1) ? <div className='cartProduct__scrollGallery'>
                                        <img src={leftScroll} onClick={() => { this.scrollToLeft(gallery) }} alt="left scroll" />
                                        <img src={rightScroll} onClick={() => { this.scrollToRight(gallery) }} alt="right scroll" />
                                   </div> : false
                              }
                         </div>
                    </div>
               </div>
          )
     }
}

export default CartProduct;