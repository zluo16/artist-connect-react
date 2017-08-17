import React, { Component } from 'react'
import { Input, Grid, Form } from 'semantic-ui-react'
import FriendsList from './friendsList'
import AuthAdapter from './../../auth/authAdapter'

export default class FriendsContainer extends Component {

  state = {
    currentUser: {},
    friends: [],
    searchTerms: ''
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/me', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => this.setState({ currentUser: res, friends: res.friends }))
  }

  handleSearchSubmit = (event) => {
    event.preventDefault()
    let filteredUsers = this.state.friends.filter(friend => {
      let searchTerms = this.state.searchTerms.toLowerCase()
      let firstTruth = friend.first_name.toLowerCase() === searchTerms
      let secondTruth = friend.last_name.toLowerCase() === searchTerms
      // let thirdTruth = friend.email.toLowerCase() === searchTerms

      return firstTruth || secondTruth
    })
    this.setState({ friends: filteredUsers, searchTerms: '' })
  }

  handleChange = (event) => {
    this.setState({ searchTerms: event.target.value })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSearchSubmit}>
          <Form.Input onChange={this.handleChange}
            icon='search'
            placeholder='Search...' onSubmit={this.handleSearchSubmit}
          />
          <Form.Button content='Go' />
        </Form>
        <br></br>

        <Grid>
          <Grid.Column>
            <FriendsList friends={this.state.friends} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
