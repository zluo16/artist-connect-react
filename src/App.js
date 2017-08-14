import React, { Component } from 'react';
import AuthAdapter from './auth/authAdapter'
import Auth from './auth/authorize'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './components/loginForm'
import SignUpForm from './components/signUpForm'
import OrgSignupForm from './components/orgSignupForm'
import HomeContainer from './components/homeContainer'
import OrgHomeContainer from './components/orgContainer'
import Users from './components/users'
import UserProfileContainer from './components/UserProfileContainer'
import JobsContainer from './components/jobs/jobsContainer'
import Job from './components/jobs/job'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

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
      <Router>
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
        </div>
      </Router>
    );
  }
}

export default App;
