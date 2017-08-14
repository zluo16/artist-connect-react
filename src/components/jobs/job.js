import React, { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import JobHeader from './jobHeader'
import ApplicationForm from './applicationForm'

export default class Job extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    job: {},
    open: false,
    resume: '',
    cover_letter: ''
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
      this.setState({ job })
    })
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
  }

  render() {
    const { open, job } = this.state

    return (
      <div>
        <JobHeader job={job} show={this.show} />

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
