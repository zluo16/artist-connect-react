import React from 'react'
import { Input, Grid, Form, Dimmer, Loader } from 'semantic-ui-react'
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
      <br></br>

      <Grid>
        <Grid.Column>
          {props.loading ?
            <Dimmer active inverted><Loader>Loading</Loader></Dimmer> : null}
          <UsersList users={props.users} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Users
