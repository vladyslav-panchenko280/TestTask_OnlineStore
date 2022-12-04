import React from "react";
import UserContext from "../../UserContext";
import Prices from "../../components/Prices/Prices";
import AttributesComponent from "../../components/ProductAttributes/AttributesComponent";
import { HTMLParser } from "../../components/HTMLParser/HTMLParser";
import { GET_PRODUCT_DATA } from "../../requests/GET_PRODUCT_DATA";
import { Query } from "@apollo/client/react/components";

class ProductPage extends React.PureComponent {
     static contextType = UserContext;

     state = {
          currentPicture: "",
          selectedAttributes: [],
     }

     getAttributes = (value) => {
          const { selectedAttributes } = this.state;

          const removeFromBag = selectedAttributes.filter(el => el.id !== value.id);
          this.setState({ selectedAttributes: [...removeFromBag, value] });
     }

     changeCurrentPicture = (value) => {
          this.setState({ currentPicture: value });
     }

     renderGallery = gallery => {
          const { changeCurrentPicture } = this;

          return gallery.map(link => {
               return (
                    <li key={gallery.indexOf(link)} onClick={() => {
                         return changeCurrentPicture(link);
                    }}>
                         <img src={link} alt="product" />
                    </li>
               );
          });
     }

     renderMainPhoto = (gallery) => {
          const { currentPicture } = this.state;

          if (currentPicture !== "") {
               return (<img src={currentPicture} alt="product" />);
          } else {
               return (<img src={gallery[0]} alt="product" />);
          }
     }

     renderButton = (attributes, selectedAttributes, id, name, brand, gallery, prices, inStock) => {
          const { addProductToCart, getCountOfAllItems } = this.context;

          const myCallback = (event) => {
               if (attributes.length === selectedAttributes.length) {
                    addProductToCart({ id: id, name: name, brand: brand, gallery: gallery, attributes: attributes, prices: prices, inStock: inStock, selectedAttributes: selectedAttributes });

                    getCountOfAllItems();

               } else {
                    event.preventDefault();
               }
          }
          if (inStock) {

               return (
                    <button className="productPage__btn" onClick={myCallback}>ADD TO CART</button>
               )
          } else {
               return <button className="productPage__btn" disabled>ADD TO CART</button>
          }
     }

     render() {
          const { productId } = this.context;
          const { renderGallery, renderButton, renderMainPhoto, getAttributes } = this;
          const { selectedAttributes } = this.state;

          return (
               <section className="productPage" >
                    <Query query={GET_PRODUCT_DATA(productId)}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              const { id, gallery, name, brand, attributes, prices, inStock, description } = data.product;

                              return (
                                   <div>
                                        <div className="productPage__gallery">
                                             <ul>
                                                  {renderGallery(gallery)}
                                             </ul>
                                             <div className="productPage__mainPhoto">
                                                  {renderMainPhoto(gallery, inStock)}
                                                  {inStock ? false : <div>OUT OF STOCK</div>}
                                             </div>
                                        </div>
                                        <div className="productPage__info">
                                             <p className="productPage__name">{name} <br />
                                                  <span>{brand}</span>
                                             </p>
                                             {
                                                  attributes.length ?
                                                       <AttributesComponent className={"productPage__attributes"} isDisabled={false} attributes={attributes} layoutSize={"big"} getAttributes={getAttributes} productId={id} selectedAttributes={selectedAttributes} /> :
                                                       false
                                             }
                                             <div className="productPage__price">
                                                  <p>Price:</p>
                                                  <Prices prices={prices}></Prices>
                                             </div>
                                             {
                                                  renderButton(attributes, selectedAttributes, id, name, brand, gallery, prices, inStock)
                                             }
                                             <HTMLParser className={"productPage__description"} data={description} />
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