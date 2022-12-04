import React from "react";
import { TextAttr } from "./components/ProductAttributes/TextAttr";
import { SwatchAttr } from "./components/ProductAttributes/SwatchAttr";
import { getSpecialKey } from "./functions/getSpecialKey";

const UserContext = React.createContext();

class UserProvider extends React.PureComponent {
     constructor(props) {
          super(props);

          const app = JSON.parse(window.localStorage.getItem('app')) || null;

          if (app) {
               const { currentCategory, currentCurrency, currentCurrencySymbol, productId, totalPrice, pageNames, countInCart } = app;
               const productCart = new Map(app.productCart);

               this.state = {
                    currentCategory: currentCategory,
                    currentCurrency: currentCurrency,
                    currentCurrencySymbol: currentCurrencySymbol,
                    productId: productId,
                    productCart: productCart,
                    totalPrice: totalPrice,
                    pageNames: pageNames,
                    countInCart: countInCart,
                    openedBagWidget: false,
                    tax: 21
               }
          } else {
               this.state = {
                    currentCategory: "",
                    currentCurrency: "USD",
                    currentCurrencySymbol: "$",
                    productId: "",
                    productCart: new Map(),
                    totalPrice: 0,
                    pageNames: [],
                    countInCart: 0,
                    openedBagWidget: false,
                    tax: 21
               }
          }
     }

     componentDidUpdate() {
          const { currentCategory, currentCurrency, currentCurrencySymbol, productCart, productId, totalPrice, pageNames, countInCart } = this.state;
          const { calculateTotalPrice } = this;

          if (productCart.size !== 0) calculateTotalPrice();

          window.localStorage.setItem("app", JSON.stringify({
               currentCategory,
               currentCurrency,
               currentCurrencySymbol,
               productId,
               productCart: Array.from(productCart.entries()),
               totalPrice,
               pageNames,
               countInCart
          }));
     }

     setPageNames = (newNames) => {
          this.setState({ pageNames: newNames });
     }

     getCountOfItem = (key) => {
          let mapArray = this.state.productCart;

          if (mapArray.has(key)) {
               return mapArray.get(key).length;
          }
     }

     getCountOfAllItems = () => {
          if (this.state.productCart.size === 0) {
               this.setState({ countInCart: 0 });
          } else {
               let array = [];

               this.state.productCart.forEach(el => {
                    array.push(el.length);
               })

               let count = array.reduce((a, b) => a + b);

               this.setState({ countInCart: count });
          }
     }

     toggleBagWidget = () => {
          this.setState({ openedBagWidget: !this.state.openedBagWidget });
     }

     addProductToCart = (obj) => {
          let mapArray = this.state.productCart;

          let key = getSpecialKey(obj.id, obj.selectedAttributes);

          if (!mapArray.has(key)) {
               let subArray = [];
               subArray.push(obj);
               mapArray.set(key, subArray);
          } else {
               let getArray = mapArray.get(key);
               getArray.push(obj);
          }

          this.setState({ productCart: mapArray });
     }

     removeProductFromCart = (key) => {
          let mapArray = this.state.productCart;

          if (!mapArray.has(key)) {
               return false;
          } else {
               if (mapArray.get(key).length === 1) {
                    mapArray.delete(key);
               } else if (mapArray.get(key).length > 1) {
                    mapArray.get(key).pop();
               }
          }

          this.setState({ productCart: mapArray });
     }

     renderAttributes = (type, id, name, items, layoutSize, selectedAttributes = null) => {
          switch (type) {
               case "text": {
                    return <TextAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={layoutSize} />;
               }
               case "swatch": {
                    return <SwatchAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes} layoutSize={layoutSize} />;
               }
               default: {
                    return false;
               }
          }
     }

     sumOperation = (sum, operation) => {
          if (operation === "+") this.setState({ totalPrice: Number.parseFloat((this.state.totalPrice + sum).toFixed(2)) });
          else this.setState({ totalPrice: Number.parseFloat((this.state.totalPrice - sum).toFixed(2)) });
     }

     calculateTotalPrice = () => {
          let total = 0;

          this.state.productCart.forEach((element, key) => {
               element.forEach(item => {
                    item.prices.forEach(currency => {
                         const { amount } = currency;
                         const { label } = currency.currency;

                         return label === this.state.currentCurrency ? total += amount : false;
                    });
               });
          });

          this.setState({ totalPrice: Number.parseFloat(total.toFixed(2)) });
     }

     setProductId = (id) => {
          this.setState({ productId: id });
     }

     setCategory = (category) => {
          this.setState({ currentCategory: category });
     }

     setCurrency = (label, symbol) => {
          this.setState({ currentCurrency: label, currentCurrencySymbol: symbol });

     }

     render() {
          const { children } = this.props;
          const { currentCategory, currentCurrency, productId, productCart, totalPrice, openedBagWidget, tax, currentCurrencySymbol, countInCart, pageNames } = this.state;
          const { setCategory, setCurrency, setProductId, addProductToCart, calculateTotalPrice, toggleBagWidget, renderAttributes, sumOperation, getCountOfItem, getCountOfAllItems, removeProductFromCart, setPageNames } = this;

          return (
               <UserContext.Provider value={{
                    currentCategory,
                    currentCurrency,
                    countInCart,
                    productId,
                    currentCurrencySymbol,
                    productCart,
                    totalPrice,
                    openedBagWidget,
                    tax,
                    pageNames,
                    setPageNames,
                    getCountOfAllItems,
                    removeProductFromCart,
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
          );
     }
}

export default UserContext;

export { UserProvider }