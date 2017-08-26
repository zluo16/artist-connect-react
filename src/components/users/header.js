import React from 'react'
import { Header, Icon, Button, Image, Transition } from 'semantic-ui-react'

const UserHeader = (props) => {
  const fullName = `${props.user.first_name} ${props.user.last_name}`
  const friendNum = `${props.user.friend_num}`
  const imgSrc = `${props.user.image_link}`
  return (
    <Transition visible={props.mounted} animation='fade' duration={1000}>
      <div>
        {!!props.user && !!props.user.image_link ?
          <Image centered bordered src={imgSrc} size='medium' shape='circular' /> :
          <Icon centered name='users' size='massive' circular />}
        <Header as='h2' icon textAlign='center'>
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
    </Transition>
  )
}

export default UserHeader
