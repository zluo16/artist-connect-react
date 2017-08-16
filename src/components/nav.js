import React, { Component } from 'react'
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment,
  Menu,
  Icon,
  Sidebar } from 'semantic-ui-react'
import { Route, Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    menuVisible: false
  }

  activeItem = (checkURL) => this.context.router.history.location.pathname === checkURL

  handleLogout() {
    localStorage.clear()
    this.context.router.history.push('/login')
  }

  render() {
    return <div>
      <Menu secondary attached="top">
        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
          <Icon name="sidebar" />Menu
        </Menu.Item>
      </Menu>
    <Sidebar.Pushable as={Segment} attached="bottom" >
      <Sidebar as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inline inverted>
        <Menu.Item><Icon name="home" />Home</Menu.Item>
        <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
        <Menu.Item><Icon name="smile" />Friends</Menu.Item>
        <Menu.Item><Icon name="calendar" />History</Menu.Item>
      </Sidebar>
       <Sidebar.Pusher>
            <Segment basic>
              <Header as="h3">Application Content</Header>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </Segment>
       </Sidebar.Pusher>
    </Sidebar.Pushable>
    </div>
  }
}


// render() {
//   return (
//     <Menu pointing vertical compact size='massive'>
//       <Menu.Menu>
//         <Menu.Item
//           as={Link} to='/home' name='home' active={this.activeItem('/home')}
//           onClick={this.handleItemClick}>
//           Home
//         </Menu.Item>
//         <Menu.Item
//           as={Link} to='/users' name='users' active={this.activeItem('/users')}
//           onClick={this.handleItemClick}>
//           Search For Connections
//         </Menu.Item>
//         <Menu.Item
//           as={Link} to='/jobs' name='job_postings' active={this.activeItem('/jobs')} onClick={this.handleItemClick}>
//           Search Jobs
//         </Menu.Item>
//         <Menu.Item></Menu.Item>
//       </Menu.Menu>
//       <Menu.Menu>
//         <Menu.Item
//           as={Link} to='/login' name='logout' onClick={this.handleLogout}>
//           Logout
//         </Menu.Item>
//       </Menu.Menu>
//     </Menu>
//   )
// }
