import React, { Component } from 'react'
import { Input, Grid, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import JobsList from './jobsList'
import Nav from '../nav'

class JobsContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    orgs: []
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/organizations', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(orgs => this.setState({ orgs }))
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleJobSearchSubmit}>
          <Form.Input onChange={this.props.handleChange}
            icon='search'
            placeholder='Search...' onSubmit={this.props.handleJobSearchSubmit}
          />
          <Form.Button content='Go' />
        </Form>
        <br></br>

        <Grid>
          <Grid.Column>
            <JobsList jobs={this.props.jobPostings} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default JobsContainer
