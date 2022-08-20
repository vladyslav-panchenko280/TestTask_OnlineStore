import React from "react";
import { GET_CURRENCY_DATA } from "../../requests/GET_CURRENCY_DATA";
import { Query } from "@apollo/client/react/components";


class CurrencySelect extends React.Component {
     state = {
          isOpened: false,
          activeCurrency: ''
     }

     changeActiveCurrency = (currency) => {
          this.setState({ activeCurrency: currency })
     }

     changeOpened = () => {
          this.setState({ isOpened: !this.state.isOpened })
     }

     render() {
          return (
               <div className="currencySelect">
                    <Query query={GET_CURRENCY_DATA}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              return (
                                   <>
                                        <button onClick={this.changeOpened}>
                                             {this.state.activeCurrency !== '' ? this.state.activeCurrency : data.currencies[0].symbol}
                                        </button>
                                        {this.state.isOpened ? <ul>
                                             {data.currencies.map(el => <li onClick={() => {
                                                  this.changeActiveCurrency(el.symbol);
                                                  this.changeOpened();
                                             }} key={el.label}>{el.symbol} {el.label}</li>)}
                                        </ul>  : false}
                                   </>
                              );
                         }}
                    </Query>
               </div>
          )
     }
}

export default CurrencySelect;