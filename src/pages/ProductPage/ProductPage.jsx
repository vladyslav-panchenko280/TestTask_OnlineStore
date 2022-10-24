import React from "react";
import { Query } from "@apollo/client/react/components";
import UserContext from "../../UserContext";
import Prices from "../../components/Prices/Prices";
import AttributesComponent from "../../components/ProductAttributes/AttributesComponent";
import { findObjectValues } from "../../functions/findObjectValues";
import { sanitize } from "../../functions/sanitize"
import { GET_PRODUCT_DATA } from "../../requests/GET_PRODUCT_DATA"

class ProductPage extends React.PureComponent {
     static contextType = UserContext;

     state = {
          currentPicture: "",
          attributes: []
     }

     getAttributes = (value) => {
          const removeFromBag = this.state.attributes.filter(el => el.id !== value.id);
          this.setState({ attributes: [...removeFromBag, value] });
     }

     changeCurrentPicture = (value) => {
          this.setState({ currentPicture: value })
     }

     renderGallery = gallery => {
          return gallery.map(link => {
               return <li key={gallery.indexOf(link)} onClick={() => {
                    return this.changeCurrentPicture(link);
               }}><img src={link} alt="product" /></li>
          })
     }

     renderMainPhoto = (gallery, inStock) => {
          if (this.state.currentPicture !== "") {
               return (<img src={this.state.currentPicture} alt="product" />)
          } else {
               return (<img src={gallery[0]} alt="product" />)
          }
          

     }

     render() {
          return (
               <section className="productPage" >
                    <Query query={GET_PRODUCT_DATA(this.context.productId)}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              const id = findObjectValues(data, 'id');
                              const gallery = findObjectValues(data, 'gallery');
                              const name = findObjectValues(data, 'name');
                              const brand = findObjectValues(data, 'brand');
                              const attributes = findObjectValues(data, 'attributes');
                              const prices = findObjectValues(data, 'prices');
                              const inStock = findObjectValues(data, 'inStock');
                              const description = findObjectValues(data, 'description');

                              return (
                                   <div>
                                        <div className="productPage__gallery">
                                             <ul>
                                                  {this.renderGallery(gallery)}
                                             </ul>
                                             <div className="productPage__mainPhoto">
                                                  {this.renderMainPhoto(gallery, inStock)}
                                                  {inStock ? false : <div>OUT OF STOCK</div>}
                                             </div>
                                        </div>
                                        <div className="productPage__info">
                                             <p className="productPage__name">{name} <br />
                                                  <span>{brand}</span>
                                             </p>
                                             <AttributesComponent className={"productPage__attributes"} isDisabled={false} attributes={attributes} layoutSize={'big'} getAttributes={this.getAttributes}/>
                                             <div className="productPage__price">
                                                  <p>Price:</p>
                                                  <Prices prices={prices}></Prices>
                                             </div>
                                             {
                                                  inStock ?
                                                       <button className="productPage__btn" onClick={event => { (attributes.length === this.state.attributes.length) ? this.context.addProductToCart({ id: id, name: name, brand: brand, gallery: gallery, attributes: attributes, prices: prices, inStock: inStock, selectedAttributes: this.state.attributes }) : event.preventDefault() }}>ADD TO CART</button> :
                                                       <button className="productPage__btn" disabled>ADD TO CART</button>
                                             }
                                             <div className="productPage__description">
                                                  {sanitize(description)}
                                             </div>
                                        </div>
                                   </div>
                              )
                         }}
                    </Query>
               </section>
          )

     }
}

export default ProductPage;