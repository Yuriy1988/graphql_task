import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';

// insert your github auth token
const accessToken = '0fd0621e3098381ae8045892f9c2fb1712fb31fa';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: { authorization: `bearer ${accessToken}` },
});

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        user(login: "Yuriy1988") {
          repositories(first: 50) {
            nodes{
              name
              id
              description
            }
          }
        }
      }
  `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log('data', data);
      return <div>HI</div>
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ExchangeRates />
      </ApolloProvider>
    );
  }
}

export default App;
