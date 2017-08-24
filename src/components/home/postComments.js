import React from 'react'
import { Comment, Loader } from 'semantic-ui-react'

const avatar = 'https://www.mautic.org/media/images/default_avatar.png'

const PostComments = ({ comments }) => {
  return(
    <Comment.Group className='hold-comments'>
      {comments.length > 0 ?
        comments.map(comment => {
          const imgSrc = !!comment.user && !!comment.user.image_link ?
          comment.user.image_link : avatar

          return (
            <Comment>
              <Comment.Content>
                {!!comment.user ? <Comment.Avatar src={imgSrc}></Comment.Avatar> : null}
                {!!comment.user ?
                  <Comment.Author as='a' className='left-margin'>{`${comment.user.first_name} ${comment.user.last_name}`}</Comment.Author> : null}
                <Comment.Text className='comment-text-left'>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        }) : <Loader active inline='centered' />
      }
    </Comment.Group>
  )
}

export default PostComments
