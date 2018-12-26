import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import gql from 'graphql-tag';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>

      return (
        <div>
          <Error error={error} />
          <p>Done!</p>
        </div>
      )
    }}
  </Query>
);

export default Permissions;
