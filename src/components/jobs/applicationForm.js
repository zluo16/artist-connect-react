import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

const ApplicationForm = (props) => {
  return (
    <Form onSubmit={props.handleApply}>
      <Form.Group>
        <Form.TextArea
          name='resume'
          label='Resume'
          placeholder='Enter in your resume...'
          onChange={props.handleTextChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.TextArea
          name='cover_letter'
          label='Cover letter'
          placeholder='Enter in your cover letter...'
          onChange={props.handleTextChange}
        />
      </Form.Group>
      <Form.Group>
        <Button
          positive icon='checkmark'
          labelPosition='right'
          content='Apply'
          type='submit'
        />
      </Form.Group>
    </Form>
  )
}

export default ApplicationForm
