import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import UsersList from './usersList'
import AuthAdapter from '../../auth/authAdapter'

export default class UserFriends extends Component {

  state = { friends: [] }

  componentDidMount() {
    AuthAdapter.fetchUser(this.props.user_id)
    .then(user => this.setState({ friends: user.friends }))
  }

  render() {
    return (
      <Grid className='hold-users'>
        <Grid.Column>
        <UsersList users={this.state.friends} />
        </Grid.Column>
      </Grid>
    )
  }
}
