import React from 'react';
import {DatePicker, Form, Input, Modal,Select, TimePicker } from 'antd';

const AddReportSchedulermodel = ({ open, onCreate, onCancel }) => {
   
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const {Option}= Select
 
  
  return (
    <Modal
      open={open}
      title="Report Scheduler"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="form_in_modal"
      >
        
        <Form.Item
          name="schedulerName"
          label="Report Name"
          rules={[
            {
              required: true,
              message: 'Please input the Report Name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="startdatetime" label="Start Date and Time"rules={[{ required: true, message: 'Please select a start date and time!' }]}>
          <DatePicker showTime />
          {/* <TimePicker/> */}
        </Form.Item>
        <Form.Item name="Provisiontime" label="Provision Time"><TimePicker/></Form.Item>
        <Form.Item name="frequency" label="Frequency">
        <Select>
            <Option value="Once"></Option>
            <Option value="Monthly"></Option>
            <Option value="Weekly"></Option>
            <Option value="Yearly"></Option>
            <Option value="24 Hours"></Option>
        </Select>
        </Form.Item>
        <Form.Item name='timezone' label="timezone" rules={[{ required: true, message: 'Please select a timezone!' }]}>
        <Select >
    <Option value="[GMT+05.30]Indian Standard Time(Asia/Calcutta)"></Option>
</Select>
        </Form.Item>
        <Form.Item name="executionorder" label="Execution Order"> 
        <Select>
          <Option value="First"></Option>
          <Option value="Second"></Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReportSchedulermodel;