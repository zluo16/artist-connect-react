import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './nav'
import Users from './users'

export default class HomeContainer extends Component {

  state = {}

  render() {
    return (
      <div>
        <Nav />
      </div>
    )
  }
}
