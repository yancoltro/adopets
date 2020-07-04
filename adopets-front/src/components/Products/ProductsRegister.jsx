import React from 'react'
import '../Defaults.css'
import { withRouter } from 'react-router-dom';
import { DefaultLayout, getToken } from '../Defaults'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import { openNotification, api } from '../Defaults'

const { Option } = Select;

class ProductRegister extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            method: 'post',
            url: api() + '/products',
            uuid: '',
            name: '',
            description: '',
            category: '',
            price: 0,
            stock: 0
        }
        this.handleName = this.handleName.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handlePrice = this.handlePrice.bind(this)
        this.handleStock = this.handleStock.bind(this)
        this.handleSelectCategory = this.handleSelectCategory.bind(this)


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event) { this.setState({ name: event.target.value }) }

    handleDescription(event) { this.setState({ description: event.target.value }) }

    handleSelectCategory(value) { this.setState({ category: value }) }

    handleCategory(event) { this.setState({ category: event.target.value }) }

    handlePrice(value) { this.setState({ price: value }) }

    handleStock(value) { this.setState({ stock: value }) }

    formRef = React.createRef();

    componentDidMount() {
        let method = this.props.match.params.method
        let uuid = this.props.match.params.uuid
        
        if (method === 'delete') {
            this.setState({ method: 'delete', url: api() + `/products/${uuid}` },
            () => {
                this.handleSubmit(this)
            })
        }

        if (method === 'update') {
            this.setState({ method: 'put', url: api() + `/products/${uuid}` })
            this.getProduct(uuid)
        }
        
    }

    getProduct(uuid) {
        let token = getToken();
        axios.get(api() + `/products/${uuid}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(response => {
                if (response.status === 200) {
                    this.setState(response.data)
                    this.formRef.current.setFieldsValue(this.state);
                }else {
                    openNotification("Ops", `Unrecognized error: ${response.data}`, 'info')
                }
            })
            .catch((error) => {
                var response = error.response
                var for_user = response.status === 404 ? "Product not found" : response.data.error
                openNotification(`Huston, we have a problem! ${response.status}`, `${for_user}`, 'fail')
                this.props.history.push('/products');
            })
    }

    handleSubmit(event) {
        let token = getToken();
        axios({
            method: this.state.method,
            url: this.state.url,
            data: this.state,
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    openNotification("Success", "New product changed!", 'success')
                    this.props.history.push('/products');
                } else {
                    openNotification("Ops", `Unrecognized error: ${response.data}`, 'info')
                }
            })
            .catch((error) => {
            
                var response = error.response
                var for_user = response === 'undefined' ? error.error : response.data.error
                
                openNotification(`Huston, we have a problem! ${response.status}`, `${for_user}`, 'fail')
            })
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

    render() {

        return (
            <React.Fragment>
                <DefaultLayout>
                    <Form name="nest-messages" 
                        onFinish={this.handleSubmit} 
                        validateMessages={this.validateMessages} 
                        initialValues={this.state} 
                        ref={this.formRef}
                        labelCol={{ span: 2 }}
                        >
                        <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
                            <Input value={this.state.name} onChange={this.handleName} />
                        </Form.Item>
                        <Form.Item name={'description'} label="Description" rules={[{ required: true }]}>
                            <Input.TextArea value={this.state.description} onChange={this.handleDescription} />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Input.Group compact>
                                <Form.Item
                                    name={'category'}
                                    noStyle
                                    rules={[{ required: true, message: 'Category is required' }]}>
                                    <Select placeholder="Select Category" style={{ width: 200 }} onChange={this.handleSelectCategory}>
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
                                    <Input style={{ width: '50%' }}
                                        placeholder="Category"
                                        value={this.state.category}
                                        onChange={this.handleCategory} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item name={'price'} label="Price" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber value={this.state.price} onChange={this.handlePrice} />
                        </Form.Item>
                        <Form.Item name={'stock'} label="Stock" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber value={this.state.stock} onChange={this.handleStock} />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ float: "right" }}>Save</Button>
                        </Form.Item>
                    </Form >
                </DefaultLayout>
            </React.Fragment>
        )

    }
}

export default withRouter(ProductRegister)