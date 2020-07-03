import React from 'react'
import './Defaults.css'
import { Layout, Menu, Breadcrumb, Alert, Card, Row, Col, notification } from 'antd';
import { UserOutlined, NotificationOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie'
import axios from 'axios';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



export function DefaultLayout(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" style={{ float: "right" }}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Products">
              <Menu.Item key="1">List Prodcuts</Menu.Item>
              <Menu.Item key="2">Create Products</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>/Products</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export function DefaultLoginRegister(props) {
  let alert = null
  if (props.show_alert) {
    alert =
      <Alert
        message={props.alert_message}
        description={props.alert_description}
        type={props.alert_type}
        showIcon
        closable
      />;
  }
  return (
    <React.Fragment>

      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          {alert}
          <Card title={props.card_title} style={{ width: '100%' }}>
            {props.children}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export function Logout(props) {
  
  let error
  let token = getToken();
  if (token === null) {
    openNotification(
      "Impossible action",
      "You are already logged out of the system",
      <NotificationOutlined style={{ color: '#108ee9' }} />)
    props.history.push("/login")
    return null
  }
  const header = `Authorization: Bearer ${token}`;
  axios.post('http://127.0.0.1:3333/logout', {}, { headers: { Authorization: 'Bearer ' + token } })
    .then(response => {
      const cookies = new Cookies();
      cookies.remove('login');
      openNotification(
        "Logged out",
        "Thank you for using our system!",
        <SmileOutlined style={{ color: '#008000' }} />)
      props.history.push("/login")

    })
    .catch((error) => {
      openNotification(
        "Oh no!",
        "There was a problem with your logout, try later!",
        <FrownOutlined style={{ color: '#FF0000' }} />)
      props.history.push("/products")
    })
  return null
}

export function isLoggedIn() {
  return typeof (new Cookies().get('login')) !== 'undefined'
}

export function getToken() {
  const cookie = new Cookies().get('login');
  return typeof (cookie) === 'undefined' ? null : cookie.token
}

export function openNotification (p_message, p_description, p_icon){
  notification.open({
    message: p_message,
    description: p_description,
    icon: p_icon ||  <NotificationOutlined style={{ color: '#108ee9' }} />,
  });
};
