import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";
import { GET_CURRENCY_DATA } from "../../requests/GET_CURRENCY_DATA";
import { Query } from "@apollo/client/react/components";

class CurrencySelect extends React.PureComponent {
     static contextType = UserContext;

     constructor(props) {
          super(props);
          this.wrapperRef = React.createRef();

          const appCurrency = JSON.parse(window.localStorage.getItem("appCurrency")) || null;

          if (appCurrency) {
               this.state = {
                    isOpened: false,
                    activeCurrency: appCurrency
               }
          } else {
               this.state = {
                    isOpened: false,
                    activeCurrency: ""
               }
          }
     }

     componentDidUpdate() {
          window.localStorage.setItem("appCurrency", JSON.stringify(this.state.activeCurrency));
     }

     handleClickOutside = (event) => {
          const { wrapperRef, changeOpened, handleClickOutside } = this;
          const { isOpened } = this.state

          if (wrapperRef && !wrapperRef.current.contains(event.target) && isOpened) {
               changeOpened();
               document.removeEventListener("mousedown", handleClickOutside);
          }
     }


     changeActiveCurrency = (currency) => {
          const { totalPrice, calculateTotalPrice } = this.context;

          this.setState({ activeCurrency: currency });
          if (totalPrice !== 0) {
               calculateTotalPrice();
          }
     }

     changeOpened = () => {
          const { handleClickOutside } = this;
          const { isOpened } = this.state;

          this.setState({ isOpened: !isOpened });
          document.addEventListener("mousedown", handleClickOutside);
     }

     renderCurrencies = (currencies) => {
          const { changeActiveCurrency, changeOpened } = this;
          const { setCurrency } = this.context;

          return <ul>
               {currencies.map(el => <li onClick={() => {
                    const { symbol, label } = el;

                    setCurrency(label, symbol);

                    changeActiveCurrency(symbol);

                    changeOpened();

               }} key={findObjectValues(el, "label")}>{findObjectValues(el, "symbol")} {findObjectValues(el, "label")}</li>)

               }
          </ul>
     }

     render() {
          const { wrapperRef, renderCurrencies, changeOpened } = this;
          const { isOpened, activeCurrency } = this.state;

          return (
               <div ref={wrapperRef} className="currencySelect">
                    <Query query={GET_CURRENCY_DATA}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              const disableBtn = "currencySelect__btn--disable"
                              const activeBtn = "currencySelect__btn--active";
                              const objData = Object.entries(data);

                              const { currencies } = data;

                              return (
                                   <>
                                        <button className={isOpened ? activeBtn : disableBtn} onClick={changeOpened}>
                                             {activeCurrency !== "" ? activeCurrency
                                                  : objData.map(([key, value]) => value[0].symbol)}
                                        </button>
                                        {isOpened ? renderCurrencies(currencies) : false}
                                   </>
                              );
                         }}
                    </Query>
               </div>
          )
     }
}

export default CurrencySelect;