import React from "react";
import SickButton from './styles/SickButton';
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/SickButton";
import { Query, Mutation } from "react-apollo";
import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {(toggleCart) => {
        return (
          <Query query={LOCAL_STATE_QUERY}>
            {({ data, loading, error }) => {
              return (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                    <Supreme>Your Cart</Supreme>
                    <p>You Have __ Items in your cart.</p>
                  </header>
                  <footer>
                    <p>$10.10</p>
                    <SickButton>Checkout</SickButton>
                  </footer>
                </CartStyles>

              )
            }}
          </Query>

        )
      }}
    </Mutation>
  )
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
