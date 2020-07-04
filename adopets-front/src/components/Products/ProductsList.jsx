import React from 'react'
import axios from 'axios'
import { Table, Space } from 'antd';
import {DefaultLayout, getToken} from '../Defaults'
import Cookies from 'universal-cookie'

import '../Defaults.css'
const API = 'http://127.0.0.1:3333'

class ProductsList extends React.Component {

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock'
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: 'Upadated',
            dataIndex: 'updated_at',
            key: 'updated_at'
        },
        {
            title: 'Upadated',
            dataIndex: 'updated_at',
            key: 'updated_at'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a>Update</a>
                <a>Delete</a>
              </Space>
            ),
          },
    ];


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        let token = getToken();
        const header =  `Authorization: Bearer ${token}`;
        
        axios.get('http://127.0.0.1:3333/products', {  headers: {Authorization: 'Bearer ' + token} })
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

    componentWillMount() {

    }

    ProductResult() {
        
    }

    render() {
        const { error, isLoaded, products } = this.state;
        let forRender;
        if (error) {
            forRender = <h1 key="product_3">Error: {error.message}</h1>;
        } else if (!isLoaded) {
            forRender = <h1 key="product_4">Loading...</h1>;
        } else {
           forRender = <Table columns={this.columns} dataSource={this.state.products} key="product_2" />
        }

        return (
            <React.Fragment>
                <DefaultLayout>
                    <h1 key="product_1">Products</h1>
                    {forRender}
                </DefaultLayout>
            </React.Fragment>
        )
    }

}

export default ProductsList