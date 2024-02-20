import React,{useEffect,useState} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
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
    const [tokenExpirationMessage, setTokenExpirationMessage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const expiresIn = localStorage.getItem('expires_in');
            const expirationTime = new Date(expiresIn).getTime();
            const currentTime = new Date().getTime();
            const timeUntilExpiration = expirationTime - currentTime;
            const oneMinute = 60 * 1000; // milliseconds
            if (timeUntilExpiration < oneMinute) {
                // Token is about to expire, show message
                setTokenExpirationMessage(true);
            }
        }
    }, []);
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
                const expiresIn = new Date(new Date().getTime() + (data.expires_in * 1000));
                localStorage.setItem('token', token);
                localStorage.setItem('expires_in', expiresIn);
                dispatch(setLoginuser(values));
                console.log('Login successful');
                
                if(token != null){
                    navigate('/dashboardtemplate');
                }
                else{
                     message.error("Invalid UserName/Password")
                }
                // if(UserName === 'admin'&& Password === "admin@123"){
                //     // message.success("Login Successfully")
                //     navigate('/dashboardtemplate');
                // }
                // else{
                //     message.error("Invalid UserName/Password")
                // }
                
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
    const handleContinue = () => {
        setTokenExpirationMessage(false);
        onFinish()
        // Call API to refresh token here
        // Once refreshed, navigate user to dashboard
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
        layout="vertical"
        labelCol={{
        span: 12,
        }}
        wrapperCol={{
        span: 24,
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
    {tokenExpirationMessage && (
                <div className="token-expiration-message">
                    <p>Your session is about to expire. Do you want to continue?</p>
                    <Button type="primary" onClick={handleContinue}>Continue</Button>
                    <Button type="danger" onClick={handleLogout}>Logout</Button>
                </div>
            )}
    </>
 
);
}
export default Login;