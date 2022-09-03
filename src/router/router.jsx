import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import ProductPage from '../pages/ProductPage/ProductPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import UserContext from '../UserContext';

class Router extends React.Component {
     static contextType = UserContext;

     render() {
          const { currentCategory, productId } = this.context;
          return (
               <Routes>
                    <Route exact path='/' element={<Navigate to={`/${currentCategory}`} />} />
                    <Route  path={`/${currentCategory}/`} element={<CategoryPage />} >
                    </Route>
                    <Route  path={`/${currentCategory}/:${productId}`} element={<ProductPage />} />
                    <Route path='*' element={<div>404</div>}></Route>

                    


               </Routes>
          )
     }
}

export default Router;