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

export const TREE_QUERY = gql`
  query categoryTreeItems($input: CategoryPathSearchInput!) {
    categoryTreeItems(input: $input) {
      nodes {
        id
        name
        hasSubCategories
      }
      pageInfo {
        hasNextPage
      }
      dataLocation {
        countyName
        stateName
      }
    }
  }
`;
