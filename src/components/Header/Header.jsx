import React from "react";
import { GET_CATEGORIES_NAME } from "../../requests/GET_CATEGORIES_NAME";
import { Query } from "@apollo/client/react/components";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import logo from './logo.svg';
import shoppingBag from './shoppingBag.svg'

class Header extends React.Component {

     render() {
          return (
               <header className="header">
                    <div>
                         <ul className="header__categoriesName">
                              <Query query={GET_CATEGORIES_NAME}>
                                   {({ loading, error, data }) => {
                                        if (loading) return null;
                                        if (error) return console.log(error);

                                        return data.categories.map(el => <li key={el.name}><a href=".">{el.name}</a></li>);
                                   }}
                              </Query>
                         </ul>
                         <div className="header__logo">
                              <img src={logo} alt="Logo" />
                         </div>
                         <div className="header__interfaceUtils">
                              <CurrencySelect />
                              <div className="header__shoppingBag">
                                   <img src={shoppingBag} alt="Shopping bag" />
                              </div>
                         </div>
                    </div>
               </header>
          )
     }
}

export default Header;