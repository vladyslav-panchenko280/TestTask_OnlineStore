import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import CategoryPage from '../pages/CategoryPage/CategoryPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import UserContext from '../UserContext';

class Router extends React.Component {
     static contextType = UserContext;

     render() {
          const { currentCategory, productId } = this.context;
          return (
               <Routes>
                    <Route exact path='/' element={<Navigate to={currentCategory} />} />
                    <Route exact path={`${currentCategory}/*`} element={<CategoryPage />} />
                    <Route path={`${currentCategory}/${productId}/`} element={<ProductPage />} />
               </Routes>
          )
     }
}

export default Router;