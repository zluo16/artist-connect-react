import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent, props) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentDidMount() {
      if (!localStorage.getItem('jwt')) {
        this.context.router.history.push('/login')
      }
    }

    componentWillUpdate() {
      if(!localStorage.getItem('jwt')) {
        this.context.router.history.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...props} />
    }
  }

  return Authentication
}
