import React from 'react'
import { Feed, Icon, Divider, Grid, Dimmer, Loader, Image } from 'semantic-ui-react'
import { Link } from  'react-router-dom'

const FeedElement = (props) => {
  console.log(props)
  const name = `${props.user.first_name} ${props.user.last_name}`
  const show = `${props.postShow}/${props.post.id}`
  const userPath = `/users/${props.user.id}`

  return (
    <Feed.Event>
      <Feed.Label>
        {!!props.user.image_link ?
          <Image src={props.user.image_link} size='mini' shape='circular' /> :
          <Image src='https://tracker.moodle.org/secure/attachment/30912/f3.png' size='mini' shape='circular' />
        }
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <a href={userPath}>{name}</a> posted
        </Feed.Summary>
        <Feed.Extra text as={Link} to={show}>
          {props.post.text.length > 100 ? props.post.text.slice(0, 99) + '...' : props.post.text}
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
