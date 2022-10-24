import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from '../../functions/findObjectValues';

class Prices extends React.PureComponent {
     static contextType = UserContext;

     renderPrice = prices => {
          return prices.map(el => {
               const amount = findObjectValues(el, 'amount');
               const label = findObjectValues(el, 'label');
               const symbol = findObjectValues(el, 'symbol');

               return label === this.context.currentCurrency ? `${symbol}${amount}` : false
          })
     }

     render() {
          return <span className={this.props.class}>{this.renderPrice(this.props.prices)}</span>
     }
}

export default Prices;