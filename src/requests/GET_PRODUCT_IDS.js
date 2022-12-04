import { gql } from "@apollo/client";

export const GET_PRODUCT_IDS = gql`
  query {
     categories {
          name,
          products {
            id
          }
     }
}`;