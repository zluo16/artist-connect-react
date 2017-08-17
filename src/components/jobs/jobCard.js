import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const JobCard = (props) => {
  const jobUrl = `/jobs/${props.job.id}`
  const header = `${props.job.title}`
  const meta = `for ${props.org.name}`
  const description = props.job.description.length > 120 ? `${props.job.description.slice(0, 119)}...` : props.job.description

  return (
    <Card
      raised
      as={Link}
      to={jobUrl}
      header={header}
      meta={meta}
      description={description}
    />
  )
}

export default JobCard

// 'Good job, great job, fantastic! Loves long walks on the beach. Loves long walks on the beach, in the forest, wherever! And is also a Dog.'
