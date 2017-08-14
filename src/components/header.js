import React from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'

const UserHeader = (props) => {
  const fullName = `${props.user.first_name} ${props.user.last_name}`
  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>
          {fullName}
        </Header.Content>
      </Header>
      <Button
        color='blue'
        content='Connect'
        label={{ basic: true, color: 'blue', pointing: 'left', content: '231' }}
        onClick={() => props.handleConnect(props.user.id)}
      />
    </div>
  )
}

export default UserHeader
