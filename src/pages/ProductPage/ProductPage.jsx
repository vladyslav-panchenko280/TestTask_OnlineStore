import React from "react";
import { Query } from "@apollo/client/react/components";
import UserContext from "../../UserContext";
import { gql } from "@apollo/client";
import { findObjectValues } from "../../functions/findObjectValues";
import TextAttr from "../../components/ProductAttributes/TextAttr";
import SwatchAttr from "../../components/ProductAttributes/SwatchAttr";

class ProductPage extends React.Component {
     static contextType = UserContext;

     state = {
          currentPicture: ""
     }

     renderAttributes = (type, id, name, items) => {
          switch (type) {
               case "text": {
                    return <TextAttr key={id} id={id} name={name} items={items} />
               }
               case "swatch": {
                    return <SwatchAttr key={id} id={id} name={name} items={items} />
               }
               default: {
                    return false
               }
          }
     }

     GET_PRODUCT_DATA = gql`
      query {
     product(id: "${this.context.productId}") {
          id,
          name,
          inStock,
          gallery,
          description,
          category,
          attributes {
            id,
            name,
            type,
            items {
              displayValue,
              id,
              value
            }
          },
          prices {
            currency {
              label,
              symbol
            },
            amount
          },
          brand
          
        }
  }
`;



     changeCurrentPicture = (value) => {
          this.setState({ currentPicture: value })
     }

     render() {
          return (
               <section className="productPage">
                    <Query query={this.GET_PRODUCT_DATA}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

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
                                                  {gallery.map(link => {
                                                       return <li key={gallery.indexOf(link)} onClick={() => {
                                                            return this.changeCurrentPicture(link);
                                                       }}><img src={link} alt="product" /></li>
                                                  })}
                                             </ul>
                                             <div className="productPage__mainPhoto">
                                                  {this.state.currentPicture !== "" ? <img src={this.state.currentPicture} alt="product" /> : <img src={gallery[0]} alt="product" />}
                                                  {inStock ? false : <div>OUT OF STOCK</div>}
                                             </div>
                                        </div>
                                        <div className="productPage__info">
                                             <p className="productPage__name">{name} <br />
                                                  <span>{brand}</span>
                                             </p>
                                             <div className="productPage__attributes">
                                                  {attributes.map(el => {
                                                       const id = findObjectValues(el, 'id');
                                                       const type = findObjectValues(el, 'type');
                                                       const name = findObjectValues(el, 'name');
                                                       const items = findObjectValues(el, 'items');

                                                       return this.renderAttributes(type, id, name, items);
                                                  })}
                                             </div>
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
                                             <button className="productPage__btn">ADD TO CART</button>
                                             <div dangerouslySetInnerHTML={{
                                                  __html:description
                                             }} className="productPage__description"></div>
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