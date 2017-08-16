import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const JobCard = (props) => {
  const jobUrl = `/jobs/${props.job.id}`
  const header = `${props.job.title}`
  const meta = `for ${props.orgName}`

  return (
    <Card
      as={Link}
      to={jobUrl}
      header={header}
      meta={meta}
      description='Good job, great job, fantastic! Loves long walks on the beach. Loves long walks on the beach, in the forest, wherever! And is also a Dog.'
    />
  )
}

export default JobCard
