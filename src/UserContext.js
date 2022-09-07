import React from "react";
import { TextAttr } from "./components/ProductAttributes/TextAttr";
import {SwatchAttr} from "./components/ProductAttributes/SwatchAttr";
import { findObjectValues } from "./functions/findObjectValues";

const UserContext = React.createContext();

class UserProvider extends React.Component {
     state = {
          currentCategory: "all",
          currentCurrency: "USD",
          productId: "",
          productCart: [],
          totalPrice: 0,
          openedBagWidget: false,
          uniqProductsArray: []
     }

     toggleBagWidget = () => {
          this.setState({openedBagWidget: !this.state.openedBagWidget});
     }

     addProductToCart = (product) => {
          this.setState({productCart: [...this.state.productCart , product]})
     }

     renderAttributes = (type, id, name, items, layoutSize, selectedAttributes = null) => {
          switch (type) {
               case "text": {
                    return <TextAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={layoutSize} />
               }
               case "swatch": {
                    return <SwatchAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={layoutSize} />
               }
               default: {
                    return false
               }
          }
     }

     calculateTotalPrice = () => {
          let total = 0;
          let symbol = ''
          this.state.productCart.forEach(element => {
               element.prices.forEach(el => {
                    const amount = findObjectValues(el, 'amount');
                    const label = findObjectValues(el, 'label');
                    const elemSymbol = findObjectValues(el, 'symbol');
                    
                    return label === this.state.currentCurrency ? (total += amount, symbol = elemSymbol) : (false);
                    
               })
          });
          return this.setState({totalPrice: `${symbol}${total.toFixed(2)}`})
     }

     getUniqProds = (productCart) => {
          const productCount = Object.create(null)
          const addedProducts = new Set()

          for (let elem of productCart) {
               let { id } = elem;
               if ((productCount[id] = ~~productCount[id] + 1) === 1) {
                    addedProducts.add(elem);
               }
          }

          const addedProductsArr = Array.from(addedProducts);
          const productCountArr = Object.entries(productCount)

          for (let elem of addedProductsArr) {
               const { id } = elem;
               for (let [key, value] of productCountArr) {
                    if (id === key) elem.count = value;
               }
          }

          return this.setState({ uniqProductsArray: addedProductsArr });
     }

     removeProductFromCart = (id) => {
          const newArray= this.state.productCart.splice(this.state.productCart.map(el => el.id).indexOf(id), 1);
          this.state.productCart.pop(newArray)
          this.setState({productCart: [...this.state.productCart, newArray[0]]})
     }

     setProductId = (id) => {
          this.setState({productId: id})
     }

     setCategory = (category) => {
          this.setState({ currentCategory: category });
     }

     setCurrency = (label) => {
          this.setState({ currentCurrency: label });

     }

     render() {
          const { children } = this.props;
          const { currentCategory, currentCurrency, productId, productCart, totalPrice, openedBagWidget, uniqProductsArray } = this.state;
          const { setCategory, setCurrency, setProductId, addProductToCart, removeProductFromCart, calculateTotalPrice, toggleBagWidget, getUniqProds, renderAttributes } = this;

          return (
               <UserContext.Provider value={{
                    currentCategory,
                    currentCurrency,
                    productId,
                    productCart,
                    totalPrice,
                    openedBagWidget,
                    uniqProductsArray,
                    renderAttributes,
                    getUniqProds,
                    toggleBagWidget,
                    calculateTotalPrice,
                    addProductToCart,
                    removeProductFromCart,
                    setProductId,
                    setCurrency,
                    setCategory
               }}>
                    {children}
               </UserContext.Provider>
          )
     }
}

export default UserContext;

export { UserProvider }