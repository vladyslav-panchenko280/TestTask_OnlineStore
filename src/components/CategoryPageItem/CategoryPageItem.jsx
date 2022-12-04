import React from "react";
import UserContext from "../../UserContext";
import shoppingBag from "./shoppingBag.svg";
import Prices from "../../components/Prices/Prices";
import { Link } from "react-router-dom";

class CategoryPageItem extends React.PureComponent {
     static contextType = UserContext;

     renderButton = (id, name, gallery, brand, inStock, attributes, prices) => {
          const { addProductToCart, getCountOfAllItems } = this.context;

          const selectedAttributes = [];

          attributes.forEach(attribute => {
               let { name, id, type, items } = attribute;

               selectedAttributes.push({ name, id, type, items: { displayValue: items[0].displayValue, id: items[0].id, value: items[0].value } });
          });

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
                    <button className="categoryPageItem__purchaseBtn" onClick={myCallback}>
                         <img src={shoppingBag} alt="Shopping bag" />
                    </button>
               );
          } else {
               return (
                    <button className="categoryPageItem__purchaseBtn" disabled onClick={event => event.preventDefault()}>
                         <img src={shoppingBag} alt="Shopping bag" />
                    </button>
               );
          }
     }

     render() {
          const { currentCategory, setProductId } = this.context;
          const { id, inStock, gallery, brand, prices, name, attributes } = this.props;
          const { renderButton } = this;

          return (
               <div className="categoryPageItem">
                    <Link to={`/${currentCategory}/${id}`}
                         onClick={event => {
                              let btn = document.querySelector(".categoryPageItem__purchaseBtn");

                              if (event.target === btn || event.target.parentNode === btn) {
                                   event.preventDefault();
                              } else {
                                   setProductId(id);
                              }
                         }}>
                         <div className="categoryPageItem__productWrapper">
                              <div className="categoryPageItem__imgWrapper">
                                   {inStock ? false : <div>OUT OF STOCK</div>}
                                   <img src={gallery[0]} alt="Prod pic" />
                              </div>
                              <p className="categoryPageItem__productName">{brand} – {name}</p>
                              <Prices class={"categoryPageItem__productPrice"} prices={prices} />
                         </div>
                    </Link>


                    {renderButton(id, name, gallery, brand, inStock, attributes, prices)}

               </div>
          );
     }
}


export default CategoryPageItem;