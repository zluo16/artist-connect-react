import React from 'react'
import { Card } from 'semantic-ui-react'
import JobCard from './jobCard'

const JobsList = (props) => {
  return (
    <Card.Group itemsPerRow={4}>
      {props.jobs !== null ? props.jobs.map(job => {
        return <JobCard
          job={job}
        />
      }) : null}
    </Card.Group>
  )
}

export default JobsList
