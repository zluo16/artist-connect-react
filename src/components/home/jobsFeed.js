import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class JobsFeed extends Component {

  state = {
    job_postings: [],
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
  }

  jobEvents() {
    return this.state.job_postings.map(job => {
      return {
        summary: `${job.org.name} is looking for a ${job.title}`,
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
