import React, { Component } from "react";
import { Card, Modal, Icon, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";

import deleteAuthor from "../mutations/deleteAuthor";
import query from "../queries/getAuthors";

class AuthorCard extends Component {
  state = { open: false };

  show = () => () => this.setState({ open: true });
  cancel = () => this.setState({ open: false });

  deleteAuthor = deleteAuthor => {
    deleteAuthor({
      variables: { id: this.props.author.id },
      refetchQueries: [{ query }]
    });
  };

  render() {
    const { name, id } = this.props.author;
    const { open } = this.state;
    return (
      <Card>
        <Card.Content>
          <Card.Header as={Link} to={`/authors/${id}`}>
            {name}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Mutation mutation={deleteAuthor}>
            {(deleteAuthor, { data }) => (
              <div>
                <Popup
                  content="Delete this author"
                  trigger={
                    <Icon
                      circular
                      link
                      name="delete"
                      size="small"
                      color="red"
                      onClick={this.show()}
                    />
                  }
                  position="right center"
                />

                <AuthorModal
                  open={open}
                  onDelete={() => this.deleteAuthor(deleteAuthor)}
                  cancel={this.cancel}
                />
              </div>
            )}
          </Mutation>
        </Card.Content>
      </Card>
    );
  }
}

export default AuthorCard;

const AuthorModal = ({ open, cancel, onDelete }) => {
  return (
    <Modal size="mini" open={open} onClose={cancel}>
      <Modal.Header>Delete Author</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the author?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={cancel}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={onDelete}
        />
      </Modal.Actions>
    </Modal>
  );
};
