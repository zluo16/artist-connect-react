import React from 'react'
import { Comment, Header } from 'semantic-ui-react'

const PostComments = ({ comments }) => {
  return(
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      {comments.length > 0 ?
        comments.map(comment => {
          const commentUser = `${comment.user.first_name} ${comment.user.last_name}`

          return (
            <Comment>
              <Comment.Content>
                <Comment.Author as='a'>{commentUser}</Comment.Author>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        }) : null
      }
    </Comment.Group>
  )
}

export default PostComments
