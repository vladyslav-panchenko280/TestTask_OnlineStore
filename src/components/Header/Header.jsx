import React from "react";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import shoppingBag from "./shoppingBag.svg";
import UserContext from "../../UserContext";
import logo from "./logo.svg";
import { NavLink, Link } from "react-router-dom";

class Header extends React.PureComponent {
     static contextType = UserContext;

     renderCategoryNames = (names) => {
          const { setCategory } = this.context;

          return names.map(name => {

               return (

                    <li key={name}>
                         <NavLink onClick={() => {
                              setCategory(name);
                         }} to={`/${name}`} className={({ isActive }) => isActive ? "header__activeLink" : "header__blackColor"}>
                              {name}
                         </NavLink>
                    </li>

               )
          });
     }

     render() {
          const { toggleBagWidget, countInCart, pageNames, setCategory } = this.context;
          const { renderCategoryNames } = this;

          return (
               <>
                    <header className="header">
                         <div>
                              <ul className="header__categoriesName">
                                   {renderCategoryNames(pageNames)}
                              </ul>
                              <Link to={pageNames[0]} onClick={() => {
                                   setCategory(pageNames[0]);
                              }} className="header__logo">
                                   <img src={logo} alt="Logo" />
                              </Link>
                              <div className="header__interfaceUtils">
                                   <CurrencySelect />
                                   <div className="header__shoppingBag" onClick={toggleBagWidget}>
                                        <img src={shoppingBag} alt="Shopping bag" />
                                        {countInCart > 0 ? <p className="header__bagCount"><span>{countInCart}</span></p> : false}
                                   </div>

                              </div>
                         </div>
                    </header>
               </>
          )
     }
}

export default Header;