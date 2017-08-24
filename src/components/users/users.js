import React, { Component } from 'react'
import { Input, Grid, Form, Dimmer, Loader, Transition, Button } from 'semantic-ui-react'
import UsersList from './usersList'
import AuthAdapter from '../../auth/authAdapter'

export default class Users extends Component {

  state = {
    users: [],
    searchTerms: '',
    mounted: false,
    visible: false
  }

  componentDidMount() {
    AuthAdapter.fetchUsers()
    .then(res => {
      let users = res.map(u => {
        return Object.assign({}, {
          friendBool: this.friendOrNot(u)
        }, u)
      }).sort((a, b) => {
        if (a.first_name < b.first_name) return -1
        if (a.first_name > b.first_name) return 1
        return 0
      })
      this.setState({ users, mounted: true }, this.toggleVisibility)
    })
  }

  friendOrNot(u) {
    if (this.props.currentUser.friends) {
      return !!this.props.currentUser.friends.find(f => f.id == u.id)
    }
  }

  handleChange = (event) => {
    this.setState({ searchTerms: event.target.value })
  }

  handleSearchSubmit = (event) => {
    event.preventDefault()
    let filteredUsers = this.state.users.filter(user => {
      let searchTerms = this.state.searchTerms.toLowerCase()
      let firstTruth = user.first_name.toLowerCase() === searchTerms
      let secondTruth = user.last_name.toLowerCase() === searchTerms
      // let thirdTruth = user.email.toLowerCase() === searchTerms

      return firstTruth || secondTruth
    })
    this.setState({ users: filteredUsers, searchTerms: '' })
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state

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

        <Grid className='hold-users'>
          <Grid.Column>
            {this.state.mounted ?
              <UsersList users={this.state.users} visible={visible} /> :
              <Dimmer active inverted><Loader>Loading</Loader></Dimmer>}
            </Grid.Column>
          </Grid>
        </div>
      )
  }
}
