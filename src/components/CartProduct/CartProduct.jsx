import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";
import Prices from '../Prices/Prices';
import AttributesComponent from '../ProductAttributes/AttributesComponent';
import leftScroll from './leftScroll.svg';
import rightScroll from './rightScroll.svg';

class CartProduct extends React.PureComponent {
     static contextType = UserContext;

     state = {
          attributes: [],
          galleryPhotoIndex: 0,
          count: this.context.getCountOfItem(this.props.id),
     }

     componentDidMount() {
          this.forceUpdate(this.setState({ count: this.context.getCountOfItem(this.props.id) }))
          this.context.calculateTotalPrice()
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

     renderCount = () => {
          return (
               <>
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
               </>
          )
     }

     renderGallery = () => {
          return (
               <>
                    <img src={this.props.gallery[this.state.galleryPhotoIndex]} alt={this.props.name} />
                    {
                         (this.props.gallery.length > 1) ? <div className='cartProduct__scrollGallery'>
                              <img src={leftScroll} onClick={() => { this.scrollToLeft(this.props.gallery) }} alt="left scroll" />
                              <img src={rightScroll} onClick={() => { this.scrollToRight(this.props.gallery) }} alt="right scroll" />
                         </div> : false
                    }
               </>
          )
     }


     render() {
          const { name, brand, prices, attributes } = this.props;

          return (

               <div className='cartProduct'>
                    <div className='cartProduct__info'>
                         <p className="cartProduct__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="productPage__price">
                              <p>Price:</p>
                              <Prices prices={prices} />
                         </div>
                         <AttributesComponent className={"productPage__attributes"} selectedAttributes={this.props.selectedAttributes} isDisabled={true} attributes={attributes} layoutSize={'big'} />

                    </div>
                    <div className='cartProduct__galleryAndCount'>
                         <div className='cartProduct__countWrapper'>{this.renderCount()}</div>
                         <div className='cartProduct__gallery'>{this.renderGallery()}</div>
                    </div>
               </div>
          )
     }
}

export default CartProduct;