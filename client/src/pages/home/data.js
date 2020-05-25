import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const GET_VISIBILITY_FILTER = gql`
  query {
    visibilityFilter @client
  }
`;
//   const { data, client } = useQuery(GET_VISIBILITY_FILTER);

export default function useData(props = {}) {
  const { data: users } = useQuery(USERS, props);
  const { data: visability, client } = useQuery(GET_VISIBILITY_FILTER, props);

  return { users, visability, client };
}
