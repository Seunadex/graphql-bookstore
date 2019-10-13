import React, { Component } from "react";
import { Query } from "react-apollo";
import {
  Segment,
  Dimmer,
  Loader,
  Container,
  Header,
  Card,
  Button,
  Icon,
  Confirm
} from "semantic-ui-react";

import query from "../queries/getAuthor";
import AuthorUpdateForm from "./AuthorUpdateForm";
import CreateBookForm from "./CreateBookForm";
import { Mutation } from "react-apollo";
import deleteBook from "../mutations/deleteBook";

class Author extends Component {
  state = {
    edit: false,
    createBook: false,
    deletingBook: false,
    bookId: ""
  };

  toggleEdit = () =>
    this.setState({
      edit: !this.state.edit
    });
  toggleCreate = () =>
    this.setState({
      createBook: !this.state.createBook
    });
  confirm = id =>
    this.setState({
      deletingBook: true,
      bookId: id
    });

  cancelDelete = () =>
    this.setState({
      deletingBook: false,
      bookId: ""
    });

  deleteBook = deleteBook => {
    deleteBook({
      variables: { id: parseInt(this.state.bookId) },
      refetchQueries: [{ query, variables: { id: this.props.match.params.id } }]
    }).then(() => {
      this.cancelDelete();
    });
  };

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
          const { edit, createBook, deletingBook } = this.state;

          return (
            <Container>
              {!createBook && !edit && (
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
                      <Mutation mutation={deleteBook}>
                        {(deleteBook, { data }) => (
                          <div>
                            <Icon
                              floated="right"
                              circular
                              link
                              name="delete"
                              size="small"
                              color="red"
                              onClick={() => this.confirm(id)}
                            />
                            <Confirm
                              open={deletingBook}
                              onCancel={this.cancelDelete}
                              onConfirm={() => this.deleteBook(deleteBook)}
                              size='mini'
                              content='Are you sure you want to delete this book?'
                            />
                          </div>
                        )}
                      </Mutation>
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
