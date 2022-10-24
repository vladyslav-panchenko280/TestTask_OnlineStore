import React from "react";
import { GET_CURRENCY_DATA } from "../../requests/GET_CURRENCY_DATA";
import { Query } from "@apollo/client/react/components";
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";

class CurrencySelect extends React.PureComponent {
     constructor(props) {
          super(props);
          this.wrapperRef = React.createRef();
     }

     static contextType = UserContext;

     state = {
          isOpened: false,
          activeCurrency: ''
     }

     handleClickOutside = (event) => {
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isOpened) {
               this.changeOpened();
               document.removeEventListener("mousedown", this.handleClickOutside);
          }
     }

     changeActiveCurrency = (currency) => {
          this.setState({ activeCurrency: currency });
          if (this.context.totalPrice !== 0) {
               return this.context.calculateTotalPrice()
          }
     }

     changeOpened = () => {
          this.setState({ isOpened: !this.state.isOpened });
          document.addEventListener("mousedown", this.handleClickOutside);
     }

     renderCurrencies = (currencies) => {
          return <ul>
          {currencies.map(el => <li onClick={() => {
               const symbol = findObjectValues(el, 'symbol');
               const label = findObjectValues(el, 'label');

               this.context.setCurrency(label, symbol)
               this.changeActiveCurrency(symbol);
               this.changeOpened();
               
          }} key={findObjectValues(el, 'label')}>{findObjectValues(el, 'symbol')} {findObjectValues(el, 'label')}</li>)

          }
     </ul>
     }

     render() {

          return (
               <div ref={this.wrapperRef} className="currencySelect">
                    <Query query={GET_CURRENCY_DATA}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              const disableBtn = "currencySelect__btn--disable"
                              const activeBtn = "currencySelect__btn--active";
                              const objData = Object.entries(data);

                              const currencies = findObjectValues(data, "currencies");

                              return (
                                   <>
                                        <button className={this.state.isOpened ? activeBtn : disableBtn} onClick={this.changeOpened}>
                                             {this.state.activeCurrency !== '' ? this.state.activeCurrency
                                                  : objData.map(([key, value]) => value[0].symbol)}
                                        </button>
                                        {this.state.isOpened ? this.renderCurrencies(currencies) : false}
                                   </>
                              );
                         }}
                    </Query>
               </div>
          )
     }
}

export default CurrencySelect;