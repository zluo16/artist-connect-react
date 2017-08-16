import React from 'react'
import { Card } from 'semantic-ui-react'
import JobCard from './jobCard'

const JobsList = (props) => {
  return (
    <Card.Group itemsPerRow={4}>
      {props.jobs !== null ? props.jobs.map(job => {
        let org = props.orgs.find(org => org.id == job.organization.id)
        return <JobCard
          job={job}
          orgName={org.name}
        />
      }) : null}
    </Card.Group>
  )
}

export default JobsList
