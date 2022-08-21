import React from "react";
import { GET_CURRENCY_DATA } from "../../requests/GET_CURRENCY_DATA";
import { Query } from "@apollo/client/react/components";
import UserContext from "../../UserContext";

class CurrencySelect extends React.Component {
     constructor(props) {
          super(props);
          this.wrapperRef = React.createRef();
     }

     static contextType = UserContext;

     state = {
          isOpened: false,
          activeCurrency: ''
     }

     componentDidMount() {
          document.addEventListener("mousedown", this.handleClickOutside);
     }

     handleClickOutside = (event) => {
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isOpened) {
               this.changeOpened()
          }
     }

     changeActiveCurrency = (currency) => {
          this.setState({ activeCurrency: currency })
     }

     changeOpened = () => {
          this.setState({ isOpened: !this.state.isOpened })
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
                              return (
                                   <>
                                        <button className={this.state.isOpened ? activeBtn : disableBtn} onClick={this.changeOpened}>
                                             {this.state.activeCurrency !== '' ? this.state.activeCurrency
                                                  : objData.map(([key, value]) => value[0].symbol)}
                                        </button>
                                        {this.state.isOpened ? <ul>
                                             {objData.map(([key, value]) => {
                                                  return value.map(el => <li onClick={() => {
                                                       this.changeActiveCurrency(el.symbol);
                                                       this.context.setCurrency(el.label)
                                                       this.changeOpened();
                                                  }} key={el.label}>{el.symbol} {el.label}</li>)

                                             })}
                                        </ul> : false}
                                   </>
                              );
                         }}
                    </Query>
               </div>
          )
     }
}

export default CurrencySelect;