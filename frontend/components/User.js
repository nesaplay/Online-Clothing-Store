import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER__QUERY = gql`
  query CURRENT_USER__QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER__QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.PropTypes = {
  children: PropTypes.func.isRequired,
};

export { CURRENT_USER__QUERY };
export default User;
