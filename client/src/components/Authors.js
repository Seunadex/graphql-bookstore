import React, { Component } from "react";
import { Query } from "react-apollo";
import {
  Loader,
  Segment,
  Dimmer,
  Card,
  Container,
  Header,
  Grid
} from "semantic-ui-react";
import AuthorForm from "./AuthorForm";
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
            <Container>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column width={3}>
                    <Header>Create Author</Header>
                    <AuthorForm />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Card.Group centered>
                      {data.authors.map(author => (
                        <AuthorCard key={author.id} author={author} />
                      ))}
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          );
        }}
      </Query>
    );
  }
}
export default Authors;
