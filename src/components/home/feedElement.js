import React from 'react'
import { Feed, Icon, Divider, Grid } from 'semantic-ui-react'
import { Link } from  'react-router-dom'

const FeedElement = (props) => {
  const name = `${props.user.first_name} ${props.user.last_name}`
  const show = `/home/posts/${props.post.id}`

  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a>{name}</a> posted
        </Feed.Summary>
        <Feed.Extra text as={Link} to={show}>
          {props.post.text}
        </Feed.Extra>
        <br/>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            {!!props.post.likes ? props.post.likes + ' Likes' : 'Like'}
          </Feed.Like>
        </Feed.Meta>
        <br/>
      </Feed.Content>
    </Feed.Event>
  )
}

export default FeedElement
