import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getToken } from '../utils/storage';
import config from 'config'

const httpLink = createHttpLink({
  uri: `${config.API_ENDPOINT}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      Authorization: token,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
