import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class OrgHomeContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {}

  render() {
    return (
      <Button>Create a Job</Button>
    )
  }
}
