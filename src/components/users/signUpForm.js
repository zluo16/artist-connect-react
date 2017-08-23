import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    first_name: '',
    last_name: '',
    email: '',
    stage_name: '',
    password: '',
    password_confirmation: ''
  }

  handleInputChange = (event) => {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = () => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('jwt', res.jwt)
      this.context.router.history.push('/home')
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='First name'
            placeholder='First name'
            name='first_name'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Last name'
            placeholder='Last name'
            name='last_name'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label='Email address'
            placeholder='Email'
            name='email'
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            label ='Stage name (optional)'
            placeholder='optional'
            name='stage_name'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            type='password'
            label='Password'
            placeholder='Password'
            name='password'
          />
          <Form.Field
            onChange={this.handleInputChange}
            control={Input}
            type='password'
            label='Confirm Password'
            placeholder='Confirm Password'
            name='password_confirmation'
          />
        </Form.Group>
        <Form.Group>
          <Button type='submit'>Sign Up!</Button>
        </Form.Group>
      </Form>
    )
  }
}
