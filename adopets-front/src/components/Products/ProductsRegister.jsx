import React from 'react'
import '../Defaults.css'
import { withRouter} from 'react-router-dom';
import { DefaultLayout, getToken } from '../Defaults'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import {openNotification} from '../Defaults'

const { Option } = Select;

class ProductRegister extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
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


        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    componentDidMount(){
        let method = this.props.match.params.method
        let uuid = this.props.match.params.uuid
        if(method === 'update'){
            this.getProduct(uuid)
        }else if(method === 'delete'){
            this.deleteProduct(uuid)
        }else{
            this.props.history.push('/404')
        }
    }

    getProduct(uuid){

    }

    deleteProduct(uuid){}


    handleName(event){ this.setState({name: event.target.value})}

    handleDescription(event){ this.setState({description: event.target.value})}

    handleSelectCategory(event){ this.setState({category: event})}

    handleCategory(event){ this.setState({category: event.target.value})}

    handlePrice(event){ this.setState({price: event.target.value})}

    handleStock(event){ this.setState({stock: event.target.value})}

    handleSubmit(event) {
        let product = {
            name : this.state.name,
            description : this.state.description,
            category : this.state.category,
            price : this.state.price,
            stock : this.state.stock
        }
        let token = getToken();
        const header =  `Authorization: Bearer ${token}`;
        
        axios.post('http://127.0.0.1:3333/products', product, {  headers: {Authorization: 'Bearer ' + token} })
            .then(response => {
                if(response.status === 200){
                    console.log(response)
                    openNotification("Success", "New product added!", 'success')
                    console.log(this.props)
                    this.props.history.push('/products');
                }else{
                    openNotification("Ops", `Unrecognized error: ${response.data}`, 'info')
                }
            })
            .catch((error) => {
                console.log(error)               
                //var response = error.response
                //var for_user  = response === 'undefined' ? error.error : response.data.error
                //openNotification("Huston, we have a problem!", `${for_user}`, 'fail')
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
    onFinish(values) {
        console.log(values)
     }


    render() {
        return (
            <React.Fragment>
                <DefaultLayout>
                    <Form  name="nest-messages" onFinish={this.handleSubmit} validateMessages={this.validateMessages}>
                        <Form.Item name={'name'} label="Product Name" rules={[{ required: true }]}>
                            <Input  value={this.state.name} onChange={this.handleName}/>
                        </Form.Item>
                        <Form.Item name={'description'} label="Product Description" rules={[{ required: true }]}>
                            <Input.TextArea value={this.state.description} onChange={this.handleDescription} />
                        </Form.Item>
                        <Form.Item label="Product Category">
                            <Input.Group compact>
                                <Form.Item
                                    name={'category'}
                                    noStyle
                                    rules={[{ required: true, message: 'Category is required' }]}>
                                    <Select placeholder="Select Category" onChange={this.handleSelectCategory}>
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
                                        placeholder="Prodcut Category" 
                                        value={this.state.category} 
                                        onChange={this.handleCategory} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item name={'price'} label="Price" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber value={this.state.price} onChange={this.handlePrice}/>
                        </Form.Item>
                        <Form.Item name={'stock'} label="Stock" rules={[{ type: 'number', min: 0 }]}>
                            <InputNumber value={this.state.stock} onChange={this.handleStock} />
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

export default withRouter(ProductRegister)