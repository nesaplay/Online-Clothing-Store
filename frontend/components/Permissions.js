import { Query, Mutation } from "react-apollo";
import PropTypes from 'prop-types';
import Error from "./ErrorMessage";
import gql from 'graphql-tag';
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS = gql`
  mutation UPDATE_PERMISSIONS($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      name
      permissions
      email
    }
  }
`

const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>

      return (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map((permission, i) => <th key={i}>{permission}</th>)}
                  <th>></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => <UserPermissions user={user} key={user.id} />)}
              </tbody>
            </Table>
          </div>
        </div>
      )
    }}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired
  }
  state = {
    permissions: this.props.user.permissions
  }
  handlePermissionChange = (e) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value)
      this.setState({ permissions: updatedPermissions });
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value)
      this.setState({ permissions: updatedPermissions });
    }
  }
  render() {
    const user = this.props.user;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS} variables={{
        permissions: this.state.permissions,
        userId: this.props.user.id
      }}>
        {(updatePermissions, { error, loading }) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map((permission, i) => (
                <td key={i}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      type="checkbox"
                      id={`${user.id}-permission-${permission}`}
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton onClick={updatePermissions} disabled={loading}>
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>

          )
        }}
      </Mutation>
    )
  }
}

export default Permissions;
