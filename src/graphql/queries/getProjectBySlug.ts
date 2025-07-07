import { gql } from '@apollo/client';

export const GET_PROJECT_BY_SLUG = gql`
  query project($slug: String!) {
    project(slug: $slug) {
      id
      name
      description
    }
  }
`;
