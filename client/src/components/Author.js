import React, { Component } from "react";
import { Query } from "react-apollo";
import {
  Segment,
  Dimmer,
  Loader,
  Container,
  Header,
  Card,
  Button
} from "semantic-ui-react";

import query from "../queries/getAuthor";
import AuthorUpdateForm from "./AuthorUpdateForm";
import CreateBookForm from "./CreateBookForm";

class Author extends Component {
  state = {
    edit: false,
    createBook: false
  };

  toggleEdit = () =>
    this.setState({
      edit: !this.state.edit
    });
  toggleCreate = () =>
    this.setState({
      createBook: !this.state.createBook
    });

  render() {
    const { id } = this.props.match.params;
    return (
      <Query query={query} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            );

            if (error) return <p>{error}</p>;

            const { name, age, books } = data.author;
            const { edit, createBook } = this.state;


          return (
            <Container>
              {(!createBook && !edit) && (
                <div>
                  <Header as="h1">{name}</Header>
                  <Header>Age: {age}</Header>
                  <Button onClick={this.props.history.goBack}>Back</Button>
                  <Button onClick={this.toggleEdit}>Edit</Button>
                  <Button onClick={this.toggleCreate}>Create Book</Button>
                </div>
                )}
              {edit && (
                <AuthorUpdateForm
                toggleEdit={this.toggleEdit}
                author={data.author}
              />
              )}

              {createBook && (
                <CreateBookForm
                  authorId={data.author.id}
                  toggleCreate={this.toggleCreate}
                />
              )}

              <Card.Group centered>
                {books.map(({ id, title, genre }) => (
                  <Card key={id}>
                    <Card.Content>
                      <Card.Header>{title}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Card.Description>{genre}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Author;
