import React from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'

const PostBox = (props) => (
  <Comment.Group>
    <Comment>
      <Comment.Avatar as='a' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLYSz-hjdBj-5gYzX3KAKjWzL_yDqI8d5DNhK3BxKDLDhROmZosz4Nt0' />
      <Comment.Content floated>
        <Comment.Text>Write Something</Comment.Text>
        <Comment.Actions>What's on your mind?</Comment.Actions>
        <Form>
          <Form.TextArea />
          <Button content='Post' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Content>
    </Comment>
  </Comment.Group>
)

export default PostBox
