import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserCard = (props) => {
  const userUrl = `/users/${props.user.id}`
  const header = `${props.user.first_name} ${props.user.last_name}`

  return (
    <Card
      as={Link}
      to={userUrl}
      header={header}
      meta='Potential Friend'
      description='Good friend, great friend, fantastic! Loves long walks on the beach. Loves long walks on the beach, in the forest, wherever! And is also a Dog.'
    />
  )
}

export default UserCard
