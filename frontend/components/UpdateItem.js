import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`

class UpdateItem extends Component {
  state = {}
  onChangeHandler = ({ target }) => {
    const { name, type, value } = target
    const val = type === 'number' ? parseFloat(value) : value

    this.setState({ [name]: val })
  }
  onSubmitHandler = async (e, updateItemMutation) => {
    e.preventDefault()

    const res = await updateItemMutation()
    console.log({ res })
  }
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <div>loading...</div>
          if (!data.item) return <div>No Item Found for ID: {this.props.id}</div>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{id: this.props.id, ...this.state}}>
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={e => this.onSubmitHandler(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input type="text" id="title" name="title" placeholder="Title" required defaultValue={data.item.title} onChange={this.onChangeHandler} />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input type="number" id="price" name="price" placeholder="Price" required defaultValue={data.item.price} onChange={this.onChangeHandler} />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.onChangeHandler}
                      />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
