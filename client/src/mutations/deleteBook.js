import gql from "graphql-tag";

export default gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      book {
        title
        id
      }
    }
  }
`;
