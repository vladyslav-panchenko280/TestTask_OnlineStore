import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from "../../functions/findObjectValues";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT_IDS } from "../../requests/GET_PRODUCT_IDS";

class URLHandler extends React.PureComponent {
     static contextType = UserContext;

     state = {
          pathname: window.location.pathname.slice(1).split("/"),
          ids: []
     }

     handleURL = (data) => {
          const { setPageNames, setCategory, setProductId } = this.context;
          const { pathname } = this.state;
          const { categories } = data;

          const names = findObjectValues(categories, "name", false);

          if (pathname.length === 1 && !pathname[0]) {
               setCategory(names[0]);
          } else {
               categories.forEach(el => {
                    let match = el.products.some(prod => prod.id === pathname[1]);

                    if (el.name === pathname[0] && match) {
                         setCategory(pathname[0]);
                         setProductId(pathname[1]);
                    } else if (el.name === pathname[0] && pathname.length === 1) {
                         setCategory(pathname[0]);
                    }
               });
          }

          this.setState({ ids: categories })

          setPageNames(names);
     }

     render() {
          const { handleURL } = this;
          const { children } = this.props;

          return (
               <>
                    <Query query={GET_PRODUCT_IDS} onCompleted={handleURL}>
                         {({ loading, error, data }) => {
                              if (loading) return null;
                              if (error) return console.log(error);

                              return children;
                         }}
                    </Query>
               </>
          )
     }
}

export default URLHandler;