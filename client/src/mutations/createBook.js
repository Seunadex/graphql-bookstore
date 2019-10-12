
import gql from "graphql-tag";

export default gql`
  mutation createBook($title: String, $genre: String, $author_id: ID!) {
    createBook(title: $title, genre: $genre, authorId: $author_id) {
      book {
        id
        title
        genre
        authorId
      }
    }
  }
`;
