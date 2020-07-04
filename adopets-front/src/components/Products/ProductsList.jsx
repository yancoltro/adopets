import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Table, Space, PageHeader, Input, Row, Col, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DefaultLayout, getToken, api, openNotification } from '../Defaults'
import '../Defaults.css'

const { Option } = Select;


class ProductsList extends React.Component {

    columns = [
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid'
        },
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
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/products/update/" + record.uuid}><EditOutlined />&nbsp;Update</Link>
                    <Link to={"/products/delete/" + record.uuid} style={{ color: '#f00' }}><DeleteOutlined />&nbsp;Delete</Link>
                </Space>
            ),
        },
    ];


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filter_type: 'name',
            filter_value: ''
        }

        this.handleFilterType = this.handleFilterType.bind(this)
        this.handleFilterValue = this.handleFilterValue.bind(this)
    }

    handleFilterType(event) {
        this.setState({ filter_type: event }, () => {
            this.handleFilter()
        })
    }

    handleFilterValue(event) {
        this.setState({ filter_value: event.target.value }, () => {
            this.handleFilter()
        })

    }

    handleFilter() {
        let token = getToken();
        let url = api()+`/products/filter=${this.state.filter_type}&value=${this.state.filter_value}&page=`
        axios.get(url, { headers: { Authorization: 'Bearer ' + token } })
            .then(response => {
                this.setState({
                    products: response.data,
                })
            })
            .catch((error) => {
                openNotification(`Huston, we have a problem! ${error.response.status}`,
                 'There was an error applying the filterss', 'fail')
            })
    }

    componentDidMount() {
        let token = getToken();
        axios.get(api() + '/products', { headers: { Authorization: 'Bearer ' + token } })
            .then(response => {
                this.setState({
                    products: response.data
                })
            })
            .catch((error) => {
                openNotification(`Huston, we have a problem! ${error.response.status}`,
                 'There was an error loading the products', 'fail')
            })

    }

    componentWillMount() {

    }

    render() {

        return (
            <React.Fragment>
                <DefaultLayout>
                    <Row>
                        <Col span={12}><PageHeader
                            className="site-page-header"
                            title="Products" />
                        </Col>
                        <Col span={12}>
                            <div style={{ float: "right", display: 'inline' }}>

                                <Row>
                                    <Col span={12}>
                                        Filter by:&nbsp;&nbsp;&nbsp;
                                        <Select defaultValue="Name" style={{ width: 120 }} onChange={this.handleFilterType}>
                                            <Option value="name">Name</Option>
                                            <Option value="description">Description</Option>
                                            <Option value="category">Category</Option>
                                        </Select>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="Filter Value" value={this.state.filter_value} onChange={this.handleFilterValue} />
                                    </Col>
                                </Row>
                            </div></Col>
                    </Row>


                    <Table columns={this.columns} dataSource={this.state.products} key="product_2" />
                </DefaultLayout>
            </React.Fragment>
        )
    }

}

export default ProductsList