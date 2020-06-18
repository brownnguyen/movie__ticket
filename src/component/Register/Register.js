import React, { useState } from 'react';
import './Register.scss';
import { movieServices } from '../../Services/MoviesServices';
import { NavLink } from 'react-router-dom';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Layout
} from 'antd';
const { Content } = Layout;

const Register = () => {
    let [registerUser, setRegisterUser] = useState({
        values: {
            hoTen: '',
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maLoaiNguoiDung: 'KhachHang',
            maNhom: 'GP01'
        }
    })
    const handleChange = (e) => {
        let { name, value } = e.target;
        console.log(name, value);
        let newValues = {
            ...registerUser.values, [name]: value
        }
        setRegisterUser({
            newValues
        })
    }

    const onSubmit = (values) => {
        const postUser = async () => {
            try {
                let user = await movieServices.Register(registerUser.values);
                setRegisterUser(user);
            } catch (error) {
                console.log(error)
            }
        }
        postUser();
    };
    return (
        <Layout className="user__register" style={{
            width: "100%", height: "100%", position: "absolute", top: 0, left: 0,
            backgroundImage: "url('./image/VN-vi-20200302-popsignuptwoweeks-perspective_alpha_website_small.jpg')"
        }}>
            <Content>
                <Row style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)' }}>
                    <Col className="register__col" xl={6} lg={8} md={10} style={{ margin: 'auto', backgroundColor: "white" }}>

                        <Form className="register__form"
                            name="register"
                            onFinish={onSubmit}
                            initialValues={{
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <NavLink to="/" exact>
                                <h4 className="logo__register__title">Movie<span>HolicZ</span></h4>
                            </NavLink>
                            <h3 className="register__title">Đăng kí</h3>
                            <Form.Item
                                name="nickname"
                                rules={[{ required: true, message: 'Vui lòng nhập tài khoản!', whitespace: true }]}
                            >
                                <Input placeholder="Tài khoản" name="taiKhoan" onChange={handleChange} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Mật khẩu" name="matKhau" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mật khẩu không khớp!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu" name="matKhau" onChange={handleChange} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'E-mail không hợp lệ !',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input style={{ width: '100%' }} placeholder='Số điện thoại' name="soDt" onChange={handleChange} />
                            </Form.Item>
                            <Form.Item>
                                <Button className="register__button"
                                    htmlType="submit">
                                    Register
                                </Button >
                                <p style={{ marginTop: 5, marginBottom: 0 }}>You have an account? <NavLink to="/login" exact style={{ color: 'red' }}>Log in now!</NavLink> </p>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Register;