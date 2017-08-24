import React, { Component } from 'react'
import { Tab, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Users from '../users/users'
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
      user_id: 0,
    },
    selectedPost: {
      comments: {}
    },
    commentText: ''
  }

  displayPost = () =>  {
    const idUrl = this.context.router.history.location.pathname
    console.log('before post', idUrl);
    const post = this.state.posts.find(post => {
      return post.id == idUrl.split("/")[idUrl.split('/').length - 1]
    })
    console.log('after post in displayPost', post);
    // debugger
    return post
    // if homeContainer has a posts/1 then we need componentDidMount to fetch the extra post
  }

  componentDidMount() {
    console.log('component did mount');
    AuthAdapter.currentUser()
    .then(currentUser => {
      AuthAdapter.fetchPosts()
      .then(res => {
        const posts = res.filter(post => {
          let firstTruth = post.user.id == currentUser.id
          let secondTruth = currentUser.friends.map(f => f.id)
          .includes(post.user.id)
          return firstTruth || secondTruth
        }).sort((p1, p2) => p2.id - p1.id)
        // this.setState({ posts })
        this.setState({
          posts: posts,
          post: {
            ...this.state.post,
            user_id: currentUser.id
          }
        }, this.setSelectedPost)
      })
    })
  }

  setSelectedPost() {
    console.log(this.displayPost());
    if (this.displayPost()) {
      AuthAdapter.fetchSinglePost(this.displayPost().id)
      .then(post => {
        const newpost = Object.assign({}, this.state.selectedPost, post)
        this.setState({ selectedPost: newpost })
        AuthAdapter.fetchPostComments(this.displayPost().id)
        .then(comments => {
          // debugger
          const postWithComments = Object.assign({}, this.state.selectedPost, {comments: comments})
          this.setState({ selectedPost: postWithComments, mounted: true})
        })
        // debugger
      })
    }
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
        let secondTruth = this.props.currentUser.friends.map(f => f.id)
            .includes(post.user.id)
        return firstTruth || secondTruth
      }).sort((p1, p2) => p2.id - p1.id)
      // this.setState({ posts })
      this.setState({
        posts: posts,
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

  handleChange = (event) => {
    this.setState({
      post: {
        ...this.state.post,
        text: event.target.value
      }
    })
  }

  render() {
    console.log("Home Container State", this.state.posts)
    const show = '/home/posts'

    const panes = [
      { menuItem: 'Posts', render: () => (
        <Tab.Pane className='hold-panes'>
          <FeedList
            currentUser={this.props.currentUser}
            posts={this.state.posts}
            post={this.displayPost()}
            postShow={show}
            selectedPost={this.state.selectedPost}
            handleChange={this.handleCommentChange}
            handleSubmit={this.handleSubmitComment}
            handleLike={this.handleLike}
          />
        </Tab.Pane>
    ) },
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

        <Route path="/home" render={() => {
        return( <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} />
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>)
        }}
      />

      <Route path="/posts/:id" render={() => {
      return( <Grid>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>)
      }}
    />

      </div>
    )
  }
}
