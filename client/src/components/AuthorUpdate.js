import React, { Component } from "react";
import { Mutation } from "react-apollo";

import updateAuthor from "../mutations/updateAuthor";
import AuthorForm from "./AuthorForm";

class AuthorUpdate extends Component {
  state = { name: "", age: "" };

  componentDidMount() {
    this.setState({ ...this.props.author });
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleSubmit = updateAuthor => {
    const { name, age, id } = this.state;

    updateAuthor({
      variables: { id, name, age: parseInt(age) },
      optimisticResponse: {
        __typename: "Mutation",
        updateAuthor: {
          __typename: "Author",
          author: {
            __typename: "Author",
            id,
            name,
            age
          }
        }
      }
    }).then(() => {
      this.props.toggleEdit();
    });
  };

  render() {
    const { name, age } = this.state;

    return (
      <Mutation mutation={updateAuthor}>
        {(updateAuthor, { data }) => (
          <AuthorForm
            onSubmit={() => this.handleSubmit(updateAuthor)}
            handleChange={this.handleChange}
            name={name}
            age={age}
            onCancel={this.props.toggleEdit}
            edit={true}
          />
        )}
      </Mutation>
    );
  }
}

export default AuthorUpdate;
