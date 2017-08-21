import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const SinglePost = ({ post }) => {
  // debugger
  return (
    <Feed>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{`${post.user.first_name} ${post.user.last_name}`}</Feed.User>
          </Feed.Summary>
          <Feed.Extra text>
            {post.text}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />
              {!!post.likes ? post.likes + ' Likes' : 'Like'}
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default SinglePost
