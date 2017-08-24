import React, { Component } from 'react'
import { Form, Input, Button, Grid, Select, TextArea } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'

export default class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    gender: '',
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
    const options = [
      { key: 'male', text: 'Male', value: 'male' },
      { key: 'female', text: 'Female', value: 'female' }
    ]

    return (
      <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={10}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Field
                required
                onChange={this.handleInputChange}
                control={Input}
                label='First name'
                placeholder='First name'
                name='first_name'
              />
              <Form.Field
                required
                onChange={this.handleInputChange}
                control={Input}
                label='Last name'
                placeholder='Last name'
                name='last_name'
              />
              <Form.Field
                required
                onChange={this.handleInputChange}
                control={Input}
                label='Date of birth'
                placeholder='mm/dd/yyyy'
                name='dob'
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                onChange={this.handleInputChange}
                control={Input}
                label='Email address'
                placeholder='Email'
                name='email'
              />
              <Form.Field
                onChange={this.handleInputChange}
                control={Select}
                options={options}
                label='Sex'
                placeholder='m / f'
                name='gender'
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                required
                onChange={this.handleInputChange}
                control={Input}
                type='password'
                label='Password'
                placeholder='Password'
                name='password'
              />
              <Form.Field
                required
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
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid>
    )
  }
}
