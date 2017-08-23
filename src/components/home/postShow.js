import React from 'react'
import { Input, Comment, Container, Divider, Feed, Icon, Form, Header, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PostComments from './postComments'
import SinglePost from './singlePost'
import AuthAdapter from '../../auth/authAdapter'

const PostShow = ({ post, currentUser, selectedPost, handleChange, handleSubmit, handleLike }) => {
  // const userName = `${this.props.post.user.first_name} ${this.props.post.user.last_name}`
  // debugger
  return (
    <Container textAlign='left'>
      { !!selectedPost.user ? null : <Loader active inline='centered' /> }
      <SinglePost post={selectedPost} handleLike={handleLike} />

      <Form onSubmit={handleSubmit}>
        <Input
          action={{ color: 'grey', labelPosition: 'right', icon: 'comments', content: 'Comment', type: 'submit' }}
          onChange={handleChange}
        />
      </Form>

      <Header as='h3' dividing>Comments</Header>
      <PostComments comments={selectedPost.comments} />
    </Container>
  )
}

export default PostShow
