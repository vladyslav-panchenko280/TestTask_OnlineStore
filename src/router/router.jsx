import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import ProductPage from '../pages/ProductPage/ProductPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import Cart from '../pages/Cart/Cart';
import UserContext from '../UserContext';

class Router extends React.Component {
     static contextType = UserContext;

     render() {
          const { currentCategory, productId } = this.context;
          return (
               <Routes>
                    <Route exact path='/' element={<Navigate to={`/${currentCategory}`} />} />
                    <Route path={`/${currentCategory}`} element={<CategoryPage />} />
                    <Route path={`/${currentCategory}/:${productId}`} element={<ProductPage />} />
                    <Route path={`/cart`} element={<Cart />} />
                    <Route path='*' element={<Navigate to={`/${currentCategory}`} />} />
               </Routes>
          )
     }
}

export default Router;