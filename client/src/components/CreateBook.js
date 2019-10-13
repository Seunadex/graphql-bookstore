import React, { Component } from "react";
import { Mutation } from "react-apollo";

import createBook from "../mutations/createBook";
import query from "../queries/getAuthor";
import BookForm from "./BookForm";

class CreateBook extends Component {
  state = { title: "", genre: "" };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = createBook => {
    const { title, genre } = this.state;

    createBook({
      variables: { title, genre, author_id: parseInt(this.props.authorId) },
      refetchQueries: [
        { query, variables: { id: parseInt(this.props.authorId) } }
      ]
    }).then(() => {
      this.props.toggleCreate();
    });
  };

  render() {
    const { title, genre } = this.state;

    return (
      <Mutation mutation={createBook}>
        {(createBook, { data }) => (
          <BookForm
            onSubmit={() => this.handleSubmit(createBook)}
            handleChange={this.handleChange}
            title={title}
            genre={genre}
            onClose={this.props.toggleCreate}
          />
        )}
      </Mutation>
    );
  }
}

export default CreateBook;
