import React, { Component } from 'react'
import { Input, Comment, Container, Divider, Feed, Icon, Form, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PostComments from './postComments'
import SinglePost from './singlePost'
import AuthAdapter from '../../auth/authAdapter'

export default class PostShow extends Component {
  static contextTypes = {
    router: PropTypes
  }

  state = {
    text: '',
    post: {},
    comments: [],
    comment: {},
    mounted: false
  }

  componentDidMount() {
    const idUrl = this.context.router.history.location.pathname
    const id = idUrl.split("/")[idUrl.split('/').length - 1]

    AuthAdapter.fetchSinglePost(id)
    .then(post => {
      this.setState({ post })
      // debugger
    })

    AuthAdapter.fetchPostComments(id)
    .then(comments => {
      this.setState({ comments, mounted: true })
    })
  }

  handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Object.assign({}, { text: this.state.text, user_id: this.props.currentUser.id }, { post_id: this.props.post.id }))
    }).then(res => res.json())
    .then(comments => {
      this.setState({ comments })
    })
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
  }

  render() {
    // const userName = `${this.props.post.user.first_name} ${this.props.post.user.last_name}`
    // debugger
    return (
      <Container textAlign='left'>
        {this.state.mounted ? <SinglePost post={this.state.post} /> : null}

        <Form onSubmit={this.handleSubmit}>
          <Input
            action={{ color: 'grey', labelPosition: 'right', icon: 'comments', content: 'Comment', type: 'submit' }}
            onChange={this.handleChange}
          />
        </Form>

        {this.state.mounted ? <PostComments comments={this.state.comments} /> : null}
      </Container>
    )
  }
}
