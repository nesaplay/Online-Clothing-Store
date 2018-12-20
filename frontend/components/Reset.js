import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER__QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const initState = {
  password: "",
  confirmPassword: ""
};

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }
  state = initState;
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          ...this.state,
        }}
        refetchQueries={[{ query: CURRENT_USER__QUERY }]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <Form method="post" onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState(initState);
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState} />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input type="password" name="confirmPassword" placeholder="confirm your password" value={this.state.confirmPassword} onChange={this.saveToState} />
                </label>
                <button type="submit">Reset Your Password!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;
