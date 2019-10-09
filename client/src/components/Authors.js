import React, { Component } from "react";
import { Query } from "react-apollo";
import { Loader, Segment, Dimmer, Card, Container, Header } from "semantic-ui-react";
import AuthorForm from './AuthorForm';
import query from '../queries/getAuthors';
import AuthorCard from './AuthorCard';

class Authors extends Component {
  render() {
    return (
      <Query
        query={query}
      >
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
            <Container>
              <Header>Create Author</Header>
              <AuthorForm/>
              <Card.Group centered>
                {data.authors.map(author => (
                  <AuthorCard key={author.id} author={author}/>
                ))}
              </Card.Group>
            </Container>
          );
        }}
      </Query>
    );
  }
}
export default Authors;
