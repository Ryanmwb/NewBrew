import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

const link = HttpLink({
  uri: "https://brewbuddy-heroku-db-95f87bb644.herokuapp.com",
  credentials: "same-origin"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
// const client = new ApolloClient({
//   uri: "https://brewbuddy-heroku-db-95f87bb644.herokuapp.com"
// });

export default client;
