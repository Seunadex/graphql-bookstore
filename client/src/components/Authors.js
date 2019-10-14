import React, { Component } from "react";
import { Query } from "react-apollo";
import {
  Loader,
  Segment,
  Dimmer,
  Card,
  Container,
  Header
} from "semantic-ui-react";
import AddAuthor from "./AddAuthor";
import query from "../queries/getAuthors";
import AuthorCard from "./AuthorCard";

class Authors extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            );
          if (error) return <p>Error</p>;
          return (
            <Container className="authors">
              <div className="authors-container">
                <div className="container-form">
                  <Header>Create Author</Header>
                  <AddAuthor />
                </div>
                <div className="container-list">
                  <Card.Group>
                    {data.authors.map(author => (
                      <AuthorCard key={author.id} author={author} />
                    ))}
                  </Card.Group>
                </div>
              </div>
            </Container>
          );
        }}
      </Query>
    );
  }
}
export default Authors;
