import React from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'

const JobHeader = (props) => {
  const title = `${props.job.title}`
  const aps = `${props.job.ap_number}`
  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='money' circular />
        <Header.Content>
          {title}
        </Header.Content>
      </Header>
      <Button
        color='blue'
        content='Apply'
        label={{ basic: true, color: 'blue', pointing: 'left', content: aps }}
        onClick={props.show}
      />
    </div>
  )
}

export default JobHeader
