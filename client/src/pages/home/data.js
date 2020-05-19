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

export default function useData(props = {}) {
  const { data: users } = useQuery(USERS, props);

  return { users };
}
