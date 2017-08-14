import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { Route, Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  activeItem = (checkURL) => this.context.router.history.location.pathname === checkURL

  handleLogout() {
    localStorage.clear()
    this.context.router.history.push('/login')
  }

  render() {
    return (
      <Menu pointing vertical>
        <Menu.Menu>
          <Menu.Item
            as={Link} to='/home' name='home' active={this.activeItem('/home')}
            onClick={this.handleItemClick}>
            Home
          </Menu.Item>
          <Menu.Item
            as={Link} to='/users' name='users' active={this.activeItem('/users')}
            onClick={this.handleItemClick}>
            Search For Connections
          </Menu.Item>
          <Menu.Item
            as={Link} to='/jobs' name='job_postings' active={this.activeItem('/job_postings')} onClick={this.handleItemClick}>
            Search Jobs
          </Menu.Item>
          <Menu.Item></Menu.Item>
        </Menu.Menu>

        <Menu.Menu>
          <Menu.Item
            as={Link} to='/login' name='logout' onClick={this.handleLogout}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
