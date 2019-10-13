import gql from 'graphql-tag';

export default gql`
  mutation updateBook($id: ID!, $genre: String!, $title: String) {
    updateBook(id: $id, genre: $genre, title: $title) {
      book {
        title
        id
        genre
      }
    }
  }
`;
