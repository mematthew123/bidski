import { gql } from '@apollo/client';

export const SOURCES_QUERY = gql`
  query sources($input: SourceSearchInput!) {
    sources(input: $input) {
      nodes {
        id
        name
        calculatedUnitRateUsdCents
        laborRateUsdCents
        materialRateUsdCents
      }
    }
  }
`;
