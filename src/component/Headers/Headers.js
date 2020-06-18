import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import "./Headers.scss";
import { Drawer, Button } from 'antd';
import { PicRightOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
export default function Headers() {
    let [visible, setVisible] = useState(false);
    let [user, setUser] = useState({});
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
            console.log(JSON.parse(userStr));
        }
        console.log(user)
    }, []);
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" style={{ fontSize: "16px", fontWeight: "bold" }}>
                Đăng xuất
          </Menu.Item>
        </Menu>
    );

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false);
    };
    const scrollToElement = (element) => {
        setTimeout(() => {
            document.querySelector(element).scrollIntoView();
        }, 500)

    }
    function handleMenuClick(e) {
        localStorage.removeItem('user');
        setUser({});
    }
    return (
        <Layout>
            <Header className="header__layout" style={{ backgroundColor: "#FF0000" }}>
                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                    <Col>
                        <NavLink to="/" className="logo">
                            <h3 className="brand__logo">Movie<span>HolicZ</span></h3>
                        </NavLink>
                    </Col>
                    <Col className="schedule">
                        <div className="header__Content">
                            <ul className="ul__content">
                                <li><NavLink to="/" exact onClick={() => scrollToElement('#movieList')}>
                                    Lịch chiếu
                                </NavLink></li>
                                <li><NavLink to="/" exact onClick={() => scrollToElement('#systemTheater')}>
                                    Cụm rạp
                                </NavLink></li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="user__info">
                        <div className="header__user">
                            {user.taiKhoan ?
                                <div>
                                    <Dropdown overlay={menu} >
                                        <Button style={{
                                            backgroundColor: "transparent",
                                            padding: "10px",
                                            border: "none",
                                            margin: "auto"
                                        }}>
                                            <UserOutlined
                                                style={{
                                                    backgroundColor: "#c5c5c5",
                                                    fontSize: "20px",
                                                    lineHeight: "30px",
                                                    borderRadius: "50%",
                                                    color: "white",
                                                    width: "30px",
                                                    height: "30px"
                                                }} /> <span style={{
                                                    color: "white",
                                                    fontSize: "16px",
                                                    fontWeight: "bold"
                                                }}>{user.hoTen}</span>
                                        </Button>
                                    </Dropdown>
                                </div>
                                :
                                <>
                                    <NavLink to="/login"
                                        exact>
                                        <div className="login">
                                            Đăng nhập
                                        </div>
                                    </NavLink>
                                    <NavLink to="register"
                                        exact>
                                        <div className="register">
                                            Đăng kí
                                        </div>
                                    </NavLink>
                                </>}
                        </div>
                    </Col>
                    <Col className="button__drawer">
                        <Button style={{ backgroundColor: "transparent", border: "1px solid black" }} onClick={showDrawer}>
                            <PicRightOutlined style={{ fontSize: "20px" }} />
                        </Button>
                        <Drawer className="drawer__info"
                            title={<>
                                <NavLink to="/" exact>
                                    <p style={{ fontWeight: "bold" }} className="title__drawer">Movie<span>HolicZ</span></p>
                                </NavLink>
                            </>
                            }
                            placement={"top"}
                            closable={false}
                            onClick={onClose}
                            visible={visible}
                            key={"top"}
                        >
                            <ul className="list__drawer">
                                {user.taiKhoan ?
                                    <>
                                        <li>
                                            <p className="user__Name">
                                                {user.hoTen}
                                            </p>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact
                                                onClick={() => scrollToElement('#movieList')}>
                                                Lịch chiếu
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact
                                                onClick={() => scrollToElement('#systemTheater')}>
                                                Cụm rạp
                                            </NavLink>
                                        </li>
                                        <li>
                                            <p className="logout" onClick={handleMenuClick}>
                                                Đăng xuất
                                            </p>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <NavLink to='/login' exact >
                                                Đăng nhập
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/login' exact >
                                                Đăng kí
                                            </NavLink>
                                        </li>
                                        <li><NavLink to="/" exact
                                            onClick={() => scrollToElement('#movieList')}>
                                            Lịch chiếu
                                            </NavLink></li>
                                        <li><NavLink to="/" exact
                                            onClick={() => scrollToElement('#systemTheater')}>
                                            Cụm rạp
                                            </NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </Drawer>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}
