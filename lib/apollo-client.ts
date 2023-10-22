import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://gateway-external.1build.com/',
  headers: {
    '1build-api-key': '1build_ext.P05A1ht4.RAFAsQ8WvQKh7eZDFKbfeATBbwLAIibq',
    'content-type': 'application/json',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
