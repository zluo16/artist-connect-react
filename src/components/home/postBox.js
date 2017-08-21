import React, { Component } from 'react'
import { Button, Comment, Form, Card, Grid } from 'semantic-ui-react'
import AuthAdapter from '../../auth/authAdapter'

const baseUrl = AuthAdapter.baseUrl()

export default class PostBox extends Component {

  state = {
    user: {}
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Comment.Group>
                  <Comment textAlign='left'>
                    <Comment.Avatar as='a' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLYSz-hjdBj-5gYzX3KAKjWzL_yDqI8d5DNhK3BxKDLDhROmZosz4Nt0' />
                    <Comment.Content floated>
                      <Comment.Text>Write Something</Comment.Text>
                      <Comment.Actions>What's on your mind?</Comment.Actions>
                      <Form onSubmit={this.props.handleSubmit}>
                        <Form.TextArea onChange={this.props.handleChange} />
                        <Button type='submit' content='Post' labelPosition='left' icon='edit' primary />
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
}
