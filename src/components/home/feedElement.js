import React from 'react'
import { Feed, Icon, Divider, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from  'react-router-dom'

const FeedElement = (props) => {
  console.log(props)
  const name = `${props.user.first_name} ${props.user.last_name}`
  const show = `${props.postShow}/${props.post.id}`
  const userPath = `/users/${props.user.id}`

  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a href={userPath}>{name}</a> posted
        </Feed.Summary>
        <Feed.Extra text as={Link} to={show}>
          {props.post.text}
        </Feed.Extra>
        <br/>
        <Feed.Meta>
          <Feed.Like id={props.post.id} onClick={props.handleLike}>
            <Icon id={props.post.id} name='like' />
            {!!props.post.likes ? props.post.likes + ' Likes' : 'Like'}
          </Feed.Like>
        </Feed.Meta>
        <br/>
      </Feed.Content>
    </Feed.Event>
  )
}

export default FeedElement
