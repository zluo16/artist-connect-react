import React, { Component } from 'react'
import {  } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import UserHeader from './header'

export default class UserProfile extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    user: {},
    checkFriends: false
  }

  componentWillMount() {
    const idUrl = this.context.router.history.location.pathname
    const id = idUrl.split("/")[idUrl.split("/").length - 1]
    const userUrl = `http://localhost:3000/api/v1/users/${id}`

    fetch(userUrl, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(user => {
      this.setState({ user, checkFriends: this.checkFriends(user) })
    })
  }

  checkFriends(user) {
    return !!user.friends.find(friend => friend.id == this.props.currentUser.id)
  }

  createConnection = (connectionId) => {
    fetch('http://localhost:3000/api/v1/user_connections', {
      method: 'POST',
      body: JSON.stringify({ connectionId }),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    this.setState({
      user: {
        ...this.state.user,
        friend_num: this.state.user.friend_num += 1
      }
    })
    this.setState({ checkFriends: true })
  }

  render() {
    return (
      <div>
        <UserHeader
          user={this.state.user}
          handleConnect={this.createConnection}
          checkFriends={this.state.checkFriends}
        />
      </div>
    )
  }
}
