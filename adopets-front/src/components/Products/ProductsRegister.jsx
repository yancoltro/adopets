import React from 'react'
import '../Defaults.css'
import { DefaultLayout, getToken } from '../Defaults'
import { Form, Input, InputNumber, Button, Select } from 'antd';

const { Option } = Select;



class ProductRegister extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            category: '',
            price: '',
            stock: '',


            //show_alert: false,
            //alert_message: '',
            //alert_description: '',
            //alert_type: 'error'
        }
        //this.handleEmail = this.handleEmail.bind(this)
        //this.handlePassword = this.handlePassword.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    //handleEmail(event) { this.setState({ email: event.target.value }) }
    //
    //handlePassword(event) { this.setState({ password: event.target.value }) }

    handleSubmit(event) {

    }

    validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be greater than ${min}',
        },
    };
    onFinish(values) {
        console.log(values)
     }


    render() {
        return (
            <React.Fragment>
                <DefaultLayout>
                    <Form  name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>
                        <Form.Item name={'name'} label="Product Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'description'} label="Product Description" rules={[{ required: true }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Product Category">
                            <Input.Group compact>
                                <Form.Item
                                    name={'category'}
                                    noStyle
                                    rules={[{ required: true, message: 'Category is required' }]}>
                                    <Select placeholder="Select Category">
                                        <Option value="Pet">Pet</Option>
                                        <Option value="Beverage">Beverage</Option>
                                        <Option value="Cleaning">Cleaning</Option>
                                        <Option value="Clothing">Clothing</Option>
                                        <Option value="Food">Food</Option>
                                        <Option value="Recreation">Recreation</Option>
                                    </Select>
                                </Form.Item>
                    &nbsp;&nbsp;or describe&nbsp;&nbsp;
                        <Form.Item
                                    name={'category'}
                                    noStyle
                                    rules={[{ required: true, message: 'Category is required' }]}>
                                    <Input style={{ width: '50%' }} placeholder="Prodcut Category" />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item name={'price'} label="Price" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={'stock'} label="Stock" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{float:"right"}}>Save</Button>
                        </Form.Item>
                    </Form >
                </DefaultLayout>
            </React.Fragment>
        )
    }
}

export default ProductRegister