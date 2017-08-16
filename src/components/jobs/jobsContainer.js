import React from 'react'
import { Input, Grid, Form } from 'semantic-ui-react'
import JobsList from './jobsList'
import Nav from '../nav'

const JobsContainer = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleJobSearchSubmit}>
        <Form.Input onChange={props.handleChange}
          icon='search'
          placeholder='Search...' onSubmit={props.handleJobSearchSubmit}
        />
        <Form.Button content='Go' />
      </Form>

      <Grid>
        <Grid.Column>
          <JobsList jobs={props.jobPostings} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default JobsContainer
