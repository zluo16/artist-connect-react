import React from 'react'
import UserCard from '../users/userCard'
import { Card } from 'semantic-ui-react'

const FriendsList = (props) => {
  return (
    <Card.Group itemsPerRow={4}>
      {props.friends !== null ? props.friends.map(friend => {
        return <UserCard
          user={friend}
        />
      }) : null}
    </Card.Group>
  )
}

export default FriendsList
