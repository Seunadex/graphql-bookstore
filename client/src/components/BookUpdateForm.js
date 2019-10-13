import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import updateBook from "../mutations/updateBook";

class BookUpdateForm extends Component {
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
            genre,
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
          <Form onSubmit={() => this.handleSubmit(updateBook)}>
            <Form.Field
              label="Title"
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
              value={title}
              control={Input}
            />

            <Form.Field
              label="Genre"
              placeholder="Genre"
              name="genre"
              onChange={this.handleChange}
              value={genre}
              control={Input}
            />
            <Button.Group>
              <Form.Button positive>Submit</Form.Button>
              <Button.Or />
              <Button onClick={this.props.closeBookUpdateModal}>Cancel</Button>
            </Button.Group>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default BookUpdateForm;
