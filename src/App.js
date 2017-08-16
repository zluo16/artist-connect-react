import React, { Component } from 'react';
import AuthAdapter from './auth/authAdapter'
import Auth from './auth/authorize'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import Login from './components/loginForm'
import SignUpForm from './components/signUpForm'
import OrgSignupForm from './components/orgSignupForm'
import HomeContainer from './components/home/homeContainer'
import OrgHomeContainer from './components/orgContainer'
import Users from './components/users'
import UserProfileContainer from './components/UserProfileContainer'
import JobsContainer from './components/jobs/jobsContainer'
import Job from './components/jobs/job'
import JobPostingForm from './components/jobs/jobPostingForm'
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,
  Container,
  Divider,
  Dropdown,
  Header,
  Message,
  Segment,
  Menu,
  Icon,
  Sidebar,
  Grid } from 'semantic-ui-react'

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    auth: {
      headers: AuthAdapter.headers
    },
    users: [],
    jobPostings: [],
    organizations: [],
    searchTerms: ''
  }

  isLoggedIn = () => !!window.localStorage.jwt

  onLogin(loginParams) {
    AuthAdapter.login(loginParams)
      .then(res => {
        if (res.error) {
          console.log('do nothing');
        } else {
          localStorage.setItem('jwt', res.jwt)
          this.context.router.history.push('/home')
        }
      })
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ users: res })
    })

    fetch('http://localhost:3000/api/v1/job_postings', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ jobPostings: res })
    })

    fetch('http://localhost:3000/api/v1/organizations', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ organizations: res })
    })
  }

  handleChange = (event) => {
    this.setState({ searchTerms: event.target.value })
  }

  handleSearchSubmit = (event) => {
    event.preventDefault()
    let filteredUsers = this.state.users.filter(user => {
      let searchTerms = this.state.searchTerms.toLowerCase()
      let firstTruth = user.first_name.toLowerCase() === searchTerms
      let secondTruth = user.last_name.toLowerCase() === searchTerms
      // let thirdTruth = user.email.toLowerCase() === searchTerms

      return firstTruth || secondTruth
    })
    this.setState({ users: filteredUsers, searchTerms: '' })
  }

  handleJobSearchSubmit = (event) => {
    event.preventDefault()
    let filteredJobs = this.state.jobPostings.filter(job => {
      let searchTerms = this.state.searchTerms.toLowerCase()
      let firstTruth = job.title.toLowerCase() === searchTerms

      return firstTruth
    })
  }

  render() {
    return (
      <div>
        <Menu secondary attached="top">
          <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
            <Icon name="sidebar" />Menu
          </Menu.Item>
        </Menu>
      <Sidebar.Pushable as={Segment} attached="bottom" >
        <Sidebar as={Menu} animation="scale down" visible={this.state.menuVisible} icon="labeled" vertical inline inverted>
          <Menu.Item
            as={Link}
            to='/home'><Icon name="home" />Home</Menu.Item>
          <Menu.Item
            as={Link}
            to='/users'><Icon name="add user" />Users</Menu.Item>
          <Menu.Item><Icon name="smile" />Friends</Menu.Item>
          <Menu.Item
            as={Link}
            to='/jobs'><Icon name="money" />Find Job</Menu.Item>
        </Sidebar>

         <Sidebar.Pusher>
          <Grid>
            <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={10}>
                <Segment basic>
                  <div className="App">
                    <Route exact path='/login' render={() => <Login onSendLogin={this.onLogin.bind(this)} isLoggedIn={this.isLoggedIn} />} />
                    <Route exact path='/signup' component={SignUpForm} />
                    <Route exact path='/organization/new' component={OrgSignupForm} />
                    <Route exact path='/home' component={Auth(HomeContainer)} />
                    <Route exact path='/users' render={() => <Users
                      users={this.state.users}
                      handleChange={this.handleChange}
                      handleSearchSubmit={this.handleSearchSubmit}
                    />} />
                    <Route exact path='/new/jobpost' component={JobPostingForm} />
                    <Route exact path='/jobs' render={() => <JobsContainer
                      jobPostings={this.state.jobPostings}
                      handleChange={this.handleChange}
                      handleJobSearchSubmit={this.handleJobSearchSubmit}
                    />} />
                    <Route path='/jobs/:id' render={() => <Job org={this.state.organizations} />} />
                    <Route eaxact path='/organization/home' component={OrgHomeContainer} />
                    <Route path='/users/:id' render={() => <UserProfileContainer
                      users={this.state.users}
                    />} />
                  </div>
                </Segment>
              </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid>
         </Sidebar.Pusher>
       </Sidebar.Pushable>
     </div>
    );
  }
}

export default App;
