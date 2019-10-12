import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import createBook from "../mutations/createBook";
import query from "../queries/getAuthor";

class CreateBookForm extends Component {
  state = { title: "", genre: "" };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = createBook => {
    const { title, genre } = this.state;

    createBook({
      variables: { title, genre, author_id: parseInt(this.props.authorId) },
      refetchQueries: [{ query, variables: { id: parseInt(this.props.authorId) } }]

    }).then(() => {
      this.props.toggleCreate();
    });
  };

  render() {
    const { title, genre } = this.state;

    return (
      <Mutation mutation={createBook}>
        {(createBook, { data }) => (
          <Form onSubmit={() => this.handleSubmit(createBook)}>
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
              <Button onClick={this.props.toggleCreate}>Cancel</Button>
            </Button.Group>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateBookForm;
