import React, { Component } from 'react'
import { Modal, Button, Form, Container, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import JobHeader from './jobHeader'
import ApplicationForm from './applicationForm'

export default class Job extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    job: {},
    org: {},
    open: false,
    resume: '',
    cover_letter: '',
    hasApplied: false
  }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  componentWillMount() {
    const idUrl = this.context.router.history.location.pathname
    const id = idUrl.split("/")[idUrl.split("/").length - 1]
    const jobUrl = `http://localhost:3000/api/v1/job_postings/${id}`

    fetch(jobUrl, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(job => {
      this.setState({ job, hasApplied: this.checkApplied(job) })
      this.fetchOrg(this.state.job.organization.id)
    })
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  fetchOrg(id) {
    const orgUrl = `http://localhost:3000/api/v1/organizations/${id}`

    fetch(orgUrl, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(org => this.setState({ org }))
  }

  checkApplied(job) {
    return !!job.users.find(user => user.id == this.props.currentUser.id)
  }

  handleJobApplication = (jobId) => {
    fetch('http://localhost:3000/api/v1/applications', {
      method: 'POST',
      body: JSON.stringify(Object.assign({}, { job_posting_id: jobId }, {
        resume: this.state.resume,
        cover_letter: this.state.cover_letter
      })),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    this.close()
    this.setState({
      job: {
        ...this.state.job,
        ap_number: this.state.job.ap_number += 1
      }
    })
    this.setState({ ...this.state.job, hasApplied: true })
  }

  render() {
    const { open, job, org } = this.state
    const titleHeader = `${this.state.job.title} for ${org.name}`

    return (
      <div>
        <JobHeader
          job={job}
          show={this.show}
          currentUser={this.props.currentUser}
          hasApplied={this.state.hasApplied}
        />
        <br></br>
        <Container text>
          <Header as='h2'>{titleHeader}</Header>
          <p>{job.description}</p>
          <p>{job.responsibilities}</p>
          <p>{job.qualifications}</p>
        </Container>

        <Modal size='small' open={open} onClose={this.close}>
          <Modal.Header>
            Application Form
          </Modal.Header>
          <Modal.Content>
            <ApplicationForm
              handleTextChange={this.handleTextChange}
              handleApply={() => this.handleJobApplication(job.id)}
            />
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
