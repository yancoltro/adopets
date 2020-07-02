import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie'

import { DefaultLoginRegister } from './Defaults'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'yan.coltro@hotmail.com',
            password: 'qwertyui',
            show_alert: false,
            alert_message: '',
            alert_description: '',
            alert_type: 'error'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)
        axios.post('http://127.0.0.1:3333/login', user)
            .then(response => {
                if (response.status !== 200) {
                    // setar tempo de expiração
                    const cookies = new Cookies();
                    cookies.set('login', response, { path: '/' });
                } else {
                    this.setState({
                        show_alert:true,
                        alert_message: 'Error',
                        alert_description: "Have any erro in you login"
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                })
            })
    }


    render() {
        return (
            <React.Fragment>
                <DefaultLoginRegister
                    show_alert={this.state.show_alert}
                    alert_message={this.state.alert_message}
                    alert_description={this.state.alert_description}
                    alert_type={this.state.alert_type}
                    card_title="Login">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{}}
                        onFinish={this.handleSubmit}>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your E-mail!' },
                                { type: 'email', message: 'The input is not valid E-mail' }
                            ]}>
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                Log in
                            </Button>
                        </Form.Item>
                        <div style={{textAlign: "right"}}>
                        No have account? <Link to="/register" style={{textAlign:"right"}}>Register now!</Link>
                        </div>
                    </Form>
                </DefaultLoginRegister>
            </React.Fragment >
        )
    }
}

export default Login