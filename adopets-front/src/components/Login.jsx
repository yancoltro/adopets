import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const onFinish = values => {
    console.log('Success:', values);
};


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(event){
        axios.post('http://127.0.0.1:3333/products', this)
            .then(response => {
                console.log(response.data)
                this.setState({
                    products: response.data,
                    isLoaded: true
                })
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
                <h1>Login</h1>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >Submit</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default Login