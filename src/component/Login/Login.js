import React, { useState } from 'react'
import { Layout, Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss';
import { movieServices } from '../../Services/MoviesServices';
const { Content } = Layout;

export default function Login(props) {
    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: ''
        },
        errors: {
            taiKhoan: '',
            matKhau: ''
        }
    });
    const handleSubmit = () => {
        movieServices.Login(state.values).then(res => {
            console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data));
            props.history.replace('/home');
        }).catch(error => {
            alert(error.response.data);
        })
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        const newValue = { ...state.values, [name]: value };
        const newErrors = { ...state.values, [name]: value.trim() === '' ? "Không được bỏ trống" : '' }
        setState({ values: newValue, errors: newErrors })
    }
    return (
        <Layout className="user__login" style={{
            width: "100%", height: "100%", position: "absolute", top: 0, left: 0,
            backgroundImage: "url('./image/VN-vi-20200302-popsignuptwoweeks-perspective_alpha_website_small.jpg')"
        }}>
            <Content>
                <Row style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)' }}>
                    <Col className="login__col" xl={6} lg={8} md={10} style={{ margin: 'auto' }}>
                        <Form
                            onFinish={handleSubmit}
                            name="normal_login"
                            className="login-form login__form"
                            initialValues={{ remember: true }}>
                            <NavLink to="/" exact>
                                <h4 className="logo__login__title">Movie<span>HolicZ</span></h4>
                            </NavLink>
                            <h3 className="login__title">Đăng nhập</h3>
                            <Form.Item
                                rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}>
                                <Input onChange={handleChange}
                                    name="taiKhoan"
                                    className="login__input"
                                    prefix={<UserOutlined
                                        className="site-form-item-icon" />}
                                    placeholder="Tài khoản" />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: "10px" }}
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu' }]}>
                                <Input onChange={handleChange}
                                    className="login__input"
                                    name="matKhau"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Mật khẩu" />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: "10px" }}>
                                <a className="login-form-forgot" href="">
                                    Forgot password
                            </a>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button htmlType="submit" className="login-form-button">
                                    Đăng nhập
                            </Button>
                                <p style={{ marginTop: 5, marginBottom: 0 }}>Dont have an account? <NavLink to="/register" exact style={{ color: 'red' }}>Register now!</NavLink> </p>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
