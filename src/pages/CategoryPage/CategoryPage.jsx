import React from "react";
import UserContext from "../../UserContext";
import CategoryPageItem from "../../components/CategoryPageItem/CategoryPageItem";
import { Query } from "@apollo/client/react/components";
import { FETCH_CATEGORY_PRODUCTS } from "../../requests/FETCH_CATEGORY_PRODUCTS";

class CategoryPage extends React.PureComponent {
     static contextType = UserContext;

     renderProducts = products => {

          return products.map(prod => {
               const { id, inStock, gallery, name, prices, brand, attributes } = prod;

               return (
                    <li key={id}>
                         <CategoryPageItem id={id} inStock={inStock} gallery={gallery} name={name} prices={prices} brand={brand} attributes={attributes} />
                    </li>
               )
          })
     }

     renderByCategory = categories => {
          const { currentCategory } = this.context;
          const { renderProducts } = this;

          return categories.map(el => {
               const { name, products } = el;

               return name === currentCategory ? renderProducts(products) : false;
          })
     }

     render() {
          const { currentCategory } = this.context;
          const { renderByCategory } = this;

          return (
               <section className="categoryPage" >
                    <div>
                         <h2>{currentCategory}</h2>
                         <ul className="categoryPage__products">

                              <Query query={FETCH_CATEGORY_PRODUCTS}>
                                   {({ loading, error, data }) => {
                                        if (loading) return null;
                                        if (error) return console.log(error);

                                        const { categories } = data;

                                        return renderByCategory(categories);
                                   }}
                              </Query>
                         </ul>
                    </div>
               </section>
          );
     }
}


export default CategoryPage;