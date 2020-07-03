import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { DefaultLoginRegister } from '../Defaults'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            rp_pass: '',

            show_alert: false,
            alert_message: '',
            alert_description: '',
            alert_type: 'error'
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleRpPass = this.handleRpPass.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleName(event) { this.setState({ name: event.target.value }) }

    handleEmail(event) { this.setState({ email: event.target.value }) }

    handlePass(event) { this.setState({ pass: event.target.value }) }

    handleRpPass(event) { this.setState({ rp_pass: event.target.value }) }

    handleSubmit(event) {
        alert('Um nome foi enviado: ' + this.state.name);
        event.preventDefault();
    }

    componentDidMount() { }

    componentWillMount() { }

    render() {
        return (
            <div style={{height: '1280px'}}>
                <DefaultLoginRegister
                    show_alert={this.state.show_alert}
                    alert_message={this.state.alert_message}
                    alert_description={this.state.alert_description}
                    alert_type={this.state.alert_type}
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                        </Form.Item>
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
                            hasFeedback
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
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