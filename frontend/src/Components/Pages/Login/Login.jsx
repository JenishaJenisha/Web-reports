import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLoginuser} from "../../Store//slices/LoginSlice/loginslice";
import './Login.scss';

import axios from 'axios';
import qs from 'qs';
import { LOGIN_API_BASE_URL,LOGIN_API_ENDPOINTS } from '../../Config/config';
const Login = () => {
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const { UserName, Password } = values;
            const requestData = {
                UserName,
                Password,
                grant_type: 'password'
            };
            const requestDataEncoded = qs.stringify(requestData);
            const config = {
                method: LOGIN_API_ENDPOINTS.login.method,
                url: `${LOGIN_API_BASE_URL}${LOGIN_API_ENDPOINTS.login.url}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: requestDataEncoded,
            };
            const response = await axios.request(config);
            if (response.status === 200) {
                const data = response.data;
                const token = data.access_token;
                localStorage.setItem('token', token);
                dispatch(setLoginuser(values));
                console.log('Login successful');
                if(UserName === 'admin'&& Password === "admin@123"){
                    navigate('/dashboardtemplate');
                }
                
            } else {
                const responseData = await response.json();
                const { error, error_description } = responseData;
                if (error === 'invalid_grant') {
                    console.error('Invalid username or password. Please try again.');
                } else {
                    console.error('An error occurred during login:', error_description);
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
        const onFinishFailed = (errorInfo) => {
            console.error('Form validation failed:', errorInfo);
        };
return(
    <>
    {/* <div className='bg'>
    <div className='LoginForm'> */}
    <div className="login-page"> 
            <div className="login-form-container">
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
    <h1 className='loginheader'>Login</h1>
        <Form.Item
        label="UserName"
        name="UserName"
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
        name="Password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
        <Input.Password size="large"/>
        </Form.Item>

        {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

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