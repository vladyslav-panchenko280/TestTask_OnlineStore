import { gql } from "@apollo/client";

export const GET_PRODUCT_DATA = function(productId) {
     return gql`
          query {
               product(id: "${productId}") {
                    id,
                    name,
                    inStock,
                    gallery,
                    description,
                    category,
                    attributes {
                         id,
                         name,
                         type,
                         items {
                              displayValue,
                              id,
                              value
                         }
                    },
                    prices {
                         currency {
                              label,
                              symbol
                         },
                         amount
                    },
                    brand
               }
          }
     `;
}
