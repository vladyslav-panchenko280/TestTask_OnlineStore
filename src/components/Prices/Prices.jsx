import React from "react";
import UserContext from "../../UserContext";

class Prices extends React.PureComponent {
     static contextType = UserContext;

     renderPrice = prices => {
          const { currentCurrency } = this.context;

          return prices.map(el => {
               const { amount } = el;
               const { label, symbol } = el.currency;

               return label === currentCurrency ? `${symbol}${amount}` : false
          })
     }

     render() {
          const { renderPrice } = this;

          return <span className={this.props.class}>{renderPrice(this.props.prices)}</span>
     }
}

export default Prices;