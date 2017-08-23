import React from 'react'
import { Card, Button, Transition, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const extra = (
  <a>
    <Icon name='user' />

  </a>
)

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const UserCard = ({ user, visible }) => {
  const userUrl = `/users/${user.id}`
  const header = `${user.first_name} ${user.last_name}`

  return (
    <Transition visible={visible} animation='scale' duration={600}>
      <Card className='text-align-left' as={Link} to={userUrl} raised>
        {!!user.image_link ?
          <Image src={user.image_link} /> :
          <Image src='https://tracker.moodle.org/secure/attachment/30912/f3.png' />
        }
        <Card.Content>
          <Card.Header>{header}</Card.Header>
          <Card.Meta>{user.friendBool ? 'Friend' : 'Potential Friend'}</Card.Meta>
          {!!user.about ?
            <Card.Description className='text-align-jusified'>{user.about.length > 100 ? user.about.slice(0, 99) : user.about}</Card.Description> :
            <Card.Description className='text-align-jusified'>{loremIpsum.slice(0, 99)}</Card.Description>
          }
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {user.friend_num} Friends
          </a>
        </Card.Content>
      </Card>
    </Transition>
  )
}

export default UserCard

{/* <Card
  raised
  as={Link}
  to={userUrl}
  header={header}
  meta='Potential Friend'
  description='Good friend, great friend, fantastic! Loves long walks on the beach. Loves long walks on the beach, in the forest, wherever! And is also a Dog.'
/> */}
