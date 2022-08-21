import React from "react";
import UserContext from "../../UserContext";

class ProductPage extends React.Component {
     static contextType = UserContext;

     render() {
          const { productId } = this.context;
          console.log(productId)
          return (
               <>
                    <p>{productId}</p>
               </>
          )

     }
}

export default ProductPage;