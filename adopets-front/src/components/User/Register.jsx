import React from 'react'
import axios from 'axios'
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { DefaultLoginRegister, api, openNotification } from '../Defaults'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleName(event) { this.setState({ name: event.target.value }) }

    handleEmail(event) { this.setState({ email: event.target.value }) }

    handlePassword(event) { this.setState({ password: event.target.value }) }

    handleSubmit(event) {
        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)
        axios.post(api()+'/register', user)
            .then(response => {
                if (response.status === 200) {
                    openNotification("Logged in", "You are registered in system!", null)
                    this.props.history.push('/products');
                }else {
                    openNotification("Ops", `Unrecognized error: ${response.data}`, 'info')
                }
            })
            .catch((error) => {
                var response = error.response
                var for_user = response === 'undefined' ? error.error : response.data.error
                openNotification("Huston, we have a problem!", `${for_user}`, 'fail')
            })
    }

    render() {
        return (
            <div style={{height: '1280px'}}>
                <DefaultLoginRegister
                    card_title="Register">
                    <Form
                        name="register"
                        className="login-form"
                        initialValues={{}}
                        onFinish={this.handleSubmit}
                        scrollToFirstError>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}>
                            <Input 
                                value={this.state.name}
                                onChange={this.handleName}
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your E-mail!' },
                                { type: 'email', message: 'The input is not valid E-mail' }
                            ]}>
                            <Input
                                value={this.state.email}
                                onChange={this.handleEmail}
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
                                value={this.state.password}
                                onChange={this.handlePassword}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your Password!' },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                Register</Button>
                        </Form.Item>
                    </Form>
                </DefaultLoginRegister>
            </div >
        )
    }

}

export default Register