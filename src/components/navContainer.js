import React, { Component } from 'react'
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment,
  Menu,
  Icon,
  Sidebar } from 'semantic-ui-react'
import { Route, Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthAdapter from './auth/authAdapter'
import Auth from './auth/authorize'
import HomeContainer from './components/homeContainer'
import OrgHomeContainer from './components/orgContainer'
import Users from './components/users'
import UserProfileContainer from './components/UserProfileContainer'
import JobsContainer from './components/jobs/jobsContainer'
import Job from './components/jobs/job'

export default class NavContainer extends Component {

  render() {
    return (
      <Route exact path='/users' render={() => <Users
        users={this.state.users}
        handleChange={this.handleChange}
        handleSearchSubmit={this.handleSearchSubmit}
      />} />
      <Route exact path='/jobs' render={() => <JobsContainer
        jobPostings={this.state.jobPostings}
        handleChange={this.handleChange}
        handleJobSearchSubmit={this.handleJobSearchSubmit}
      />} />
      <Route path='/jobs/:id' render={() => <Job />} />
      <Route eaxact path='/organization/home' component={OrgHomeContainer} />
      <Route path='/users/:id' render={() => <UserProfileContainer
        users={this.state.users}
      />} />
    )
  }
}
