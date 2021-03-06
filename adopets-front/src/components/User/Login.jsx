import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { DefaultLoginRegister, openNotification, api } from '../Defaults'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmail(event) { this.setState({ email: event.target.value }) }

    handlePassword(event) { this.setState({ password: event.target.value }) }

    handleSubmit(event) {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(api()+'/login', user)
            .then(response => {
                if (response.status === 200) {
                    const cookies = new Cookies();
                    cookies.set('login', response.data, { path: '/', maxAge: 86400 });
                    openNotification("Logged in", "You are logged in system!", null)
                    this.props.history.push('/products');
                } 
            })
            .catch((error) => {
                openNotification(`Huston, we have a problem! ${error.response.status}`, `Verify your email and password`, 'fail')
            })
    }


    render() {
        return (
            <React.Fragment>
                <DefaultLoginRegister
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
                                value={this.state.email}
                                onChange={this.handleEmail}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePassword}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                Log in
                            </Button>
                        </Form.Item>
                        <div style={{ textAlign: "right" }}>
                            No have account? <Link to="/register" style={{ textAlign: "right" }}>Register now!</Link>
                        </div>
                    </Form>
                </DefaultLoginRegister>
            </React.Fragment >
        )
    }
}

export default Login