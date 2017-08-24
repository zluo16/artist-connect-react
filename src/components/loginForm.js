import React, { Component } from 'react'
import { Button, Form, Segment, Card, Input, Divider, Grid, Header, Transition } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../App.css'
import 'semantic-ui-css/semantic.min.css';

export default class Login extends Component {

  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      mounted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    //TODO: make form a controlled inpout by having value tied to state
    // input type="text" value={this.state.email} />
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSendLogin(this.state)
    console.log(this.state);
    this.setState({ email: '', password: '' })
  }

  handleMount = (e) => {
    this.setState({ mounted: true })
  }

  handleDemo = (e) => {
    this.setState({ email: 'mike@mike.mike', password: 'test' }, this.handleSubmit(e))
  }

  render() {
    const { mounted } = this.state
    const unMounted = !this.state.mounted

    return (
      <div className='login-background' onClick={this.handleMount}>
        <Grid>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column width={6}>
            <Header as='h1' className='login-form login-header'>Welcome to basic... </Header>
            <Header as='h2' className='under-header login-header'>Click anywhere!</Header>
            <Transition visible={mounted} animation='fade up' duration={1000}>
              <Header as='h3' className='under-under-header login-header'>Login... </Header>
            </Transition>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field size='huge'>
                <Transition visible={mounted} animation='fade up' duration={1000}>
                  <Form.Input onChange={this.handleChange} name='email' icon='user' iconPosition='left' placeholder='Email Address' />
                </Transition>
              </Form.Field>
              <br/>
              <Form.Field>
                <Transition visible={mounted} animation='fade up' duration={1000}>
                  <Form.Input onChange={this.handleChange} type='password' name='password' icon='unlock alternate' iconPosition='left' placeholder='Password' />
                </Transition>
              </Form.Field>
              <br/>
              <Transition visible={mounted} animation='fade up' duration={1000}>
                <div>
                  <Button primary type='submit'>Login</Button>
                  <Button
                    secondary
                    as={Link}
                    to='/signup'>Sign Up</Button>
                  <Button
                    secondary
                    onClick={this.handleDemo}>Demo</Button>
                </div>
              </Transition>
            </Form>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid>
      </div>
    )
  }
}
