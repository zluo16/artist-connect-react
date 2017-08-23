import React, { Component } from 'react'
import { Feed, Grid, Loader, Dimmer } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import FeedElement from './feedElement'
import PostShow from './postShow'

const FeedList = ({
  currentUser,
  posts,
  post,
  postShow,
  selectedPost,
  handleChange,
  handleSubmit,
  handleLike
}) => {
  console.log(selectedPost);


  const postItems = posts.map(postItem => {
    return <FeedElement user={postItem.user} post={postItem} handleLike={handleLike} postShow={postShow} />
  })
  console.log(selectedPost)

  return (
    <div>
      <Grid padded divided>
        <Grid.Column width={6}>
          <Route path='/users/:id' render={() => (
            <Feed>
              {postItems}
            </Feed>
          )} />
          <Route path='/home' render={() => (
            <Feed>
              {postItems}
            </Feed>
          )} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Route path='/home/posts/:id' render={() => (
            <PostShow
              post={post}
              postShow={postShow}
              currentUser={currentUser}
              selectedPost={selectedPost}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleLike={handleLike}
            />
          )} />
          <Route path='/users/:id/posts/:id' render={() => (
            <PostShow
              post={post}
              postShow={postShow}
              currentUser={currentUser}
              selectedPost={selectedPost}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleLike={handleLike}
            />
          )} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default FeedList
