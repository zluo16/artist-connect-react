import React, { Component } from 'react'
import { Tab, Grid, Transition } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import UserHeader from './header'
import UserInfo from './userInfo'
import UserFriends from './userFriends'
import FeedList from '../home/feed'
import AuthAdapter from '../../auth/authAdapter'
import { Route } from 'react-router-dom'

const baseUrl = AuthAdapter.baseUrl()

export default class UserProfile extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    user: {},
    friends: [],
    checkFriends: true,
    posts: [],
    selectedPost: {
      comments: {}
    },
    commentText: '',
    mounted: false
  }

  componentDidMount() {
    const idUrl = this.context.router.history.location.pathname
    const controller = idUrl.split("/")[idUrl.split("/").length - 2]

    const id = controller == 'users' ? idUrl.split("/")[idUrl.split("/").length - 1] :
    idUrl.split("/")[idUrl.split("/").length - 3]

    AuthAdapter.fetchUser(id)
    .then(user => {
      this.setState({ user, friends: user.friends, checkFriends: this.checkFriends(user) })
      AuthAdapter.fetchPostsFromUser(id)
      .then(posts => {
        const sortedPosts = posts.sort((p1, p2) => p2.id - p1.id)
        console.log('api call posts', sortedPosts);
        this.setState({
          posts: sortedPosts
        }, this.setSelectedPost)
      })
    })
  }

  setSelectedPost() {
    const idUrl = this.context.router.history.location.pathname
    const id = idUrl.split("/")[idUrl.split("/").length - 1]

    this.setState({ mounted: !this.state.mounted })

    if (idUrl.split("/")[idUrl.split("/").length - 2] === 'posts') {
      AuthAdapter.fetchSinglePost(id)
      .then(post => {
        const newpost = Object.assign({}, this.state.selectedPost, post)
        this.setState({ selectedPost: newpost })
        AuthAdapter.fetchPostComments(id)
        .then(comments => {
          // debugger
          const postWithComments = Object.assign({}, this.state.selectedPost, {comments: comments})
          this.setState({ selectedPost: postWithComments })
        })
        // debugger
      })
    }
  }

  checkFriends(user) {
    return !!user.friends.find(friend => friend.id == this.props.currentUser.id)
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
      }).sort((p1, p2) => p2.id - p1.id)
      this.setState({ posts })
      this.setState({
        post: {
          ...this.state.post,
          user_id: this.props.currentUser.id
        }
      })
    })
  }

  handleSubmitComment = () => {
    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Object.assign({}, { text: this.state.commentText, user_id: this.props.currentUser.id }, { post_id: this.state.selectedPost.id }))
    }).then(res => res.json())
    .then(comments => {
      this.setState({ comments })
    })
  }

  handleLike = (event) => {
    let post = this.state.posts.find(post => post.id == event.target.id)

    let i = this.state.posts.indexOf(post)
    let posts = this.state.posts

    if (post.likes) {
      post['likes'] = post.likes += 1
    } else {
      post['likes'] = 1
    }

    fetch(`http://localhost:3000/api/v1/posts/${event.target.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ likes: post.likes })
    })
    posts.splice(i, 1, post)
    if (this.state.selectedPost.id === post.id) {
      this.setState({ posts, selectedPost: post })
    } else {
      this.setState({ posts: posts })
    }
  }

  handleCommentChange = (event) => {
    this.setState({ commentText: event.target.value })
  }

  createConnection = (connectionId) => {
    fetch('http://localhost:3000/api/v1/user_connections', {
      method: 'POST',
      body: JSON.stringify({ connectionId }),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    this.setState({
      user: {
        ...this.state.user,
        friend_num: this.state.user.friend_num += 1
      }
    })
    this.setState({ checkFriends: true })
  }

  displayPost() {
    const idUrl = this.context.router.history.location.pathname
    if (this.state.posts.length > 0) {
      const post = this.state.posts.find(post => {
        return post.id == idUrl.split("/")[idUrl.split('/').length - 1]
      })
      return post
    }
  }

  render() {
    console.log('Render Posts: ', this.state.posts);
    const postShow = `/users/${this.state.user.id}/posts`

    const panes = [
      { menuItem: 'Posts', render: () => (
        <Tab.Pane attached={false} className='hold-panes'>
          <FeedList
            currentUser={this.props.currentUser}
            posts={this.state.posts}
            post={this.displayPost()}
            postShow={postShow}
            setSelectedPost={this.setSelectedPost.bind(this)}
            selectedPost={this.state.selectedPost}
            handleChange={this.handleCommentChange}
            handleSubmit={this.handleSubmitComment}
            handleLike={this.handleLike}
            mounted={this.state.mounted}
          />
        </Tab.Pane>
      ) },
        { menuItem: 'Info', render: () => (
          <Tab.Pane attached={false}>
            <UserInfo
              user={this.state.user}
            />
          </Tab.Pane>
      ) },
        { menuItem: 'Friends', render: () => (
          <Tab.Pane attached={false}>
            <UserFriends
              user_id={this.state.user.id}
            />
          </Tab.Pane>
      ) }
    ]

    return (
      <div>
        <UserHeader
          user={this.state.user}
          handleConnect={this.createConnection}
          checkFriends={this.state.checkFriends}
          mounted={this.state.mounted}
        />

        <Route path='/users/:id' render={() => (
          <Transition visible={this.state.mounted} animation='fade up' duration={700}>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} />
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </Transition>
        )} />

        <Route path="/users/:id/posts/:id" render={() => {
        return(
          <Transition visible={this.state.mounted} animation='fade up' duration={700}>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} />
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </Transition>
          )
        }}
      />

      </div>
    )
  }
}
