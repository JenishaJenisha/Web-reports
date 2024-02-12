import React from 'react'
import { Form,Button,Input } from 'antd'
const ChartbindingForm = () => {
  return (
    <>
    <Form>
<Form.Item name="values" label="Values(X-Axis)">
  <Button>Add Values</Button>
</Form.Item>
<Form.Item name="arguments" label="Arguments(Y-Axis)">
<Button>Add Arguments</Button>
</Form.Item>
<Form.Item name="series" label="Series">
<Button>Add Series</Button>
</Form.Item>
<Form.Item name="dataset" label="Data Set">
  <Input placeholder = "Selected Dataset"></Input>
</Form.Item>
      </Form>
      </>
  )
}

export default ChartbindingForm