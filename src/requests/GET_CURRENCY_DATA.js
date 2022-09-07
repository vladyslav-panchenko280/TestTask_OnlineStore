import { gql } from "@apollo/client";

export const GET_CURRENCY_DATA = gql`
  query {
     currencies {
          symbol,
          label
     }
  }
`;