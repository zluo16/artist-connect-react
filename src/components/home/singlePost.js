import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const SinglePost = ({ post, handleLike }) => {
  // debugger
  return (
    <Feed>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            { !!post.user ? <Feed.User>{`${post.user.first_name} ${post.user.last_name}`}</Feed.User> : null }
          </Feed.Summary>
          <Feed.Extra text>
            {post.text}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like id={post.id} onClick={handleLike}>
              <Icon name='like' id={post.id}/>
              {!!post.likes ? post.likes + ' Likes' : 'Like'}
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default SinglePost
