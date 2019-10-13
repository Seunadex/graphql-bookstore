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
  Confirm,
  Modal
} from "semantic-ui-react";

import query from "../queries/getAuthor";
import AuthorUpdateForm from "./AuthorUpdate";
import CreateBook from "./CreateBook";
import BookUpdate from "./BookUpdate";
import { Mutation } from "react-apollo";
import deleteBook from "../mutations/deleteBook";

class Author extends Component {
  state = {
    edit: false,
    createBook: false,
    deletingBook: false,
    bookId: "",
    isUpdateModalOpen: false
  };

  showBookUpdateModal = (id) => this.setState({ isUpdateModalOpen: { [id]: true } });
  closeBookUpdateModal = (id) => this.setState({ isUpdateModalOpen: { [id]: false }});

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
      deletingBook: { [id]: true },
      bookId: id
    });

  cancelDelete = id =>
    this.setState({
      deletingBook: { [id]: false },
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
          const {
            edit,
            createBook,
            deletingBook,
            isUpdateModalOpen
          } = this.state;

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
                <CreateBook
                  authorId={data.author.id}
                  toggleCreate={this.toggleCreate}
                />
              )}

              <Card.Group centered>
                {books.map(book => (
                  <Card key={book.id}>
                    <Card.Content>
                      <Card.Header>{book.title}</Card.Header>
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
                              onClick={() => this.confirm(book.id)}
                            />
                            <Confirm
                              open={deletingBook[book.id]}
                              onCancel={() => this.cancelDelete(book.id)}
                              onConfirm={() => this.deleteBook(deleteBook)}
                              size="mini"
                              content="Are you sure you want to delete this book?"
                            />
                          </div>
                        )}
                      </Mutation>
                      <Icon
                        floated="right"
                        circular
                        link
                        name="edit"
                        size="small"
                        color="blue"
                        onClick={() => this.showBookUpdateModal(book.id)}
                      />
                    </Card.Content>
                    <Card.Content extra>
                      <Card.Description>{book.genre}</Card.Description>
                    </Card.Content>
                    <UpdateBookModal
                      isUpdateModalOpen={isUpdateModalOpen[book.id]}
                      closeBookUpdateModal={() => this.closeBookUpdateModal(book.id)}
                    >
                      <BookUpdate
                        closeBookUpdateModal={() => this.closeBookUpdateModal(book.id)}
                        book={book}
                      />
                    </UpdateBookModal>
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

const UpdateBookModal = ({
  isUpdateModalOpen,
  closeBookUpdateModal,
  children
}) => (
  <Modal
    dimmer="blurring"
    open={isUpdateModalOpen}
    onClose={closeBookUpdateModal}
  >
    <Modal.Header>Update book</Modal.Header>
    <Modal.Content>
      <Modal.Description>{children}</Modal.Description>
    </Modal.Content>
  </Modal>
);
