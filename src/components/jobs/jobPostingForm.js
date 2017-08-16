import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class JobPostingForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    title: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    organization_id: 1 
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/job_postings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      this.context.router.history.push(`/jobs/${res.id}`)
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            name='title'
            label='Title'
            placeholder='Job title'
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.TextArea
            name='description'
            label='Job description'
            placeholder='Describe the job...'
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.TextArea
            name='responsibilities'
            label='Responsibilities'
            placeholder='Job responsibilities...'
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.TextArea
            name='qualifications'
            label='Qualifications'
            placeholder="Who's qualified for the job?.."
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Create New Job</Button>
        </Form.Group>
      </Form>
    )
  }
}
