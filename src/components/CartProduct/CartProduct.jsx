import React from "react";
import UserContext from "../../UserContext";
import Prices from "../Prices/Prices";
import AttributesComponent from "../ProductAttributes/AttributesComponent";
import leftScroll from "./leftScroll.svg";
import rightScroll from "./rightScroll.svg";
import { getSpecialKey } from "../../functions/getSpecialKey";

class CartProduct extends React.PureComponent {
     static contextType = UserContext;

     state = {
          attributes: this.props.selectedAttributes,
          galleryPhotoIndex: 0,
          count: this.props.count
     }

     componentDidMount() {
          const { calculateTotalPrice } = this.context;

          calculateTotalPrice();
     }

     componentDidUpdate() {
          this.setState({ count: this.props.count })
     }

     scrollToRight = (gallery) => {
          const { galleryPhotoIndex } = this.state;

          this.setState({ galleryPhotoIndex: galleryPhotoIndex + 1 });
          if (galleryPhotoIndex > gallery.length - 2) {
               this.setState({ galleryPhotoIndex: 0 })
          }
     }

     scrollToLeft = (gallery) => {
          const { galleryPhotoIndex } = this.state;

          if (galleryPhotoIndex <= 0) this.setState({ galleryPhotoIndex: gallery.length - 1 });
          if (galleryPhotoIndex !== 0 && galleryPhotoIndex > 0) {
               this.setState({ galleryPhotoIndex: galleryPhotoIndex - 1 });
          }
     }

     increaseCount = () => {
          const { name, brand, prices, attributes, gallery, id, selectedAttributes, inStock } = this.props;
          const { addProductToCart, getCountOfItem, currentCurrency, sumOperation, getCountOfAllItems } = this.context;
          const { count } = this.state;

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
          const { prices, id, selectedAttributes } = this.props;
          const { removeProductFromCart, getCountOfItem, currentCurrency, sumOperation, getCountOfAllItems } = this.context;
          const { count } = this.state;

          if (count > 0) {

               const key = getSpecialKey(id, selectedAttributes);

               removeProductFromCart(key);

               this.setState({ count: getCountOfItem(key) });

               prices.map(el => {
                    const { amount } = el;
                    const { label } = el.currency;

                    return label === currentCurrency ? sumOperation(amount, "-") : false
               });

               getCountOfAllItems();
          }

     }

     renderCount = () => {
          const { increaseCount, decreaseCount } = this;
          const { calculateTotalPrice } = this.context;
          const { count } = this.state;
          return (
               <>
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
               </>
          )
     }

     renderGallery = () => {
          const { gallery, name } = this.props;
          const { galleryPhotoIndex } = this.state;

          return (
               <>
                    <img src={gallery[galleryPhotoIndex]} alt={name} />
                    {
                         (gallery.length > 1) ? <div className="cartProduct__scrollGallery">
                              <img src={leftScroll} onClick={() => { this.scrollToLeft(gallery) }} alt="left scroll" />
                              <img src={rightScroll} onClick={() => { this.scrollToRight(gallery) }} alt="right scroll" />
                         </div> : false
                    }
               </>
          )
     }


     render() {
          const { name, brand, prices, attributes, id } = this.props;
          const { renderCount, renderGallery } = this;

          return (

               <div className="cartProduct">
                    <div className="cartProduct__info">
                         <p className="cartProduct__prodName">{name} <br />
                              <span>{brand}</span>
                         </p>
                         <div className="productPage__price">
                              <p>Price:</p>
                              <Prices prices={prices} />
                         </div>
                         <AttributesComponent className={"productPage__attributes"} selectedAttributes={this.state.attributes} isDisabled={true} attributes={attributes} layoutSize={"big"} productId={id} />

                    </div>
                    <div className="cartProduct__galleryAndCount">
                         <div className="cartProduct__countWrapper">{renderCount()}</div>
                         <div className="cartProduct__gallery">{renderGallery()}</div>
                    </div>
               </div>
          )
     }
}

export default CartProduct;