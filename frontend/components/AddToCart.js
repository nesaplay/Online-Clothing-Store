import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER__QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER__QUERY }]}
      >
        {(addToCart, { loading }) => {
          return (
            <button disabled={loading} onClick={addToCart}>Add{loading ? 'ing' : 'ed'} To Cart</button>
          )
        }}
      </Mutation>
    )
  }
}

export default AddToCart;
