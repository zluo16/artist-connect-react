import React, { Component } from 'react'
import { Button, Form, Segment, Card, Input, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../App.css'
import 'semantic-ui-css/semantic.min.css';

class Login extends Component {

  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSendLogin(this.state)
    console.log(this.state);
    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <Card>
        <Segment inverted>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input onChange={this.handleChange} name='email' icon='user' iconPosition='left' placeholder='Email Address' width={15} />
            </Form.Group>
            <Form.Group>
              <Form.Input onChange={this.handleChange} type='password' name='password' icon='unlock alternate' iconPosition='left' placeholder='Password' width={15} />
            </Form.Group>
            <Button type='submit' inverted className='centered' color='yellow'>Login</Button>
          </Form>
          <Divider inverted horizontal>Or</Divider>
          <Form>
            <Button
              inverted
              className='centered'
              color='green'
              as={Link}
              to='/signup'>Sign Up</Button>
          </Form>
        </Segment>
      </Card>
    )
  }
}

export default Login
