import React, { Component } from 'react'
import { Tab, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Users from '../users'
import PostBox from './postBox'
import AuthAdapter from '../../auth/authAdapter'
import { Route } from 'react-router-dom'
import JobsFeed from './jobsFeed'
import FeedList from './feed'
import PostShow from './postShow'

const baseUrl = AuthAdapter.baseUrl()

export default class HomeContainer extends Component {
  static contextTypes = {
    router: PropTypes
  }

  state = {
    posts: [],
    post: {
      text: '',
      likes: null,
      link: null,
      user_id: 0
    }
  }

  componentWillMount() {
    AuthAdapter.currentUser()
    .then(currentUser => {
      AuthAdapter.fetchPosts()
      .then(res => {
        const posts = res.filter(post => {
          let firstTruth = post.user.id == currentUser.id
          let secondTruth = currentUser.friends.map(f => f.id)
          .includes(post.user.id)
          return firstTruth || secondTruth
        }).reverse()
        this.setState({ posts })
        this.setState({
          post: {
            ...this.state.post,
            user_id: currentUser.id
          }
        })
      })
    })
  }

  addPost = (post) => {
    this.setState({ posts: this.state.posts.unshift(post) })
  }

  handleSubmitPost = () => {
    fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state.post)
    }).then(res => res.json())
    .then(res => {
      const posts = res.filter(post => {
        let firstTruth = post.user.id == this.props.currentUser.id
        let secondTruth = this.props.friends.map(f => f.id)
            .includes(post.user.id)
        return firstTruth || secondTruth
      }).reverse()
      this.setState({ posts })
      this.setState({
        post: {
          ...this.state.post,
          user_id: this.props.currentUser.id
        }
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      post: {
        ...this.state.post,
        text: event.target.value
      }
    })
  }

  displayPost() {
    const idUrl = this.context.router.history.location.pathname
    const post = this.props.posts.find(post => {
      return post.id == idUrl.split("/")[idUrl.split('/').length - 1]
    })
    return post
  }

  render() {

    const panes = [
      { menuItem: 'Posts', render: () => <Tab.Pane><FeedList currentUser={this.props.currentUser} posts={this.state.posts} post={this.displayPost()} /></Tab.Pane> },
      { menuItem: 'Messages', render: () => <Tab.Pane></Tab.Pane> }
    ]

    return (
      <div>
        <PostBox
          user={this.state.currentUser}
          addPost={this.addPost}
          handleSubmit={this.handleSubmitPost}
          handleChange={this.handleChange}
        />
        <Grid>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} classname='hold-panes'/>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </div>
    )
  }
}
