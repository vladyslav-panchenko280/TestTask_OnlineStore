import { gql } from "@apollo/client";

export const FETCH_CATEGORY_PRODUCTS = gql`
  query {
     categories {
          name,
          products {
            id,
            name,
            inStock,
            brand,
            gallery,
            prices {
              currency {
                label, symbol
              },
              amount
            },
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
  }
`;