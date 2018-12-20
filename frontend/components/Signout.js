import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER__QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => {
  return (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER__QUERY }]}>
      {(signout, { data }) => (
        <button onClick={signout}>Sign Out</button>
      )}
    </Mutation>
  )
}

export default Signout;
