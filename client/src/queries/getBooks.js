import gql from 'graphql-tag';

export default gql`
  {
    books {
      id
      title
      genre
      authorId
    }
  }
`;
