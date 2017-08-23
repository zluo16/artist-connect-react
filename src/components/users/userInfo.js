import React, { Component } from 'react'
import { Menu, Container, Header, Loader, Divider } from 'semantic-ui-react'

export default class UserInfo extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary vertical>
          <Menu.Item name='About' />
          <Menu.Item name='Education' />
          <Menu.Item name='Location' />
        </Menu>

        {!!this.props.user.about ? <Container text textAlign='justified'>
          <Header as='h2'>About</Header>
          <p>{this.props.user.about}</p>
          <Divider />
          <p><strong>sex:</strong> {this.props.user.gender}</p>
          <p><strong>Date of Birth:</strong> {this.props.user.formatted_dob}</p>
          <Divider />
          {this.props.user.educations.length > 0 ?
            <div>
              <Header as='h2'>Education</Header>
            {this.props.user.educations.map(ed => {
              return <p><strong>{ed.school_name}</strong></p>
            })}
            <Divider />
          </div> : null}
        </Container> : <Loader active inline='centered' />}
      </div>
    )
  }
}
