import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './Login.scss'
const onFinish = (values) => {
//   console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
};
const Login = () => {
return(
    <>
    <div className='bg'>
    <div className='LoginForm'>
    <Form
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    > 
    <Form.Item name="Login">
        <h1 className='loginheader'>Login</h1>
    </Form.Item>
        <Form.Item
        label="Username"
        name="username"
        rules={[
            {
            required: true,
            message: 'Please input your username!',
            },
        ]}
        >
        <Input size="large" />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
        <Input.Password size="large"/>
        </Form.Item>

        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
    </Form>
    </div>
    </div>
    </>
 
);
}
export default Login;