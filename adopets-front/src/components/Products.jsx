import React from 'react'
import axios from 'axios'
import { Table } from 'antd';
import {DefaultLayout} from './Defaults'

const API = 'http://127.0.0.1:3333'

class Products extends React.Component {

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
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock'
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
        axios.get('http://127.0.0.1:3333/products')
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

export default Products