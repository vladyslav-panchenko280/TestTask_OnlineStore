import React from "react";
import { GET_CATEGORIES_NAME } from "../../requests/GET_CATEGORIES_NAME";
import { Query } from "@apollo/client/react/components";
import { NavLink, Link } from "react-router-dom";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import logo from './logo.svg';
import shoppingBag from './shoppingBag.svg'
import UserContext from "../../UserContext";

let activeLink = {
     color: "#5ECE7B",
     borderBottom: "1px solid #5ECE7B"
}

class Header extends React.Component {
     static contextType = UserContext;

     render() {
          const { setCategory } = this.context;

          return (
               <header className="header">
                    <div>
                         <ul className="header__categoriesName">
                              <Query query={GET_CATEGORIES_NAME}>
                                   {({ loading, error, data }) => {
                                        if (loading) return null;
                                        if (error) return console.log(error);

                                        const objData = Object.entries(data);
                                        return objData.map(([key, value]) => {
                                             return value.map(el => {
                                                  const { name } = el;
                                                  return (
                                                       <li key={name}>
                                                            <NavLink onClick={() => {
                                                                 setCategory(name)
                                                            }} to={name} className={({ isActive }) => isActive ? activeLink : undefined} href=".">{name}</NavLink>
                                                       </li>
                                                  )
                                             });
                                        })
                                   }}
                              </Query>
                         </ul>
                         <Link to={this.context.currentCategory}>
                              <div className="header__logo">
                                   <img src={logo} alt="Logo" />
                              </div>
                         </Link>
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