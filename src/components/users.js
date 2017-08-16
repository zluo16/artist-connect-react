import React from 'react'
import { Input, Grid, Form } from 'semantic-ui-react'
import Nav from './nav'
import UsersList from './usersList'

const Users = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSearchSubmit}>
        <Form.Input onChange={props.handleChange}
          icon='search'
          placeholder='Search...' onSubmit={props.handleSearchSubmit}
        />
        <Form.Button content='Go' />
      </Form>

      <Grid>
        <Grid.Column>
          <UsersList users={props.users} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Users
