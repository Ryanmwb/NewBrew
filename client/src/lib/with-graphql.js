import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";

const link = createHttpLink({
  uri: `${process.env.REACT_APP_PRISMA_ENDPOINT}`,
  credentials: "same-origin"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default client;
