import React from 'react'
import UserCard from './userCard'
import { Card } from 'semantic-ui-react'

const UsersList = (props) => {
  return (
    <Card.Group itemsPerRow={4}>
      {props.users !== null ? props.users.map(user => {
        return <UserCard
          user={user}
        />
      }) : null}
    </Card.Group>
  )
}

export default UsersList
