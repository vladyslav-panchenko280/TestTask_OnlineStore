import { gql } from "@apollo/client";

export const FETCH_CATEGORY_PRODUCTS = gql`
  query {
     categories {
          name,
          products {
            id,
            name,
            inStock,
            gallery,
            prices {
              currency {
                label, symbol
              },
              amount
            }
          }
        }
  }
`;