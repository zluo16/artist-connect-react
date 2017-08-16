import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class JobsFeed extends Component {

  state = {
    job_postings: [],
    organizations: []
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/job_postings', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ job_postings: res.reverse() })
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

  jobEvents() {
    return this.state.job_postings.map(job => {
      let org = this.state.organizations.find(org => org.id == job.organization.id)

      return {
        summary: `${org.name} is looking for a ${job.title}`,
        meta: `${job.applications.length} applied`,
        as: Link,
        to: `/jobs/${job.id}`
      }
    })
  }

  render() {
    // debugger
    return (
      <Feed events={this.jobEvents()} />
    )
  }
}
