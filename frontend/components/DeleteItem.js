import React, { Component } from 'react'

class DeleteItem extends Component {
  render() {
    return <button>{this.props.children}</button>
  }
}

export default DeleteItem
