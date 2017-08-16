import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Users from '../users'
import PostBox from './postBox'
import AuthAdapter from '../../auth/authAdapter'
import JobsFeed from './jobsFeed'


export default class HomeContainer extends Component {

  state = {
    currentUser: {}
  }

  componentWillMount() {
    this.setState({ currentUser: AuthAdapter.currentUser() })
  }

  render() {
    const panes = [
      { menuItem: 'Job Postings', render: () => <Tab.Pane><JobsFeed /></Tab.Pane> },
      { menuItem: 'Posts', render: () => <Tab.Pane></Tab.Pane> }
    ]
    
    return (
      <div>
        <PostBox user={this.state.currentUser} />
        <Tab panes={panes} />
      </div>
    )
  }
}
