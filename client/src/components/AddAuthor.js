import React, { Component } from "react";
import { Mutation } from "react-apollo";
import addAuthor from "../mutations/addAuthor";
import query from "../queries/getAuthors";
import AuthorForm from "./AuthorForm";

class AddAuthor extends Component {
  state = { name: "", age: "" };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = addAuthor => {
    const { name, age } = this.state;

    addAuthor({
      variables: { age: parseInt(age), name },
      refetchQueries: [{ query }]
    });
    this.setState({ name: "", age: "" });
  };

  render() {
    const { name, age } = this.state;

    return (
      <Mutation mutation={addAuthor}>
        {(addAuthor, { data }) => (
          <AuthorForm
            onSubmit={() => this.handleSubmit(addAuthor)}
            handleChange={this.handleChange}
            name={name}
            age={age}
            edit={false}
          />
        )}
      </Mutation>
    );
  }
}

export default AddAuthor;
