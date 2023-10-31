import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://gateway-external.1build.com/',
  headers: {
    //using test api key from docs?
    '1build-api-key': '1build_ext.jD0bjzZS.bm7hWEnDb2OffSrTprL385eD9008bLBi',
    'content-type': 'application/json',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
