import React from "react";
import { GET_CATEGORIES_NAME } from "../../requests/GET_CATEGORIES_NAME";
import { Query } from "@apollo/client/react/components";
import { NavLink, Link } from "react-router-dom";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import logo from './logo.svg';
import shoppingBag from './shoppingBag.svg'
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";

class Header extends React.PureComponent {
     static contextType = UserContext;

     render() {
          const { setCategory, currentCategory, productCart } = this.context;

          return (
               <>
                    <header className="header">
                         <div>
                              <ul className="header__categoriesName">
                                   <Query query={GET_CATEGORIES_NAME}>
                                        {({ loading, error, data }) => {
                                             if (loading) return null;
                                             if (error) return console.log(error);

                                             const categories = findObjectValues(data, 'categories');

                                             return categories.map(el => {
                                                  const name = findObjectValues(el, 'name')
                                                  return (
                                                       <li key={name}>
                                                            <NavLink onClick={() => {
                                                                 setCategory(name)
                                                            }} to={`/${name}`} className={({ isActive }) => isActive ? 'header__activeLink' : 'header__blackColor'}>
                                                                 {name}
                                                            </NavLink>
                                                       </li>
                                                  )
                                             });
                                        }}
                                   </Query>
                              </ul>
                              <Link to={currentCategory} className="header__logo">
                                   <img src={logo} alt="Logo" />
                              </Link>
                              <div className="header__interfaceUtils">
                                   <CurrencySelect />

                                   <div className="header__shoppingBag" onClick={this.context.toggleBagWidget}>
                                        <img src={shoppingBag} alt="Shopping bag" />
                                        {productCart.length >= 1 ? <span className="header__bagCount">{productCart.length}</span> : false}
                                   </div>

                              </div>
                         </div>
                    </header>
               </>
          )
     }
}

export default Header;