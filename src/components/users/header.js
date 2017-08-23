import React from 'react'
import { Header, Icon, Button, Image } from 'semantic-ui-react'

const UserHeader = (props) => {
  const fullName = `${props.user.first_name} ${props.user.last_name}`
  const friendNum = `${props.user.friend_num}`
  const imgSrc = `${props.user.image_link}`
  return (
    <div>
      <Image centered bordered src={imgSrc} size='small' shape='circular' />
      <Header as='h2' icon textAlign='center'>
        {/* <Icon name='users' circular /> */}
        <Header.Content>
          {fullName}
        </Header.Content>
      </Header>
      {props.checkFriends ?
        <Button
          color='grey'
          content='Connected'
          label={{ basic: true, color: 'grey', pointing: 'left', content: friendNum }}
        />
        :
        <Button
        color='grey'
        content='Add Friend'
        label={{ basic: true, color: 'grey', pointing: 'left', content: friendNum }}
        onClick={() => props.handleConnect(props.user.id)}
      />}
    </div>
  )
}

export default UserHeader
