import React, { Component } from 'react'
import { Feed, Grid } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import FeedElement from './feedElement'
import PostShow from './postShow'

const FeedList = ({ currentUser, posts, post }) => {
  return (
    <div>
      <Grid padded divided>
        <Grid.Column width={6}>
          <Route path='/home' render={() => (
            <Feed>
              {posts.map(post => {
                return <FeedElement user={post.user} post={post} />
              })}
            </Feed>
          )} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Route path='/home/posts/:id' render={() => (
            <PostShow post={post} currentUser={currentUser} />
          )} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default FeedList
