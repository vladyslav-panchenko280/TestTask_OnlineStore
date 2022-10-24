import React from "react";
import { TextAttr } from "./components/ProductAttributes/TextAttr";
import { SwatchAttr } from "./components/ProductAttributes/SwatchAttr";
import { findObjectValues } from "./functions/findObjectValues";

const UserContext = React.createContext();

class UserProvider extends React.Component {
     state = {
          currentCategory: "all",
          currentCurrency: "USD",
          currentCurrencySymbol: "$",
          productId: "",
          productCart: [],
          totalPrice: 0,
          openedBagWidget: false,
          tax: 21,
          uniqProductsArray: []
     }

     getCountOfItem = (id) => {
          let count = 0;
          this.state.uniqProductsArray.map(el => {
               if (el.id === id) {
                    count = el.count
               }
          })
          return count;
     }

     getCountOfAllItems = () => {
          let res = 0;
          this.state.productCart.forEach(el => res++)
          return res
     }

     getUniqProds = () => {
          let array = [];

          const filterArray = (array, identify) => {

               for (let i of array) {
                    let count = 0;
                    for (let j of array) {
                         if (i.id === j.id && findObjectValues(i.selectedAttributes, "name") === findObjectValues(j.selectedAttributes, "name") && findObjectValues(i.selectedAttributes, "value") === findObjectValues(j.selectedAttributes, "value")) {
                              count++;
                              i.count = count;
                         }
                    }
               }

               const matches = {};
               const filtered = [];
               for (let i = 0, ii = array.length; i < ii; i++) {
                    const identity = identify(array[i]);
                    if (!(identity in matches)) {
                         matches[identity] = true;
                         filtered.push(array[i]);
                    }
               }

               return filtered;
          };


          array = filterArray(this.state.productCart, item => item.id && findObjectValues(item.selectedAttributes, "name") && findObjectValues(item.selectedAttributes, "value"));


          this.setState({ uniqProductsArray: array })
     }

     toggleBagWidget = () => {
          this.setState({ openedBagWidget: !this.state.openedBagWidget });
     }

     addProductToCart = (product) => {
          this.setState({ productCart: [...this.state.productCart, product] })
     }

     removeProductFromCart = (id, selectedAttributes) => {
          const arr = this.state.productCart;
          
          arr.map(((el, index) => {
               if (el.id === id && findObjectValues(el.selectedAttributes, "name") === findObjectValues(selectedAttributes, "name") && findObjectValues(el.selectedAttributes, "value") === findObjectValues(selectedAttributes, "value")) {
                    return arr.splice(arr[index], 1)
               }
          }))
          this.setState({productCart: arr})
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

     sumOperation = (sum, operation) => {
          if (operation === "+") this.setState({ totalPrice: Number.parseFloat((this.state.totalPrice + sum).toFixed(2)) })
          else this.setState({ totalPrice: Number.parseFloat((this.state.totalPrice - sum).toFixed(2)) })
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

          return this.setState({ totalPrice: Number.parseFloat(total.toFixed(2)) })
     }

     setProductId = (id) => {
          this.setState({ productId: id })
     }

     setCategory = (category) => {
          this.setState({ currentCategory: category });
     }

     setCurrency = (label, symbol) => {
          this.setState({ currentCurrency: label, currentCurrencySymbol: symbol });

     }

     render() {
          const { children } = this.props;
          const { currentCategory, currentCurrency, productId, productCart, totalPrice, openedBagWidget, tax, currentCurrencySymbol, uniqProductsArray } = this.state;
          const { setCategory, setCurrency, setProductId, addProductToCart, calculateTotalPrice, toggleBagWidget, renderAttributes, sumOperation, getUniqProds, getCountOfItem, getCountOfAllItems, removeProductFromCart } = this;

          return (
               <UserContext.Provider value={{
                    currentCategory,
                    currentCurrency,
                    productId,
                    currentCurrencySymbol,
                    productCart,
                    totalPrice,
                    openedBagWidget,
                    tax,
                    uniqProductsArray,
                    getCountOfAllItems,
                    removeProductFromCart,
                    getUniqProds,
                    renderAttributes,
                    toggleBagWidget,
                    sumOperation,
                    calculateTotalPrice,
                    getCountOfItem,
                    addProductToCart,
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