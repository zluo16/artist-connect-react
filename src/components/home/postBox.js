import React from 'react'
import { Button, Comment, Form, Card, Grid } from 'semantic-ui-react'
import AuthAdapter from '../../auth/authAdapter'

const baseUrl = AuthAdapter.baseUrl()

const PostBox = ({ user, addPost, handleSubmit, handleChange }) => {
  const imgUrl = !!user && !!user.image_link ? user.image_link : 'https://tracker.moodle.org/secure/attachment/30912/f3.png'

  return (
    <div>
      <Grid>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          <Card fluid raised>
            <Card.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Content>
                    <Form onSubmit={handleSubmit}>
                      <Form.TextArea onChange={handleChange} placeholder="What's on your mind?" style={{ width: 680 }} />
                      <Button type='submit' content='Post' labelPosition='left' icon='edit' primary />
                      <Comment.Avatar as='a' src={imgUrl} />
                    </Form>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    </div>
  )
}

export default PostBox
