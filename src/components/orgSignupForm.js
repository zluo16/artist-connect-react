import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const options = [
  { key: '1', text: 'Band', value: 'band' },
  { key: '2', text: 'Venue', value: 'venue' },
  { key: '3', text: 'Studio', value: 'studio' },
  { key: '4', text: 'School', value: 'school' },
  { key: '5', text: 'Composer', value: 'composer' },
  { key: '6', text: 'Other', value: 'other' }
]

export default class OrgSignupForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    name: '',
    organization_type: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleInputChange = (event) => {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/organizations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('jwt', res.jwt)
      this.context.router.history.push('/organization/home')
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Organization name'
            placeholder='Name'
            name='name'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Select}
            label='Organization type'
            options={options}
            placeholder='Type'
            name='organization_type'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Email'
            placeholder='Email'
            name='email'
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Password'
            placeholder='Password'
            name='password'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Confirm password'
            placeholder='Confirm password'
            name='password_confirmation'
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Create Account!</Button>
        </Form.Group>
      </Form>
    )
  }
}
