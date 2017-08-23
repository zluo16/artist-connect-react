import React from 'react'
import { Comment, Loader } from 'semantic-ui-react'

const PostComments = ({ comments }) => {
  return(
    <Comment.Group className='hold-comments'>
      {comments.length > 0 ?
        comments.map(comment => {
          return (
            <Comment>
              <Comment.Content>
                { comment.user ? <Comment.Author as='a'>{`${comment.user.first_name} ${comment.user.last_name}`}</Comment.Author> : null }

                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        }) : <Loader active inline='centered' />
      }
    </Comment.Group>
  )
}

export default PostComments
