import React, { Component } from "react";
import { Mutation } from "react-apollo";

import updateBook from "../mutations/updateBook";
import BookForm from "./BookForm";

class BookUpdate extends Component {
  state = { title: "", genre: "" };

  componentDidMount() {
    this.setState({ ...this.props.book });
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = updateBook => {
    const { title, genre, id } = this.state;

    updateBook({
      variables: { id, title, genre },
      optimisticResponse: {
        __typename: "Mutation",
        updateBook: {
          __typename: "Book",
          book: {
            __typename: "Book",
            id,
            title,
            genre
          }
        }
      }
    }).then(() => {
      this.props.closeBookUpdateModal();
    });
  };

  render() {
    const { title, genre } = this.state;

    return (
      <Mutation mutation={updateBook}>
        {(updateBook, { data }) => (
          <BookForm
            onSubmit={() => this.handleSubmit(updateBook)}
            handleChange={this.handleChange}
            title={title}
            genre={genre}
            onClose={this.closeBookUpdateModal}
          />
        )}
      </Mutation>
    );
  }
}

export default BookUpdate;
