import React from 'react'
import PropTypes from 'prop-types'

export default function (Component, headers, props) {
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
      return <Component {...props} />
    }
  }

  return Authentication
}
