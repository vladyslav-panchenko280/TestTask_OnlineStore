import { gql } from "@apollo/client";

export const GET_PRODUCT_ATTRIBUTES = function(productId) {
     return gql`
          query {
               product(id: "${productId}") {
                    attributes {
                         id,
                         name,
                         type,
                         items {
                              displayValue,
                              id,
                              value
                         }
                    }
               }
          }
     `;
}